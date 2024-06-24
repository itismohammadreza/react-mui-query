import { SetStateAction, useEffect, useLayoutEffect, useRef, useState } from "react";

type Set<T> = (newState: SetStateAction<T>, callback?: (newState: T) => void) => void;

type UseSelector<T> = <TSelected = unknown>(selector: (state: T) => TSelected, equalityFn?: Comparator<TSelected>) => TSelected;

export interface StateWithValue<T> {
  use: () => [T, Set<T>];
  useValue: () => T;
  get: () => T;
  useSelector: UseSelector<T>;
  set: Set<T>;
  reset: () => void;

  subscribe(subscriber: SubscriberFunc<T>): () => void;
}

type SubscriberFunc<T> = (newState: T, previousState: T) => void;

interface Options<T> {
  onSet?: SubscriberFunc<T>;
}

type Comparator<TSelected = unknown> = (a: TSelected, b: TSelected) => boolean;

const useIsomorphicLayoutEffect =
    typeof window !== "undefined" || typeof document !== "undefined"
        ? useLayoutEffect
        : useEffect;

const equ: Comparator = (a, b) => a === b;

const FR = {};

function useComparator<T>(v: T, c: Comparator<T> = equ): T {
  const f = useRef(FR as T);
  let nv = f.current;

  useIsomorphicLayoutEffect(() => {
    f.current = nv;
  });

  if (f.current === FR || !c(v, f.current)) {
    nv = v;
  }

  return nv;
}

export function globalState<T>(initialValue: T, options?: Options<T>): StateWithValue<T> {
  let sb: SubscriberFunc<T>[] = [];

  let v: T = initialValue;

  function set(newValue: SetStateAction<T>, callback?: SubscriberFunc<T>) {
    const pv = v;
    v = newValue instanceof Function ? newValue(v) : newValue;

    setTimeout(() => {
      sb.forEach((c) => c(v, pv));
      callback?.(v, pv);
      options?.onSet?.(v, pv);
    });
  }

  function subscribe(subscriber: SubscriberFunc<T>): () => void {
    sb.push(subscriber);
    return () => {
      sb = sb.filter((f) => f !== subscriber);
    };
  }

  function useSubscription(subscriber: SubscriberFunc<T>) {
    useIsomorphicLayoutEffect(() => subscribe(subscriber), [subscriber]);
  }

  function use(): [T, Set<T>] {
    const [l, s] = useState<T>(v);
    useSubscription(s);
    return [l, set];
  }

  function useSelector<TSelected = unknown>(selector: (state: T) => TSelected, comparator: Comparator<TSelected> = equ): TSelected {
    const [rv] = use();
    return useComparator(selector(rv), comparator);
  }

  return {
    use,
    useSelector,
    useValue: () => use()[0],
    get: () => v,
    set,
    reset: () => set(initialValue),
    subscribe,
  };
}
