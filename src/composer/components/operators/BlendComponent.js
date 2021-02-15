/* eslint-disable class-methods-use-this, no-param-reassign */

import Rete from 'rete';
import * as Socket from '../sockets';
import ModelBuilder from '../modelBuilder';

export default class BlendComponent extends Rete.Component {
  constructor() {
    super('Blend');
    this.path = 'Operators';
  }

  builder(node) {
    const i1 = new Rete.Input('i1', 'Input', Socket.source);
    const i2 = new Rete.Input('i2', 'Blend', Socket.source);
    const o0 = new Rete.Output('o0', 'Output', Socket.source);

    return node
      .addInput(i1)
      .addInput(i2)
      .addOutput(o0);
  }

  worker(node, inputs, outputs) {
    outputs.o0 = ModelBuilder.compose(inputs.i1[0],
      ModelBuilder.buildFunctionWithArgs('blend', inputs.i2[0]));
  }
}
