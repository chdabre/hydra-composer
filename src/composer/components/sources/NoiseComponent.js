/* eslint-disable class-methods-use-this, no-param-reassign */

import Rete from 'rete';
import FloatInputControl from '@/composer/controls/FloatInputControl';
import ModelBuilder from '@/composer/modelBuilder';
import * as Socket from '@/composer/sockets';

export default class NoiseComponent extends Rete.Component {
  constructor() {
    super('Noise');
    this.path = 'Sources';
  }

  builder(node) {
    const scale = new Rete.Input('scale', 'Scale', Socket.float);
    const offset = new Rete.Input('offset', 'Offset', Socket.float);

    const o0 = new Rete.Output('o0', '', Socket.source);

    scale.addControl(new FloatInputControl(this.editor, 'scale', false, 10));
    offset.addControl(new FloatInputControl(this.editor, 'offset', false, 0.1));

    return node
      .addInput(scale)
      .addInput(offset)
      .addOutput(o0);
  }

  worker(node, inputs, outputs) {
    const scale = inputs.scale.length > 0 ? ModelBuilder.wrapFloatExpression(inputs.scale[0]) : node.data.scale;
    const offset = inputs.offset.length > 0 ? ModelBuilder.wrapFloatExpression(inputs.offset[0]) : node.data.offset;

    outputs.o0 = ModelBuilder.buildFunctionWithArgs('noise', scale, offset);
  }
}
