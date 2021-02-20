<template>
  <v-container>
    <v-row>
      <v-col>
        <h3>Projects</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-card height="200" class="d-flex align-center" @click="onCreateProject">
          <v-card-text class="text-center">New Project</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Projects',
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

<style scoped>

</style>
