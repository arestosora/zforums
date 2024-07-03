import { ref, type Ref } from 'vue';
import { showErrorAlert } from '@/utils/fireAlert';

export const useFileUpload = (externalIsLoading: Ref<boolean>) => {
    const newPostImageUrl = ref<string | null>(null);
  
    const handleFileUpload = async (file: File) => {
      externalIsLoading.value = true;
      const formData = new FormData();
      formData.append('file', file);
  
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
      const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const timestamp = Math.floor(Date.now() / 1000);
  
      formData.append('upload_preset', uploadPreset);
      formData.append('api_key', apiKey);
      formData.append('timestamp', timestamp.toString());
  
      try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json'
          },
          body: formData
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        newPostImageUrl.value = data.secure_url;
      } catch (err) {
        showErrorAlert('Error uploading image. Please try again later.');
        console.error(err);
      } finally {
        externalIsLoading.value = false;
      }
    };
  
    return { handleFileUpload, newPostImageUrl };
  };