<template lang="pug">
.event
  span.event-kind(
    v-if='detail'
    :class='kindClass'
  )
    | {{kindText}}
  .event-code(:class='[{ "detail" : detail }, { "hidden" : hidden }]')
    event-code(:code='code')
</template>

<script>
import EventCode from './EventCode';

export default {
  name: 'Event',
  props: ['kind', 'code', 'detail', 'hidden'],
  components: { EventCode },
  computed: {
    kindText() {
      const values = {
        'klass': 'class',
      };

      return values[this.kind] || this.kind;
    },
    kindClass() {
      return `kind-${this.kind}`;
    },
  },
}
</script>

<style scoped>
.event {
  display: flex;
  width: 100%;
}

.event-kind {
  border-radius: 3px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  color: hsla(0, 0%, 60%, 1);
  font-weight: bold;
  margin: 4px 0px 4px 0px;
  text-align: center;
  width: 60px;
  flex-shrink: 0;

  &.kind-id {
    color: hsla(0, 84%, 60%, 1);;
  }
  &.kind-klass {
    color: hsla(217, 106%, 47%, 1);;
  }
  &.kind-label {
    color:hsla(162, 33%, 55%, 1);
  }
  &.kind-matcher {
    color: hsl(311, 54%, 60%);
  }
  &.kind-navi {
    color: #fff;
    background-color: hsl(225, 100%, 72%);
  }
}

.event-code {
  width: 100%;

  &.hidden {
    color: grey;
  }

  &.detail {
    margin-left: 5px;
    width: calc(100% - 65px);
    color: grey;
  }
}
</style>
