/* eslint-disable class-methods-use-this, no-param-reassign */

import Rete from 'rete';
import * as Socket from '@/composer/sockets';
import ModelBuilder from '@/composer/modelBuilder';
import FloatInputControl from '@/composer/controls/FloatInputControl';

export default class ScaleComponent extends Rete.Component {
  constructor() {
    super('Scale');
    this.path = 'Geometry';
  }

  builder(node) {
    const i1 = new Rete.Input('i1', 'Input', Socket.source);
    const size = new Rete.Input('size', 'Size', Socket.float);
    const xMult = new Rete.Input('xMult', 'X Multiplier', Socket.float);
    const yMult = new Rete.Input('yMult', 'Y Multiplier', Socket.float);

    const o0 = new Rete.Output('o0', 'Output', Socket.source);

    size.addControl(new FloatInputControl(this.editor, 'size', false, 1.5));
    xMult.addControl(new FloatInputControl(this.editor, 'xMult', false, 1));
    yMult.addControl(new FloatInputControl(this.editor, 'yMult', false, 1));

    return node
      .addInput(i1)
      .addInput(size)
      .addInput(xMult)
      .addInput(yMult)
      .addOutput(o0);
  }

  worker(node, inputs, outputs) {
    const size = inputs.size.length > 0 ? ModelBuilder.wrapFloatExpression(inputs.size[0]) : node.data.size;
    const xMult = inputs.xMult.length > 0 ? ModelBuilder.wrapFloatExpression(inputs.xMult[0]) : node.data.xMult;
    const yMult = inputs.yMult.length > 0 ? ModelBuilder.wrapFloatExpression(inputs.yMult[0]) : node.data.yMult;

    outputs.o0 = ModelBuilder.compose(inputs.i1[0],
      ModelBuilder.buildFunctionWithArgs('scale', size, xMult, yMult));
  }
}
