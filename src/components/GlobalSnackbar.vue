<template>
  <v-snackbar
    v-model="snackbar"
  >
    {{ text }}

    <template v-slot:action="{ attrs }">
      <v-btn
        color="pink"
        text
        v-bind="attrs"
        @click="clearToast"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import EventBus from '@/event-bus';

export default {
  name: 'GlobalSnackbar',
  data() {
    return {
      snackbar: false,
      text: '',
      timeout: null,
    };
  },
  created() {
    EventBus.$on('toast', ({ text, timeout }) => {
      this.showToast(text, timeout);
    });
  },
  methods: {
    showToast(text, timeout) {
      this.text = text;
      this.snackbar = true;
      setTimeout(this.clearToast, timeout);
    },
    clearToast() {
      this.snackbar = false;
      clearTimeout(this.timeout);
    },
  },
};
</script>

<style scoped>

</style>
