<template>
  <canvas ref="hydra" class="hydra"></canvas>
</template>

<script>
import Hydra from 'hydra-synth';

function blobToDataURL(blob) {
  return new Promise((fulfill, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => fulfill(reader.result);
    reader.readAsDataURL(blob);
  });
}

export default {
  name: 'HydraRenderer',
  props: {
    model: String,
    show: Boolean,
  },
  data() {
    return {
      hydra: null,
    };
  },
  watch: {
    model() {
      this.update();
    },
    show() {
      if (this.show) {
        this.update();
      } else {
        this.hydra.hush();
      }
    },
  },
  mounted() {
    this.initHydra();
    this.update();
  },
  beforeDestroy() {
    this.hydra.hush();
  },
  methods: {
    initHydra() {
      this.hydra = new Hydra({
        canvas: this.$refs.hydra,
        makeGlobal: false,
      });
    },
    update() {
      if (this.hydra) {
        if (this.model) {
          try {
            this.hydra.eval(this.model);
          } catch (e) {
            this.hydra.hush();
          }
        } else {
          this.hydra.hush();
        }
      }
    },
    async getScreenImageURL() {
      const hydraImage = await new Promise((resolve) => {
        this.hydra.getScreenImage(resolve);
      });
      return blobToDataURL(hydraImage);
    },
  },
};
</script>

<style scoped>
.hydra {
  width: 100%;
  z-index: 100;
}
</style>
