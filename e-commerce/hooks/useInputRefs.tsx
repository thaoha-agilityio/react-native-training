import { createRef, useMemo } from 'react';
import type { TextInput } from 'react-native';

export function useInputRefs<T extends string>(keys: readonly T[]) {
  const refs = useMemo(() => {
    const result = {} as Record<T, React.RefObject<TextInput>>;
    keys.forEach((key) => {
      result[key] = createRef<TextInput>();
    });
    return result;
  }, [keys]);

  const focus = (key: T) => {
    refs[key]?.current?.focus();
  };

  const getOnSubmitEditing = (nextKey?: T) => () => {
    if (nextKey) focus(nextKey);
  };

  return { refs, focus, getOnSubmitEditing };
}
