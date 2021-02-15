/* eslint-disable class-methods-use-this, no-param-reassign */

import Rete from 'rete';
import FloatInputControl from '@/composer/controls/FloatInputControl';
import ModelBuilder from '@/composer/modelBuilder';
import * as Socket from '@/composer/sockets';

export default class GradientComponent extends Rete.Component {
  constructor() {
    super('Gradient');
    this.path = 'Sources';
  }

  builder(node) {
    const speed = new Rete.Input('speed', 'Speed', Socket.float);

    const o0 = new Rete.Output('o0', 'Output', Socket.source);

    speed.addControl(new FloatInputControl(this.editor, 'speed', false, 1));

    return node
      .addInput(speed)
      .addOutput(o0);
  }

  worker(node, inputs, outputs) {
    const speed = inputs.speed.length > 0 ? ModelBuilder.wrapFloatExpression(inputs.speed[0]) : node.data.speed;

    outputs.o0 = ModelBuilder.buildFunctionWithArgs('gradient', speed);
  }
}
