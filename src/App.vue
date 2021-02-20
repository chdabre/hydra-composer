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
    <global-snackbar></global-snackbar>
  </v-app>
</template>

<script>
import GlobalSnackbar from './components/GlobalSnackbar';

export default {
  name: 'App',
  components: { GlobalSnackbar },
};
</script>

<style lang="scss">
@import "./style/main";
</style>
