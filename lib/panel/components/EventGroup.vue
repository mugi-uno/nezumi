<template lang="pug">
.event-group
  event-item(v-for='e in events' :key='e.key' :event='e')
</template>

<script>
import EventItem from './EventItem';

export default {
  name: 'EventGroup',
  props: ['eventGroup'],
  components: { EventItem },
  computed: {
    events() {
      return this.eventGroup.events.filter(e => e.show);
    },
  },
}
</script>
