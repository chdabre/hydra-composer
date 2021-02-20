<template>
  <v-col cols="3">
    <v-card class="d-flex flex-column">
      <a :href="`/edit/${project.id}`">
        <v-img
          v-if="project.image"
          :src="project.image"
        ></v-img>
      </a>

      <v-card-text
        class="flex-grow-1"
      >
        <a :href="`/edit/${project.id}`" class="subtitle-1 text-decoration-none">{{ project.name }}</a>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon @click="deleteProject(project)">mdi-delete</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'ProjectCard',
  props: { project: Object },
  methods: {
    ...mapActions('projects', [
      'deleteProject',
    ]),
  },
};
</script>
