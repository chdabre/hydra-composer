/* eslint-disable class-methods-use-this, no-param-reassign */

import Rete from 'rete';
import FloatInputControl from '@/composer/controls/FloatInputControl';
import * as Socket from '@/composer/sockets';

export default class NumberComponent extends Rete.Component {
  constructor() {
    super('Number');
    this.path = 'Math';
  }

  builder(node) {
    const o0 = new Rete.Output('o0', 'Output', Socket.float);

    return node
      .addControl(new FloatInputControl(this.editor, 'number', false, 0.0))
      .addOutput(o0);
  }

  worker(node, inputs, outputs) {
    outputs.o0 = node.data.number;
  }
}
