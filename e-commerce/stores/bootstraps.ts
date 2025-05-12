import { createWithEqualityFn } from 'zustand/traditional';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { shallow } from 'zustand/shallow';

export type BootstrapsState = {
  isFirstLoad: boolean;
};

export type BootstrapsStore = BootstrapsState & {
  setIsFirstLoad: (isFirstLoad: boolean) => void;
};

export const INITIAL_BOOTSTRAPS_STATE: BootstrapsState = {
  isFirstLoad: true,
};

export const useBootstrapsStore = createWithEqualityFn<BootstrapsStore>()(
  persist(
    (set) => ({
      ...INITIAL_BOOTSTRAPS_STATE,
      setIsFirstLoad: (isFirstLoad) => {
        set({ isFirstLoad });
      },
    }),
    {
      name: 'bootstraps',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
  shallow,
);
