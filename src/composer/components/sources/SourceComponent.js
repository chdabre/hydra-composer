/* eslint-disable class-methods-use-this, no-param-reassign */

import Rete from 'rete';
import SelectInputControl from '@/composer/controls/SelectInputControl';
import * as Socket from '@/composer/sockets';
import ModelBuilder from '@/composer/modelBuilder';

export default class SourceComponent extends Rete.Component {
  constructor() {
    super('Source');
    this.path = 'Sources';
  }

  builder(node) {
    const o0 = new Rete.Output('o0', '', Socket.source);

    return node
      .addControl(new SelectInputControl(this.editor, 'variable', false, ['o0']))
      .addOutput(o0);
  }

  worker(node, inputs, outputs) {
    outputs.o0 = ModelBuilder.buildFunctionWithArgs('src', node.data.variable);
  }
}
