/* eslint-disable class-methods-use-this, no-param-reassign */

import Rete from 'rete';
import * as Socket from '@/composer/sockets';
import ModelBuilder from '@/composer/modelBuilder';
import FloatInputControl from '@/composer/controls/FloatInputControl';

export default class LumaComponent extends Rete.Component {
  constructor() {
    super('Luma');
    this.path = 'Color';
  }

  builder(node) {
    const i1 = new Rete.Input('i1', 'Input', Socket.source);
    const threshold = new Rete.Input('threshold', 'Threshold', Socket.float);
    const tolerance = new Rete.Input('tolerance', 'Tolerance', Socket.float);

    const o0 = new Rete.Output('o0', '', Socket.source);

    threshold.addControl(new FloatInputControl(this.editor, 'threshold', false, 0.5));
    tolerance.addControl(new FloatInputControl(this.editor, 'tolerance', false, 0.1));

    return node
      .addInput(i1)
      .addInput(threshold)
      .addInput(tolerance)
      .addOutput(o0);
  }

  worker(node, inputs, outputs) {
    const threshold = inputs.threshold.length > 0 ? ModelBuilder.wrapFloatExpression(inputs.threshold[0]) : node.data.threshold;
    const tolerance = inputs.tolerance.length > 0 ? ModelBuilder.wrapFloatExpression(inputs.tolerance[0]) : node.data.tolerance;

    outputs.o0 = ModelBuilder.compose(inputs.i1[0],
      ModelBuilder.buildFunctionWithArgs('luma', threshold, tolerance));
  }
}
