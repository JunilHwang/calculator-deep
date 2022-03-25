import { Store } from "../@core";
import { StringCalculator } from "../@domain";

export const NEW_CALCULATOR = "NEW_CALCULATOR";
export const REMOVE_CALCULATOR = "REMOVE_CALCULATOR";
export const SET_STRING_CALCULATOR = "SET_STRING_CALCULATOR";

export interface RootState {
  calculators: StringCalculator[];
}

export const store = new Store<RootState>({
  state: {
    calculators: [],
  },

  mutations: {
    [NEW_CALCULATOR](state) {
      state.calculators.push(new StringCalculator());
    },

    [REMOVE_CALCULATOR](state, index: number) {
      if (state.calculators.length === 1) {
        throw new Error();
      }
      state.calculators.splice(index, 1);
    },

    [SET_STRING_CALCULATOR](
      state,
      payload: { stringCalculator: StringCalculator; index: number }
    ) {
      const { index, stringCalculator } = payload;
      state.calculators[index] = stringCalculator;
    },
  },
});
