import Rete from 'rete';
// eslint-disable-next-line import/extensions,import/no-unresolved
import VueSelectInputControl from './VueSelectInputControl.vue';

export default class SelectInputControl extends Rete.Control {
  constructor(emitter, key, readonly, items) {
    super(key);
    this.component = VueSelectInputControl;
    this.props = {
      emitter, ikey: key, readonly, items,
    };
  }

  setValue(val) {
    this.vueContext.value = val;
  }
}
