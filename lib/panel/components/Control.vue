<template lang="pug">
.control
  v-btn(
    @click.native='toggle'
    :class='[watching ? "error" : "primary"]'
    small
  )
    | {{toggleButtonText}}
  v-btn.warning(
    @click.native='clear'
    small
  )
    | clear
</template>

<script>
export default {
  name: 'Control',
  props: ['watching'],
  computed: {
    toggleButtonText() {
      return this.watching ? 'STOP' : 'START';
    }
  },
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
