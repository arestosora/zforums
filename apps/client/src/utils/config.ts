export const config = {
    api: {
        baseUrl: import.meta.env.VITE_API_URL,
    },
    Cloudinary: {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY,
        preset: import.meta.env.VITE_CLOUDINARY_PRESET,
    }
}