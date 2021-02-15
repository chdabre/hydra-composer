/* eslint-disable class-methods-use-this, no-param-reassign */

import Rete from 'rete';
import * as Socket from '@/composer/sockets';
import ModelBuilder from '@/composer/modelBuilder';
import FloatInputControl from '@/composer/controls/FloatInputControl';

export default class PixelateComponent extends Rete.Component {
  constructor() {
    super('Pixelate');
    this.path = 'Geometry';
  }

  builder(node) {
    const i1 = new Rete.Input('i1', 'Input', Socket.source);
    const x = new Rete.Input('x', 'X Segments', Socket.float);
    const y = new Rete.Input('y', 'Y Segments', Socket.float);

    const o0 = new Rete.Output('o0', 'Output', Socket.source);

    x.addControl(new FloatInputControl(this.editor, 'x', false, 20));
    y.addControl(new FloatInputControl(this.editor, 'y, false', 20));

    return node
      .addInput(i1)
      .addInput(x)
      .addInput(y)
      .addOutput(o0);
  }

  worker(node, inputs, outputs) {
    const x = inputs.x.length > 0 ? ModelBuilder.wrapFloatExpression(inputs.x[0]) : node.data.x;
    const y = inputs.y.length > 0 ? ModelBuilder.wrapFloatExpression(inputs.y[0]) : node.data.y;

    outputs.o0 = ModelBuilder.compose(inputs.i1[0],
      ModelBuilder.buildFunctionWithArgs('pixelate', x, y));
  }
}
