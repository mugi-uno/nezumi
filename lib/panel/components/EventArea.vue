<template lang="pug">
.event-area
  .event-area-body(ref='area')
    event-group(v-for='eg in eventGroups' :key='eg.key' :event-group='eg') 
  v-btn.copy-button(
    flat icon
    :loading="copying"
    :disabled="copying"
    :class='{ "indigo--text": copying }'
    @click.native='copy'
  )
    v-icon content_copy
    span.custom-loader(slot='loader')
      v-icon check
</template>

<script>
import EventGroup from './EventGroup';

export default {
  name: 'EventArea',
  props: ['eventGroups'],
  components: { EventGroup },
  data() {
    return {
      copying: false,
    };
  },
  methods: {
    copy() {
      const range = document.createRange();
      range.selectNodeContents(this.$refs.area);

      const selection = document.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);

      document.execCommand('copy');

      selection.removeAllRanges();

      this.copying = true;
      setTimeout(() => {
        this.copying = false;
      }, 1000);
    },
  },
}
</script>

<style scoped>
.event-area {
  position: relative;
  min-height: 100px;
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
  font-size: 12px;
  white-space: pre;
  color: #333;
  line-height: 16px;
  padding: 10px;
  box-shadow: 0px 1px 3px #ccc;
  border-radius: 2px;
}

.copy-button {
  position: absolute;
  right: 0px;
  top: 0px;
}
</style>
