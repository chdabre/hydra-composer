<template>
  <v-container fluid class="fill-height pa-0">
    <composer
      @update="onUpdate($event)"
    ></composer>
    <v-card class="preview" elevation="4">
      <hydra-renderer
        :model="model"
      ></hydra-renderer>
    </v-card>
  </v-container>
</template>

<script>
import Composer from '@/components/Composer';
import HydraRenderer from '@/components/HydraRenderer';

export default {
  name: 'Editor',
  data() {
    return {
      model: '',
    };
  },
  components: {
    HydraRenderer,
    Composer,
  },
  methods: {
    onUpdate(value) {
      this.model = value;
    },
  },
};
</script>

<style lang="scss" scoped>
.preview {
  position: absolute;
  top: 1rem;
  right: 1rem;

  width: 20%;
}
</style>
