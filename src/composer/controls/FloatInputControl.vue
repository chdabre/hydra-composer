<template>
  <input class="float-input-control" type="number" step="0.1" :readonly="readonly" :value="value" @input="change($event)"/>
</template>

<script>
export default {
  props: ['readonly', 'emitter', 'ikey', 'getData', 'putData', 'defaultValue'],
  data() {
    return {
      value: 0,
    };
  },
  methods: {
    change(e) {
      this.value = e.target.value;
      this.update();
    },
    update() {
      if (this.ikey) this.putData(this.ikey, this.value);
      this.emitter.trigger('process');
    },
  },
  mounted() {
    const val = this.getData(this.ikey);
    this.value = val || this.defaultValue;
    this.update();
  },
};
</script>
