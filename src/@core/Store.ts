export type Mutation<T> = (state: T, payload: unknown) => void;

export interface StoreContext<T> {
  state: T;
  mutations: Record<string, Mutation<T>>;
}

export class Store<T> {
  private readonly _state: T;
  private readonly mutations: Record<string, Mutation<T>>;
  private readonly observers: Set<() => void> = new Set();

  constructor({ state, mutations }: StoreContext<T>) {
    this._state = state;
    this.mutations = mutations;
  }

  get state(): Readonly<T> {
    return Object.freeze(this._state);
  }

  commit(actionType: string, payload: unknown) {
    const { _state, mutations } = this;
    const mutation = mutations[actionType];
    if (mutation === undefined) {
      throw new Error();
    }
    mutation(_state, payload);
    this.observers.forEach((fn) => fn());
  }

  subscribe(observer: () => void) {
    this.observers.add(observer);
  }
}
