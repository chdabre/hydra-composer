<template>
  <v-app>
    <v-app-bar
      app
    >
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss">
@import "./style/main";
</style>
