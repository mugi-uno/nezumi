<template lang="pug">
.event-group
  event-group-control(
    :size='event.capybara.length'
    :open='event.open'
    @toggle='toggle'
  )
  .event-items
    .event-item
      event-item(
        :code='event.capybara[0].code'
        :kind='event.capybara[0].kind'
        :hidden='event.hidden'
      )
    .event-all-item.event-item(
      v-show='event.open'
    )
      event-item(
        v-for='capybara in event.capybara'
        :key='capybara.key'
        :kind='capybara.kind'
        :code='capybara.code'
        :detail='true'
      )
</template>

<script>
import EventGroupControl from './EventGroupControl';
import EventItem from './EventItem';

export default {
  name: 'EventGroup',
  props: ['event'],
  components: { EventGroupControl, EventItem },

  methods: {
    toggle() {
      this.$store.dispatch('toggleEvent', this.event.key);
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
}

.event-items {
  display: flex;
  flex-direction: column;
  width: calc(100% - 30px);
}

.event-item {
  display: flex;
  flex-direction: column;
}
</style>

