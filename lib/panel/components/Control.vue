<template lang="pug">
.control
  v-btn(
    small
    :ripple='false'
    :class='[watching ? "red--text" : "grey--text", watching ? "red lighten-4" : ""]'
    @click.native='toggle'
  )
    v-icon
      | fiber_manual_record
    | REC
  v-btn(
    small
    @click.native='clear'
  )
    v-icon
      | clear
    | clear
</template>

<script>
export default {
  name: 'Control',
  props: ['watching'],
  methods: {
    toggle() {
      this.$store.dispatch('toggleWatching');
    },
    clear() {
      this.$store.dispatch('clearPanel');
    },
  },
}
</script>
