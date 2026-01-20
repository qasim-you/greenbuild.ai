import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://greenbuild-ai.vercel.app',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: 'https://greenbuild-ai.vercel.app/analyze',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: 'https://greenbuild-ai.vercel.app/privacy',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: 'https://greenbuild-ai.vercel.app/terms',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ]
}
