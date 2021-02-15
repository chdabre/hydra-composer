/* eslint-disable class-methods-use-this, no-param-reassign */

import Rete from 'rete';
import * as Socket from '@/composer/sockets';
import ModelBuilder from '@/composer/modelBuilder';
import FloatInputControl from '@/composer/controls/FloatInputControl';

export default class PosterizeComponent extends Rete.Component {
  constructor() {
    super('Posterize');
    this.path = 'Color';
  }

  builder(node) {
    const i1 = new Rete.Input('i1', 'Input', Socket.source);
    const bins = new Rete.Input('bins', 'Bins', Socket.float);
    const gamma = new Rete.Input('gamma', 'Gamma', Socket.float);

    const o0 = new Rete.Output('o0', '', Socket.source);

    bins.addControl(new FloatInputControl(this.editor, 'bins', false, 3.0));
    gamma.addControl(new FloatInputControl(this.editor, 'gamma', false, 0.6));

    return node
      .addInput(i1)
      .addInput(bins)
      .addInput(gamma)
      .addOutput(o0);
  }

  worker(node, inputs, outputs) {
    const bins = inputs.bins.length > 0 ? ModelBuilder.wrapFloatExpression(inputs.bins[0]) : node.data.bins;
    const gamma = inputs.gamma.length > 0 ? ModelBuilder.wrapFloatExpression(inputs.gamma[0]) : node.data.gamma;

    outputs.o0 = ModelBuilder.compose(inputs.i1[0],
      ModelBuilder.buildFunctionWithArgs('posterize', bins, gamma));
  }
}
