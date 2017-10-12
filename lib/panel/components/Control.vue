<template lang="pug">
.control
  .left-control
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
  .right-control
    .check
      v-checkbox(
        label='SHOW ALL'
        :input-value='showHidden'
        @change='toggleHidden'
        hide-details
      )
    v-btn.copy-button(
      small
      :loading="copying"
      :disabled="copying"
      :class='[copying ? "indigo--text" : "" ]'
      @click.native='copy'
    )
      v-icon content_copy
      | COPY ALL
      span.custom-loader(slot='loader')
        v-icon check
        | COPIED!!
</template>

<script>
import copyText from '../utils//copyText';

export default {
  name: 'Control',
  props: ['watching', 'allText', 'showHidden'],

  data() {
    return {
      copying: false,
    };
  },

  methods: {
    toggle() {
      this.$store.dispatch('toggleWatching');
    },
    toggleHidden() {
      this.$store.dispatch('toggleHidden');
    },
    clear() {
      this.$store.dispatch('clearPanel');
    },
    copy() {
      if (!copyText(this.allText)) return;

      this.copying = true;
      setTimeout(() => {
        this.copying = false;
      }, 1000);
    },
  },
}
</script>

<style scoped>
.control {
  height: 35px;
  display: flex;
  justify-content: space-between;
}

.right-control {
  display: flex;
  align-items: center;
}

.check {
  width: 130px;
}
</style>
