<template lang="pug">
.event-group-control
  v-btn.control-button(
    flat icon :color='toggleButtonColor'
    @click.native='toggle'
  )
    v-icon {{toggleIcon}}
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
.control-button {
  margin: 0px 5px 0px 0px;
  height: 25px;
  width: 25px;
}

.default-icon {
  margin: 0px 5px 0px 0px;
  height: 25px;
  width: 25px;
  font-size: 14px;
}
</style>
