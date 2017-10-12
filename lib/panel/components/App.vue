<template lang="pug">
v-app(light)
  .app
    control(
      :watching='this.$store.state.panel.watching'
      :allText='allText'
      :showHidden='showHidden'
    )
    event-area(:events='events')
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
    events() {
      if (this.$store.state.panel.showHidden) {
        return this.$store.state.panel.events;
      }
      return this.$store.state.panel.events.filter(e => !e.hidden);
    },
    allText() {
      return _.join(this.events.map(e => e.capybara[0].code), "\n");
    },
    showHidden() {
      return this.$store.state.panel.showHidden;
    },
  },
}
</script>
