/* eslint-disable class-methods-use-this, no-param-reassign */

import Rete from 'rete';
import FloatInputControl from '@/composer/controls/FloatInputControl';
import ModelBuilder from '@/composer/modelBuilder';
import * as Socket from '@/composer/sockets';

export default class ShapeComponent extends Rete.Component {
  constructor() {
    super('Shape');
    this.path = 'Sources';
  }

  builder(node) {
    const sides = new Rete.Input('sides', 'Sides', Socket.float);
    const radius = new Rete.Input('radius', 'Radius', Socket.float);
    const smoothing = new Rete.Input('smoothing', 'Smoothing', Socket.float);

    const o0 = new Rete.Output('o0', 'Output', Socket.source);

    sides.addControl(new FloatInputControl(this.editor, 'sides', false, 3));
    radius.addControl(new FloatInputControl(this.editor, 'radius', false, 0.3));
    smoothing.addControl(new FloatInputControl(this.editor, 'smoothing', false, 0.01));

    return node
      .addInput(sides)
      .addInput(radius)
      .addInput(smoothing)
      .addOutput(o0);
  }

  worker(node, inputs, outputs) {
    const sides = inputs.sides.length > 0 ? ModelBuilder.wrapFloatExpression(inputs.sides[0]) : node.data.sides;
    const radius = inputs.radius.length > 0 ? ModelBuilder.wrapFloatExpression(inputs.radius[0]) : node.data.radius;
    const smoothing = inputs.smoothing.length > 0 ? ModelBuilder.wrapFloatExpression(inputs.smoothing[0]) : node.data.smoothing;

    outputs.o0 = ModelBuilder.buildFunctionWithArgs('shape', sides, radius, smoothing);
  }
}
