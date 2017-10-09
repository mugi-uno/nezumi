<template lang="pug">
.app
  control(
    :watching='this.$store.state.panel.watching'
    :allText='allText'
  )
  event-area(:eventGroups='eventGroups')
</template>

<script>
import Control from './Control';
import EventArea from './EventArea';
import { mapGetters } from 'vuex'
import _ from 'lodash';

export default {
  name: 'App',
  components: { Control, EventArea },
  computed: {
    eventGroups() {
      return this.$store.state.panel.eventGroups;
    },
    allText() {
      const events = _.flattenDeep(
        this.eventGroups.map(eg => eg.open ? eg.events : eg.events.filter(e => e.show)
      ));

      return _.join(events.map(e => e.code), "\n");
    },
  },
}
</script>
