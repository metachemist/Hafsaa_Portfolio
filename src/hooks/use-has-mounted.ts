import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

/**
 * Returns false during SSR and the first client render, then true.
 *
 * Use this to gate any value that legitimately differs between server and
 * client (e.g. `useReducedMotion()`, which is always false on the server).
 * Reading such a value directly during render produces a hydration mismatch,
 * and React leaves the mismatched subtree unpatched — so framer-motion never
 * animates it out of its initial hidden state.
 */
export function useHasMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
