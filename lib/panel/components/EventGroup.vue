<template lang="pug">
.event-group
  event-group-control(
    :size='events.length'
    :open='eventGroup.open'
    @toggle='toggle'
  )
  .event-items
    event-item(
      v-for='e in showEvents'
      :key='e.key'
      :event='e'
    )
</template>

<script>
import EventGroupControl from './EventGroupControl';
import EventItem from './EventItem';

export default {
  name: 'EventGroup',
  props: ['eventGroup'],
  components: { EventGroupControl, EventItem },
  computed: {
    events() {
      return this.eventGroup.events;
    },

    showEvents() {
      if (this.eventGroup.open) {
        return this.events;
      }

      return this.events.filter(e => e.show);
    },
  },

  methods: {
    toggle() {
      this.$store.dispatch('toggleEventGroup', this.eventGroup.key);
    },
  },
}
</script>

<style scoped>
.event-group {
  display: flex;
  align-items: center;
  box-shadow: -1px 1px 1px #ddd;
  border-radius: 2px;
  margin: 5px;
  padding: 5px;
}

.event-items {
  display: flex;
  flex-direction: column;
  width: calc(100% - 25px);
}
</style>

