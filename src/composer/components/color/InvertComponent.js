/* eslint-disable class-methods-use-this, no-param-reassign */

import Rete from 'rete';
import * as Socket from '@/composer/sockets';
import ModelBuilder from '@/composer/modelBuilder';
import FloatInputControl from '@/composer/controls/FloatInputControl';

export default class InvertComponent extends Rete.Component {
  constructor() {
    super('Invert');
    this.path = 'Color';
  }

  builder(node) {
    const i1 = new Rete.Input('i1', 'Input', Socket.source);
    const amount = new Rete.Input('amount', 'Amount', Socket.float);

    const o0 = new Rete.Output('o0', 'Output', Socket.source);

    amount.addControl(new FloatInputControl(this.editor, 'amount', false, 0.4));

    return node
      .addInput(i1)
      .addInput(amount)
      .addOutput(o0);
  }

  worker(node, inputs, outputs) {
    const amount = inputs.amount.length > 0 ? ModelBuilder.wrapFloatExpression(inputs.amount[0]) : node.data.amount;

    outputs.o0 = ModelBuilder.compose(inputs.i1[0],
      ModelBuilder.buildFunctionWithArgs('invert', amount));
  }
}
