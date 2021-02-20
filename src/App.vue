<template>
  <v-app>
    <v-app-bar app dense>
      <v-app-bar-title>
        <router-link to="/">
          Hydra
        </router-link>
      </v-app-bar-title>
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
