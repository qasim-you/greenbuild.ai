export interface BuildingSpecs {
    type: string
    area: number
    floors: number
    location: string
    budget: string
}

export interface MaterialData {
    material: string
    category: string
    unit: string
    carbon_kg_per_unit: number
    cost_per_unit: number
    source: string
}

export interface MaterialMixItem {
    material: string
    quantity: number
    unit: string
    totalCarbon: number
    totalCost: number
}

// Structural ratios per sq ft (kg of material per sq ft)
const STRUCTURAL_RATIOS: Record<string, Record<string, number>> = {
    house: {
        "Concrete (Standard)": 40,
        "Steel (Virgin)": 2.5,
        "Softwood Timber": 8,
        "Brick": 35,
        "Glass": 0.8,
        "Mineral Wool": 1.5,
        "Aluminium (Virgin)": 0.5
    },
    office: {
        "Concrete (Standard)": 85,
        "Steel (Virgin)": 12.0,
        "Softwood Timber": 1.5,
        "Brick": 10,
        "Glass": 4.5,
        "Mineral Wool": 2.5,
        "Aluminium (Virgin)": 2.2
    },
    school: {
        "Concrete (Standard)": 65,
        "Steel (Virgin)": 8.0,
        "Softwood Timber": 4.0,
        "Brick": 25,
        "Glass": 2.5,
        "Mineral Wool": 2.2,
        "Aluminium (Virgin)": 1.2
    },
    hospital: {
        "Concrete (Standard)": 95,
        "Steel (Virgin)": 15.0,
        "Softwood Timber": 1.0,
        "Brick": 15,
        "Glass": 3.5,
        "Mineral Wool": 3.0,
        "Aluminium (Virgin)": 2.5
    }
}

export async function loadMaterialData(): Promise<MaterialData[]> {
    try {
        const csvContent = `material,category,unit,carbon_kg_per_unit,cost_per_unit,source
"Concrete (Standard)","Structure","kg",0.13,0.06,"ICE Database v3.0"
"Concrete (Low-Carbon)","Structure","kg",0.08,0.08,"ICE Database v3.0"
"Steel (Virgin)","Structure","kg",2.30,1.20,"ICE Database v3.0"
"Steel (Recycled)","Structure","kg",0.43,1.35,"ICE Database v3.0"
"Cross-Laminated Timber","Structure","kg",0.50,1.50,"ICE Database v3.0"
"Softwood Timber","Structure","kg",0.45,0.80,"ICE Database v3.0"
"Brick","Envelope","kg",0.22,0.30,"ICE Database v3.0"
"Glass","Envelope","kg",1.44,2.50,"ICE Database v3.0"
"Mineral Wool","Insulation","kg",1.20,1.80,"ICE Database v3.0"
"EPS Insulation","Insulation","kg",3.30,1.10,"ICE Database v3.0"
"Hempcrete","Insulation/Structure","kg",-0.10,2.00,"OpenLCA"
"Aluminium (Virgin)","Envelope","kg",12.79,3.50,"ICE Database v3.0"
"Aluminium (Recycled)","Envelope","kg",1.81,3.80,"ICE Database v3.0"`;

        const lines = csvContent.split('\n').slice(1);
        const materials = lines.map(line => {
            const parts = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
            if (!parts) return null;
            const values = parts.map(v => v.replace(/"/g, ''));
            return {
                material: values[0],
                category: values[1],
                unit: values[2],
                carbon_kg_per_unit: parseFloat(values[3]),
                cost_per_unit: parseFloat(values[4]),
                source: values[5]
            };
        }).filter((x): x is MaterialData => x !== null);

        if (materials.length === 0) {
            console.warn("Warning: No valid materials parsed from CSV");
        }
        return materials;
    } catch (error) {
        console.error("Failed to load material data", error);
        return [];
    }
}

export function calculateDetailedEngine(specs: BuildingSpecs, materials: MaterialData[], optimizationBias: number = 0.5) {
    const type = specs.type.toLowerCase() as keyof typeof STRUCTURAL_RATIOS;
    const ratios = STRUCTURAL_RATIOS[type] || STRUCTURAL_RATIOS.house;

    const floorMultiplier = 1 + (specs.floors - 1) * 0.12; // Increased complexity for higher floors

    const baseMix: MaterialMixItem[] = [];

    for (const [materialName, ratio] of Object.entries(ratios)) {
        let selectedMaterial = materials.find(m => m.material === materialName)!;

        // Multi-objective optimization (Decision logic)
        // Swap Standard Concrete -> Low-Carbon
        if (materialName === "Concrete (Standard)") {
            const lowCarbon = materials.find(m => m.material === "Concrete (Low-Carbon)")!;
            if (optimizationBias > 0.3) selectedMaterial = lowCarbon;
        }

        // Swap Virgin Steel -> Recycled
        if (materialName === "Steel (Virgin)") {
            const recycled = materials.find(m => m.material === "Steel (Recycled)")!;
            if (optimizationBias > 0.5) selectedMaterial = recycled;
        }

        // Swap Timber -> CLT (Often better structural performance/sequestration context)
        if (materialName === "Softwood Timber") {
            const clt = materials.find(m => m.material === "Cross-Laminated Timber")!;
            if (optimizationBias > 0.7) selectedMaterial = clt;
        }

        // Swap Insulation (Mineral Wool -> Hempcrete for carbon-first)
        if (materialName === "Mineral Wool") {
            const hempcrete = materials.find(m => m.material === "Hempcrete")!;
            if (optimizationBias > 0.8) selectedMaterial = hempcrete;
        }

        // Swap Aluminium
        if (materialName === "Aluminium (Virgin)") {
            const recycledAl = materials.find(m => m.material === "Aluminium (Recycled)")!;
            if (optimizationBias > 0.4) selectedMaterial = recycledAl;
        }

        const quantity = ratio * specs.area * floorMultiplier;
        const totalCarbon = (quantity * selectedMaterial.carbon_kg_per_unit) / 1000;
        const totalCost = quantity * selectedMaterial.cost_per_unit;

        baseMix.push({
            material: selectedMaterial.material,
            quantity,
            unit: selectedMaterial.unit,
            totalCarbon,
            totalCost
        });
    }

    const totalCarbon = baseMix.reduce((acc, curr) => acc + curr.totalCarbon, 0);
    const totalCost = baseMix.reduce((acc, curr) => acc + curr.totalCost, 0);

    return {
        materials: baseMix,
        totalCarbon,
        totalCost,
        intensity: totalCarbon / specs.area
    };
}

export function getCarbonIntensityLabel(totalCarbon: number, area: number) {
    const intensity = (totalCarbon * 1000) / area; // kg per sq ft

    if (intensity < 18) return { label: "Low", color: "text-emerald-500", bg: "bg-emerald-500/10" }
    if (intensity < 55) return { label: "Medium", color: "text-amber-500", bg: "bg-amber-500/10" }
    return { label: "High", color: "text-rose-500", bg: "bg-rose-500/10" }
}

export function getImpactEquivalents(tons: number) {
    return [
        {
            label: "Cars Removed",
            value: (tons / 4.6).toFixed(1),
            unit: "per year",
            icon: "Car"
        },
        {
            label: "Trees Planted",
            value: (tons / 0.025).toFixed(0),
            unit: "over 10 yrs",
            icon: "TreePine"
        },
        {
            label: "Homes Powered",
            value: (tons / 8.5).toFixed(1),
            unit: "for a year",
            icon: "Home"
        }
    ]
}
