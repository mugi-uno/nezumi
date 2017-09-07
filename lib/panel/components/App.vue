<template lang="pug">
.app
  control(
    :watching='this.$store.state.panel.watching'
  )
  code-list(
    :code='code'
  )
</template>

<script>
import Control from './Control';
import CodeList from './CodeList';
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: { Control, CodeList },
  computed: {
    code() {
      return this.$store.state.panel.events.map(e => e.code);
    },
  }
}
</script>
