/* eslint-disable class-methods-use-this, no-param-reassign */

import Rete from 'rete';
import SelectInputControl from '@/composer/controls/SelectInputControl';
import * as Socket from '../sockets';

export default class VariableComponent extends Rete.Component {
  constructor() {
    super('Variable');
    this.path = 'Math';
  }

  builder(node) {
    const o0 = new Rete.Output('o0', 'Output', Socket.float);

    return node
      .addControl(new SelectInputControl(this.editor, 'variable', false, ['time']))
      .addOutput(o0);
  }

  worker(node, inputs, outputs) {
    outputs.o0 = node.data.variable;
  }
}
