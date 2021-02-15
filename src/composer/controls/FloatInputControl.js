import Rete from 'rete';
import VueFloatInputControl from './FloatInputControl.vue';

export default class FloatInputControl extends Rete.Control {
  constructor(emitter, key, readonly, defaultValue) {
    super(key);
    this.component = VueFloatInputControl;
    this.props = {
      emitter, ikey: key, readonly, defaultValue,
    };
  }

  setValue(val) {
    this.vueContext.value = val;
  }
}
