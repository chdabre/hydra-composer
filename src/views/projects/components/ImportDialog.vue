<template>
  <projects-list-action :click="() => dialog = true">
    <v-icon>mdi-import</v-icon>
    <span class="subtitle-1">Import</span>

    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title class="headline">
          Import Project
        </v-card-title>

        <v-card-text>
          <v-textarea
            v-model="json"
            placeholder="Paste your markup here"
          ></v-textarea>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="importProject"
          >
            Import
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </projects-list-action>
</template>

<script>
import { mapMutations } from 'vuex';
import { PROJECTS_ADD_PROJECT } from '@/store/mutation-types';
import { v4 } from 'uuid';
import ProjectsListAction from './ProjectsListAction';

export default {
  name: 'ImportDialog',
  components: { ProjectsListAction },
  data() {
    return {
      dialog: false,
      json: '',
    };
  },
  methods: {
    ...mapMutations('projects', {
      addProject: PROJECTS_ADD_PROJECT,
    }),
    importProject() {
      const data = this.json.trim();
      if (data) {
        const project = { ...JSON.parse(data), id: v4() };
        this.addProject(project);
        this.dialog = false;
        this.json = '';
      }
    },
  },
};
</script>

<style scoped>

</style>
