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
import _ from 'lodash';
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

  watch: {
    eventGroups(newVal, oldVal) {
      if (newVal.length !== oldVal.length) return;

      const area = this.$refs.area;
      area.scrollTop = area.scrollHeight - area.offsetHeight;
    },
  },

  methods: {
    copy() {
      const dummy = document.createElement("textarea");
      dummy.style.cssText = "position:absolute; top: -100%; left:-100%";
      
      const events = _.flattenDeep(
        this.eventGroups.map(eg => eg.open ? eg.events : eg.events.filter(e => e.show)
      ));

      dummy.value = _.join(events.map(e => e.code), "\n");

      document.body.appendChild(dummy);

      dummy.select();

      document.execCommand('copy');
      document.body.removeChild(dummy);

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
}

.event-area-body {
  height: calc(100vh - 55px);
  overflow-y: scroll;
}

.copy-button {
  position: absolute;
  right: 0px;
  top: 0px;
}
</style>
