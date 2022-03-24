export class InvalidOperatorParamException extends Error {
  public static MESSAGE = "2개의 인자가 있어야 연산이 가능합니다.";

  constructor() {
    super(InvalidOperatorParamException.MESSAGE);
  }
}

export class InvalidOperatorConstructException extends Error {
  public static MESSAGE = "심볼과 연산 인자가 필요합니다.";

  constructor() {
    super(InvalidOperatorConstructException.MESSAGE);
  }
}
