<template lang="pug">
.event-group-control
  template(v-if='expandable')
    v-btn(
      flat icon :color='toggleButtonColor'
      @click.native='toggle'
    )
      v-icon {{toggleIcon}}
  template(v-else)
    v-icon.default-icon(color='grey lighten-2') check
</template>

<script>
export default {
  name: 'EventGroupControl',
  props: ['size', 'open'],
  computed: {
    expandable() {
      return this.size && this.size > 1;
    },
    toggleButtonColor() {
      return this.open ? 'blue' : 'grey';
    },
    toggleIcon() {
      return this.open ? 'arrow_drop_up' : 'arrow_drop_down';
    },
  },
  methods: {
    toggle() {
      this.$emit('toggle');
    },
  },
}
</script>

<style scoped>
.event-group-control button {
  margin: 0px 5px 0px 0px;
  height: 20px;
  width: 20px;
}

.default-icon {
  margin: 0px 5px 0px 0px;
  height: 20px;
  width: 20px;
  font-size: 14px;
}
</style>
