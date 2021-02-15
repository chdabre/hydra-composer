<template>
  <select class="select-input-control" :readonly="readonly" :value="value" @input="change($event)">
    <option v-for="item in items" :key="item">{{ item }}</option>
  </select>
</template>

<script>
export default {
  props: ['readonly', 'emitter', 'ikey', 'getData', 'putData', 'items'],
  data() {
    return {
      value: null,
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
    this.value = val || this.items[0];
    this.update();
  },
};
</script>
