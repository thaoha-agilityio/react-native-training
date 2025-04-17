import {useMutation} from '@tanstack/react-query';

// Services
import {uploadImageToImgBB} from '@/services';

export const useUploadImage = () => {
  return useMutation<string, string, string>({
    mutationFn: async (uri: string) => await uploadImageToImgBB(uri),
  });
};
