<template>
  <v-col cols="3" class=" flex-grow-1">
    <v-card class="d-flex align-center fill-height" @click="click">
      <v-card-text class="d-flex flex-column text-center">
        <slot></slot>
      </v-card-text>
    </v-card>
  </v-col>
</template>
<script>
export default {
  name: 'ProjectsListAction',
  props: {
    click: Function,
  },
};
</script>
