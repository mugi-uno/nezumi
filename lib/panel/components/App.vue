<template lang="pug">
.app
  control(
    :watching='this.$store.state.panel.watching'
  )
  event-area(:eventGroups='this.$store.state.panel.eventGroups')
</template>

<script>
import Control from './Control';
import EventArea from './EventArea';
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: { Control, EventArea },

     data () {
      return {
        ex11: ['red', 'indigo', 'orange', 'primary', 'secondary', 'success', 'info', 'warning', 'error',
              'red darken-3', 'indigo darken-3', 'orange darken-3']
      }
    }

}
</script>
