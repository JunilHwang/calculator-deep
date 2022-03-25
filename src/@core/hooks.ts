export function createHooks(notify: () => void) {
  const context = {
    current: 0,
    states: [] as unknown[],
  };

  const useState = <T>(initState: T): [T, (state: T) => void] => {
    const { current, states } = context;

    const state = (states[current] as T) || initState;

    const setState = (newState: T) => {
      if (newState === states[current]) return;
      states[current] = newState;
      notify();
    };

    return [state, setState];
  };

  return { useState };
}
