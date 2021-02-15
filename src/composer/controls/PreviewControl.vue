<template>
  <div class="preview">
    <a href="#" @click="menu = !menu">Preview</a>
    <div class="hydra-preview" v-if="menu">
      <hydra-renderer
        v-if="value"
        :model="value + '.out()'"
      ></hydra-renderer>
    </div>
  </div>
</template>

<script>
import HydraRenderer from '@/components/HydraRenderer';

export default {
  name: 'PreviewControl',
  components: { HydraRenderer },
  props: ['readonly', 'emitter', 'ikey', 'getData', 'putData'],
  data() {
    return {
      menu: true,
      value: '',
    };
  },
  mounted() {
    this.value = this.getData(this.ikey);
  },
};
</script>

<style scoped>
.preview {
  position: relative;
}
.hydra-preview {
  /*position: absolute;*/
  /*top: 1rem;*/
  /*left: 4rem;*/

  width: 240px;
  height: 120px;
}
</style>
