/* eslint-disable class-methods-use-this, no-param-reassign */

import Rete from 'rete';
import * as Socket from '@/composer/sockets';
import ModelBuilder from '@/composer/modelBuilder';
import FloatInputControl from '@/composer/controls/FloatInputControl';

export default class RepeatComponent extends Rete.Component {
  constructor() {
    super('Repeat');
    this.path = 'Geometry';
  }

  builder(node) {
    const i1 = new Rete.Input('i1', 'Input', Socket.source);
    const repeatX = new Rete.Input('repeatX', 'Repeat X', Socket.float);
    const repeatY = new Rete.Input('repeatY', 'Repeat Y', Socket.float);
    const offsetX = new Rete.Input('offsetX', 'Offset X', Socket.float);
    const offsetY = new Rete.Component('offsetY', 'Offset Y', Socket.float);

    const o0 = new Rete.Output('o0', 'Output', Socket.source);

    repeatX.addControl(new FloatInputControl(this.editor, 'repeatX', false, 3));
    repeatY.addControl(new FloatInputControl(this.editor, 'repeatY', false, 3));
    offsetX.addControl(new FloatInputControl(this.editor, 'offsetX', false, 0));
    offsetY.addControl(new FloatInputControl(this.editor, 'offsetY', false, 0));

    return node
      .addInput(i1)
      .addInput(repeatX)
      .addInput(repeatY)
      .addInput(offsetX)
      .addInput(offsetY)
      .addOutput(o0);
  }

  worker(node, inputs, outputs) {
    const repeatX = inputs.repeatX.length > 0 ? ModelBuilder.wrapFloatExpression(inputs.repeatX[0]) : node.data.repeatX;
    const repeatY = inputs.repeatY.length > 0 ? ModelBuilder.wrapFloatExpression(inputs.repeatY[0]) : node.data.repeatY;
    const offsetX = inputs.offsetX.length > 0 ? ModelBuilder.wrapFloatExpression(inputs.offsetX[0]) : node.data.offsetX;
    const offsetY = inputs.offsetY.length > 0 ? ModelBuilder.wrapFloatExpression(inputs.offsetY[0]) : node.data.offsetY;

    outputs.o0 = ModelBuilder.compose(inputs.i1[0],
      ModelBuilder.buildFunctionWithArgs('repeat', repeatX, repeatY, offsetX, offsetY));
  }
}
