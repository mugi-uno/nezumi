<template lang="pug">
.event-group
  event-item(v-for='e in eventGroup.events' :key='e.key' :event='e')
</template>

<script>
import EventItem from './EventItem';

export default {
  name: 'EventGroup',
  props: ['eventGroup'],
  components: { EventItem },
}
</script>
