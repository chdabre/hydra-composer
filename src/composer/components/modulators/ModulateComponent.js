/* eslint-disable class-methods-use-this, no-param-reassign */

import Rete from 'rete';
import * as Socket from '@/composer/sockets';
import ModelBuilder from '@/composer/modelBuilder';
import FloatInputControl from '@/composer/controls/FloatInputControl';

export default class ModulateComponent extends Rete.Component {
  constructor() {
    super('Modulate');
    this.path = 'Modulators';
  }

  builder(node) {
    const i1 = new Rete.Input('i1', 'Input', Socket.source);
    const texture = new Rete.Input('texture', 'Texture', Socket.source);
    const amount = new Rete.Input('amount', 'Amount', Socket.float);

    const o0 = new Rete.Output('o0', '', Socket.source);

    amount.addControl(new FloatInputControl(this.editor, 'amount', false, 0.1));

    return node
      .addInput(i1)
      .addInput(texture)
      .addInput(amount)
      .addOutput(o0);
  }

  worker(node, inputs, outputs) {
    const amount = inputs.amount.length > 0 ? ModelBuilder.wrapFloatExpression(inputs.amount[0]) : node.data.amount;

    outputs.o0 = ModelBuilder.compose(inputs.i1[0],
      ModelBuilder.buildFunctionWithArgs('modulate', inputs.texture[0], amount));
  }
}
