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

      <v-col cols="3">
        <v-card height="250" class="d-flex align-center" @click="onCreateProject">
          <v-card-text class="text-center"><v-icon>mdi-plus</v-icon></v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ProjectCard from '@/views/ProjectCard';

export default {
  name: 'Projects',
  components: { ProjectCard },
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
