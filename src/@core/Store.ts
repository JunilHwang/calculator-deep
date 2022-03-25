export type Mutation<T> = (state: T, payload: any) => void;

export interface StoreContext<T> {
  state: T;
  mutations: Record<string, Mutation<T>>;
}

export class Store<T> {
  #state: T;
  readonly #mutations: Record<string, Mutation<T>>;
  readonly #observers: Set<() => void> = new Set();

  constructor({ state, mutations }: StoreContext<T>) {
    this.#state = state;
    this.#mutations = mutations;
  }

  get state() {
    return Object.freeze(this.#state);
  }

  commit(actionType: string, payload?: any) {
    const mutation = this.#mutations[actionType];
    if (mutation === undefined) {
      throw new NotFoundActionTypeException(actionType);
    }
    const newState = { ...this.#state };
    mutation(newState, payload);
    this.#state = newState;
    this.#observers.forEach((fn) => fn());
  }

  subscribe(observer: () => void) {
    this.#observers.add(observer);
  }
}

export class NotFoundActionTypeException extends Error {
  constructor(actionType: string) {
    super(`${actionType} mutaiton이 정의되지 않았습니다.`);
  }
}
