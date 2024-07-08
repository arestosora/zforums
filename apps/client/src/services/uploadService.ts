import { ref, type Ref } from 'vue';
import { showErrorAlert } from '@/utils/fireAlert';
import { config } from '@/core/config';
import ky from 'ky';
import { authState } from '@/core/auth';

export const useFileUpload = (externalIsLoading: Ref<boolean>) => {
  const newPostImageUrl = ref<string | null>(null);

  const handleFileUpload = async (file: File, type?: 'avatar' | 'banner') => {
    externalIsLoading.value = true;
    const formData = new FormData();
    formData.append('file', file);

    const uploadPreset = config.Cloudinary.preset;
    const apiKey = config.Cloudinary.apiKey;
    const cloudName = config.Cloudinary.cloudName;
    const timestamp = Math.floor(Date.now() / 1000);

    formData.append('upload_preset', uploadPreset);
    formData.append('api_key', apiKey);
    formData.append('timestamp', timestamp.toString());

    try {
      const response = await ky.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      }).json<{ secure_url: string }>();

      const url = response.secure_url;

      if (type) {
        if (type === 'avatar') {
          authState.user = {
            ...authState.user,
            avatar: url
          };
        } else {
          authState.user = {
            ...authState.user,
            banner: url
          };
        }
        localStorage.setItem('authState', JSON.stringify(authState));
      }

      newPostImageUrl.value = url;
      return url;
    } catch (err) {
      showErrorAlert('Error uploading image. Please try again later.');
      console.error(err);
    } finally {
      externalIsLoading.value = false;
    }
  };

  return { handleFileUpload, newPostImageUrl };
};

