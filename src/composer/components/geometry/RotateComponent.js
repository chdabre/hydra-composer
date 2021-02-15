/* eslint-disable class-methods-use-this, no-param-reassign */

import Rete from 'rete';
import FloatInputControl from '@/composer/controls/FloatInputControl';
import * as Socket from '@/composer/sockets';
import ModelBuilder from '@/composer/modelBuilder';

export default class RotateComponent extends Rete.Component {
  constructor() {
    super('Rotate');
    this.path = 'Geometry';
  }

  builder(node) {
    const input = new Rete.Input('i1', 'Input', Socket.source);
    const angle = new Rete.Input('angle', 'Angle', Socket.float);
    const speed = new Rete.Input('speed', 'Speed', Socket.float);

    angle.addControl(new FloatInputControl(this.editor, 'angle', false, 10.0));
    speed.addControl(new FloatInputControl(this.editor, 'speed', false, 0.0));

    const o0 = new Rete.Output('o0', 'Output', Socket.source);

    return node
      .addInput(input)
      .addInput(angle)
      .addInput(speed)
      .addOutput(o0);
  }

  worker(node, inputs, outputs) {
    const angle = inputs.angle.length > 0 ? ModelBuilder.wrapFloatExpression(inputs.angle[0]) : node.data.angle;
    const speed = inputs.speed.length > 0 ? ModelBuilder.wrapFloatExpression(inputs.speed[0]) : node.data.speed;

    if (inputs.i1[0]) {
      outputs.o0 = ModelBuilder.compose(inputs.i1[0],
        ModelBuilder.buildFunctionWithArgs('rotate', angle, speed));
    } else {
      outputs.o0 = '';
    }
  }
}
