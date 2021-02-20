<template>
  <v-container fluid class="fill-height pa-0">
    <composer
      v-if="project"
      :editor="project.editor"
      @update="onUpdate($event)"
      @edit="onEdit($event)"
    ></composer>
    <v-card class="preview" elevation="4">
      <hydra-renderer
        :model="model"
      ></hydra-renderer>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Composer from '@/components/Composer';
import HydraRenderer from '@/components/HydraRenderer';

export default {
  name: 'Editor',
  components: {
    HydraRenderer,
    Composer,
  },
  props: {
    id: String,
  },
  data() {
    return {
      model: '',
    };
  },
  computed: {
    ...mapGetters('projects', [
      'projectById',
    ]),
    project() {
      return this.projectById(this.id);
    },
  },
  methods: {
    ...mapActions('projects', [
      'updateProject',
    ]),
    onUpdate(value) {
      this.model = value;
    },
    onEdit(value) {
      this.updateProject({ ...this.project, editor: value });
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
