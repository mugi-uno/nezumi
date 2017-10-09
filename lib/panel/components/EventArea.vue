<template lang="pug">
.event-area
  .event-area-body(ref='area')
    event-group(v-for='eg in eventGroups' :key='eg.key' :event-group='eg')
</template>

<script>
import EventGroup from './EventGroup';

export default {
  name: 'EventArea',
  props: ['eventGroups'],
  components: { EventGroup },
  watch: {
    eventGroups(newVal, oldVal) {
      if (newVal.length !== oldVal.length) return;

      const area = this.$refs.area;
      area.scrollTop = area.scrollHeight - area.offsetHeight;
    },
  },
}
</script>

<style scoped>
.event-area {
  position: relative;
  min-height: 100px;
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
  font-size: 12px;
  white-space: pre;
  color: #333;
  line-height: 16px;
  padding: 10px;
}

.event-area-body {
  height: calc(100vh - 55px);
  overflow-y: scroll;
}
</style>
