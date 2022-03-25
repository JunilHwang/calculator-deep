interface Memo<T = any> {
  refs: unknown[];
  value: T;
}

export function createHooks(render: () => void) {
  const stateContext = {
    current: 0,
    states: [] as unknown[],
  };

  const memoContext = {
    current: 0,
    memos: [] as Memo[],
  };

  function resetContext() {
    stateContext.current = 0;
    memoContext.current = 0;
  }

  const useState = <T>(initState: T): [T, (state: T) => void] => {
    const { current, states } = stateContext;
    stateContext.current += 1;

    states[current] = states[current] ?? initState;

    const setState = (newState: T) => {
      if (newState === states[current]) return;
      states[current] = newState;
      render();
    };

    return [states[current] as T, setState];
  };

  const useMemo = <T>(fn: () => T, refs: unknown[]): T => {
    const { current, memos } = memoContext;
    memoContext.current += 1;

    const memo: Memo<T> = memos[current];

    const resetAndReturn = () => {
      const value = fn();
      memos[current] = {
        value,
        refs,
      };
      return value;
    };

    if (!memo) {
      return resetAndReturn();
    }

    if (refs.length > 0 && memo.refs.find((v, k) => v !== refs[k])) {
      return resetAndReturn();
    }
    return memo.value;
  };

  return { useState, useMemo, resetContext };
}
