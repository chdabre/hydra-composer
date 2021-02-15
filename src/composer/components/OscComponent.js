/* eslint-disable class-methods-use-this, no-param-reassign */

import Rete from 'rete';
import FloatInputControl from '@/composer/controls/FloatInputControl';
import ModelBuilder from '@/composer/modelBuilder';
import * as Socket from '../sockets';

export default class OscComponent extends Rete.Component {
  constructor() {
    super('Oscillator');
    this.path = 'Sources';
  }

  builder(node) {
    const frequency = new Rete.Input('frequency', 'Frequency', Socket.float);
    const sync = new Rete.Input('sync', 'Sync', Socket.float);
    const offset = new Rete.Input('offset', 'Offset', Socket.float);

    const o0 = new Rete.Output('o0', 'Output', Socket.source);

    frequency.addControl(new FloatInputControl(this.editor, 'frequency', false, 60));
    sync.addControl(new FloatInputControl(this.editor, 'sync', false, 0.1));
    offset.addControl(new FloatInputControl(this.editor, 'offset', false, 0.0));

    return node
      .addInput(frequency)
      .addInput(sync)
      .addInput(offset)
      .addOutput(o0);
  }

  worker(node, inputs, outputs) {
    const frequency = inputs.frequency.length > 0 ? ModelBuilder.wrapFloatExpression(inputs.frequency[0]) : node.data.frequency;
    const sync = inputs.sync.length > 0 ? ModelBuilder.wrapFloatExpression(inputs.sync[0]) : node.data.sync;
    const offset = inputs.offset.length > 0 ? ModelBuilder.wrapFloatExpression(inputs.offset[0]) : node.data.offset;

    outputs.o0 = ModelBuilder.buildFunctionWithArgs('osc', frequency, sync, offset);
  }
}
