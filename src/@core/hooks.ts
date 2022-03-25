export function createHooks(notify: () => void) {
  const context = {
    current: 0,
    states: [] as unknown[],
  };

  const useState = <T>(initState: T) => {
    const { current, states } = context;

    const state = states[current] || initState;

    const setState = (newState: T) => {
      if (newState === states[current]) return;
      states[current] = newState;
      notify();
    };

    return [state, setState];
  };

  return { useState };
}
