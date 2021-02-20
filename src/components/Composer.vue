<template>
  <div id="rete" ref="rete"></div>
</template>

<script>
import ModelBuilder from '@/composer/modelBuilder';
import Composer from '../composer';

export default {
  name: 'Composer',
  props: {
    editor: Object,
  },
  data() {
    return {
      composer: null,
      lastData: null,
    };
  },
  async mounted() {
    const modelBuilder = new ModelBuilder((v) => this.$emit('update', v));
    this.composer = await Composer.create(this.$refs.rete, modelBuilder);
    await this.composer.load(this.editor);

    this.composer.onUpdate(async () => {
      this.$emit('edit', await this.composer.getJSON());
    });
  },
};
</script>

<style scoped>
#rete {
  width: 100%;
  height: 100%;
}
</style>
