<template>
  <v-container>
    <v-row>
      <v-col>
        <h3>Projects</h3>
      </v-col>
    </v-row>
    <v-row>
      <project-card
        v-for="project in allProjects" :key="project.id"
        :project="project"
      ></project-card>

      <projects-list-action :click="onCreateProject">
        <v-icon>mdi-plus</v-icon>
        <span class="subtitle-1">New Project</span>
      </projects-list-action>

      <import-dialog></import-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ProjectCard from './components/ProjectCard';
import ProjectsListAction from './components/ProjectsListAction';
import ImportDialog from './components/ImportDialog';

export default {
  name: 'Projects',
  components: { ImportDialog, ProjectsListAction, ProjectCard },
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    ...mapGetters('projects', [
      'allProjects',
    ]),
  },
  methods: {
    ...mapActions('projects', [
      'createProject',
    ]),
    async onCreateProject() {
      const newProject = await this.createProject();
      this.$router.push(`/edit/${newProject.id}`);
    },
  },
};
</script>
