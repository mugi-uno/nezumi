<template lang="pug">
.event
  .event-code
    | {{event.code}}
  v-btn.copy-button(
    flat icon 
    :loading="copying"
    :disabled="copying"
    :color='copyButtonColor'
    @click.native='copy'
  )
    v-icon content_copy
    span.custom-loader(slot='loader')
      v-icon check
</template>

<script>
import copyText from '../utils/copyText';

export default {
  name: 'Event',
  props: ['event'],

  data() {
    return {
      copying: false,
    };
  },

  computed: {
    copyButtonColor() {
      return this.copying ? 'indigo' : 'grey';
    },
  },

  methods: {
    copy() {
      if (!copyText(this.event.code)) return;

      this.copying = true;
      setTimeout(() => {
        this.copying = false;
      }, 1000);
    },
  }
}
</script>

<style scoped>
.event {
  position: relative;
  width: 100%;
  padding-right: 25px;
}

.event-code {
  width: 100%;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
}

.copy-button {
  position: absolute;
  right: -10px;
  top: -12px;
  height: 25px;
  width: 25px;

  & i {
    font-size: 14px;
  }
}
</style>
