/* eslint-disable class-methods-use-this, no-param-reassign */

import Rete from 'rete';
import FloatInputControl from '@/composer/controls/FloatInputControl';
import ModelBuilder from '@/composer/modelBuilder';
import * as Socket from '@/composer/sockets';

export default class VoronoiComponent extends Rete.Component {
  constructor() {
    super('Voronoi');
    this.path = 'Sources';
  }

  builder(node) {
    const scale = new Rete.Input('scale', 'Scale', Socket.float);
    const speed = new Rete.Input('speed', 'Speed', Socket.float);
    const blending = new Rete.Input('blending', 'Blending', Socket.float);

    const o0 = new Rete.Output('o0', '', Socket.source);

    scale.addControl(new FloatInputControl(this.editor, 'scale', false, 5));
    speed.addControl(new FloatInputControl(this.editor, 'speed', false, 0.3));
    blending.addControl(new FloatInputControl(this.editor, 'blending', false, 0.3));

    return node
      .addInput(scale)
      .addInput(speed)
      .addInput(blending)
      .addOutput(o0);
  }

  worker(node, inputs, outputs) {
    const scale = inputs.scale.length > 0 ? ModelBuilder.wrapFloatExpression(inputs.scale[0]) : node.data.scale;
    const speed = inputs.speed.length > 0 ? ModelBuilder.wrapFloatExpression(inputs.speed[0]) : node.data.speed;
    const blending = inputs.blending.length > 0 ? ModelBuilder.wrapFloatExpression(inputs.blending[0]) : node.data.blending;

    outputs.o0 = ModelBuilder.buildFunctionWithArgs('voronoi', scale, speed, blending);
  }
}
