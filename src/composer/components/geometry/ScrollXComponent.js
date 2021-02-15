/* eslint-disable class-methods-use-this, no-param-reassign */

import Rete from 'rete';
import * as Socket from '@/composer/sockets';
import ModelBuilder from '@/composer/modelBuilder';
import FloatInputControl from '@/composer/controls/FloatInputControl';

export default class ScrollXComponent extends Rete.Component {
  constructor() {
    super('Scroll X');
    this.path = 'Geometry';
  }

  builder(node) {
    const i1 = new Rete.Input('i1', 'Input', Socket.source);

    const scroll = new Rete.Input('scroll', 'Scroll', Socket.float);
    const speed = new Rete.Input('speed', 'Speed', Socket.float);

    const o0 = new Rete.Output('o0', '', Socket.source);

    scroll.addControl(new FloatInputControl(this.editor, 'scroll', false, 0.5));
    speed.addControl(new FloatInputControl(this.editor, 'speed', false, 0));

    return node
      .addInput(i1)
      .addInput(scroll)
      .addInput(speed)
      .addOutput(o0);
  }

  worker(node, inputs, outputs) {
    const scroll = inputs.scroll.length > 0 ? ModelBuilder.wrapFloatExpression(inputs.scroll[0]) : node.data.scroll;
    const speed = inputs.speed.length > 0 ? ModelBuilder.wrapFloatExpression(inputs.speed[0]) : node.data.speed;

    outputs.o0 = ModelBuilder.compose(inputs.i1[0],
      ModelBuilder.buildFunctionWithArgs('scrollX', scroll, speed));
  }
}
