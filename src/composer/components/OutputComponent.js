/* eslint-disable class-methods-use-this, no-param-reassign */

import Rete from 'rete';
import * as Socket from '../sockets';

export default class OutputComponent extends Rete.Component {
  constructor(modelBuilder) {
    super('Output');
    this.path = '';

    this.modelBuilder = modelBuilder;
  }

  builder(node) {
    const input = new Rete.Input('i1', 'Input', Socket.source);

    return node
      .addInput(input);
  }

  worker(node, inputs) {
    if (inputs.i1[0]) {
      this.modelBuilder.build(`${inputs.i1[0]}.out()`);
    } else {
      this.modelBuilder.build('');
    }
  }
}
