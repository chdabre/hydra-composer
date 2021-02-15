<template>
  <div id="rete" ref="rete"></div>
</template>

<script>
import ModelBuilder from '@/composer/modelBuilder';
import Composer from '../composer';

export default {
  name: 'Composer',
  data() {
    return {
      composer: null,
    };
  },
  mounted() {
    const modelBuilder = new ModelBuilder(this.onUpdate);
    this.composer = Composer(this.$refs.rete, modelBuilder);
  },
  methods: {
    onUpdate(value) {
      this.$emit('update', value);
    },
  },
};
</script>

<style scoped>
#rete {
  width: 100%;
  height: 100%;
}
</style>
