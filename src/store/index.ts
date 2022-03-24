import { Store } from "../@core";
import { StringCalculator } from "../domain";

export const NEW_CALCULATOR = "NEW_CALCULATOR";
export const HIDE_CALCULATOR = "HIDE_CALCULATOR";
export const REMOVE_CALCULATOR = "REMOVE_CALCULATOR";
export const SET_STRING_CALCULATOR = "SET_STRING_CALCULATOR";

export interface RootState {
  calculatorWindow: Array<{
    hiding: boolean;
    stringCalculator: StringCalculator;
  }>;
}

export const store = new Store<RootState>({
  state: {
    calculatorWindow: [],
  },

  mutations: {
    [NEW_CALCULATOR](state) {
      state.calculatorWindow.push({
        hiding: false,
        stringCalculator: new StringCalculator(),
      });
    },

    [HIDE_CALCULATOR](state, index: number) {
      state.calculatorWindow[index].hiding = true;
    },

    [REMOVE_CALCULATOR](state, index: number) {
      state.calculatorWindow.splice(index, 1);
    },

    [SET_STRING_CALCULATOR](
      state,
      payload: { stringCalculator: StringCalculator; index: number }
    ) {
      const { index, stringCalculator } = payload;
      state.calculatorWindow[index].stringCalculator = stringCalculator;
    },
  },
});
