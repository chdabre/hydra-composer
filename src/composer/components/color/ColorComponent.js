/* eslint-disable class-methods-use-this, no-param-reassign */

import Rete from 'rete';
import * as Socket from '@/composer/sockets';
import ModelBuilder from '@/composer/modelBuilder';
import FloatInputControl from '@/composer/controls/FloatInputControl';

export default class ColorComponent extends Rete.Component {
  constructor() {
    super('Color');
    this.path = 'Color';
  }

  builder(node) {
    const i1 = new Rete.Input('i1', 'Input', Socket.source);
    const r = new Rete.Input('r', 'R', Socket.float);
    const g = new Rete.Input('g', 'G', Socket.float);
    const b = new Rete.Input('b', 'B', Socket.float);

    const o0 = new Rete.Output('o0', '', Socket.source);

    r.addControl(new FloatInputControl(this.editor, 'r', false, 0));
    g.addControl(new FloatInputControl(this.editor, 'g', false, 0));
    b.addControl(new FloatInputControl(this.editor, 'b', false, 0));

    return node
      .addInput(i1)
      .addInput(r)
      .addInput(g)
      .addInput(b)
      .addOutput(o0);
  }

  worker(node, inputs, outputs) {
    const r = inputs.r.length > 0 ? ModelBuilder.wrapFloatExpression(inputs.r[0]) : node.data.r;
    const g = inputs.g.length > 0 ? ModelBuilder.wrapFloatExpression(inputs.g[0]) : node.data.g;
    const b = inputs.b.length > 0 ? ModelBuilder.wrapFloatExpression(inputs.b[0]) : node.data.b;

    outputs.o0 = ModelBuilder.compose(inputs.i1[0],
      ModelBuilder.buildFunctionWithArgs('color', r, g, b));
  }
}
