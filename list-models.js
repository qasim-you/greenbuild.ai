const apiKey = "AIzaSyCPMTLnGMDSwGrf5Y8LjOp0MqWrMjL7Mw4";

async function run() {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();
        console.log(JSON.stringify(data, null, 2));
    } catch (e) {
        console.log(`Error: ${e.message}`);
    }
}

run();
