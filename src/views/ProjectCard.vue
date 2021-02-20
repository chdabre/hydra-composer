<template>
  <v-col cols="3">
    <v-card height="250" class="d-flex flex-column">
      <v-img
        v-if="project.image"
        :src="project.image"
        @click="$router.push(`/edit/${project.id}`)"
      ></v-img>

      <v-card-text
        class="flex-grow-1"
        @click="$router.push(`/edit/${project.id}`)"
      >
        <span class="subtitle-1">{{ project.name }}</span>
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
