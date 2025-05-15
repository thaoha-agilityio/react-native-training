import { Platform } from 'react-native';

// Constants
import { IMGBB_URL } from '@/constants';

// Services
import { postData } from './apiRequest';

// Interfaces
import { ImgBBResponse } from '@/interfaces';

export const uploadImageToImgBB = async (imageUri: string): Promise<string> => {
  const formData = new FormData();
  formData.append('image', {
    uri: Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri,
    name: 'upload.jpg',
    type: 'image/jpeg',
  } as any);

  try {
    const response = await postData<FormData, ImgBBResponse>(
      IMGBB_URL,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );

    if (response.success) {
      return response.data.url;
    } else {
      throw new Error('Upload failed');
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred when upload image';

    return errorMessage;
  }
};
