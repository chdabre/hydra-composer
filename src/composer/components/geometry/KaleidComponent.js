/* eslint-disable class-methods-use-this, no-param-reassign */

import Rete from 'rete';
import * as Socket from '@/composer/sockets';
import ModelBuilder from '@/composer/modelBuilder';
import FloatInputControl from '@/composer/controls/FloatInputControl';

export default class KaleidComponent extends Rete.Component {
  constructor() {
    super('Kaleidoscope');
    this.path = 'Geometry';
  }

  builder(node) {
    const i1 = new Rete.Input('i1', 'Input', Socket.source);
    const nSides = new Rete.Input('nSides', 'Repetition', Socket.float);

    const o0 = new Rete.Output('o0', '', Socket.source);

    nSides.addControl(new FloatInputControl(this.editor, 'nSides', false, 4));

    return node
      .addInput(i1)
      .addInput(nSides)
      .addOutput(o0);
  }

  worker(node, inputs, outputs) {
    const nSides = inputs.nSides.length > 0 ? ModelBuilder.wrapFloatExpression(inputs.nSides[0]) : node.data.nSides;

    outputs.o0 = ModelBuilder.compose(inputs.i1[0],
      ModelBuilder.buildFunctionWithArgs('kaleid', nSides));
  }
}
