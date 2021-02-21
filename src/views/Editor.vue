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
        ref="hydraRenderer"
        :model="model"
      ></hydra-renderer>
      <v-btn icon class="cast-icon" @click="toggleCasting"><v-icon>mdi-cast</v-icon></v-btn>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Composer from '@/components/Composer';
import HydraRenderer from '@/components/HydraRenderer';
import CastSender from '@/services/castSender';

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
      castSender: null,
      castSession: null,
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
      this.sendCastData();
    },
    async onEdit(value) {
      const image = await this.$refs.hydraRenderer.getScreenImageURL();
      await this.updateProject({ ...this.project, editor: value, image });
    },
    async toggleCasting() {
      if (!this.castSession) {
        if (!this.castSender) this.castSender = new CastSender();
        this.castSession = await this.castSender.requestSession();
        this.sendCastData();
      } else {
        this.castSender.stop();
        this.castSession = null;
      }
    },
    sendCastData() {
      if (this.castSession) {
        this.castSender.sendMessage({
          command: 'synth',
          model: this.model,
        });
      }
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

.cast-icon {
  position: absolute;
  top: .5rem;
  right: .5rem;
}
</style>
