import Rete from 'rete';
import VuePreviewControl from './PreviewControl.vue';

export default class PreviewControl extends Rete.Control {
  constructor(emitter, key, readonly) {
    super(key);
    this.component = VuePreviewControl;
    this.props = { emitter, ikey: key, readonly };
  }

  setValue(val) {
    this.vueContext.value = val;
  }
}
