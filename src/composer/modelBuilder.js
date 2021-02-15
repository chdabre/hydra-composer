export default class ModelBuilder {
  constructor(onUpdate) {
    this.onUpdate = onUpdate;
  }

  build(value) {
    console.log(`Rebuilt as: ${value}`);
    this.onUpdate(value);
  }

  static buildFunctionWithArgs(name, ...args) {
    const argsList = args.join(',');
    return `${name}(${argsList})`;
  }

  static compose(...functions) {
    return functions.join('.');
  }

  static wrapFloatExpression(exp) {
    return `({ time }) => (${exp})`;
  }
}
