<template lang="pug">
.event-code
  .code
    | {{code}}
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
import _ from 'lodash';
import copyText from '../utils/copyText';

export default {
  name: 'EventCode',
  props: ['code'],

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
      if (!copyText(this.code)) return;

      this.copying = true;
      setTimeout(() => {
        this.copying = false;
      }, 1000);
    },
  }
}
</script>

<style scoped>
:root {
  --code-height: 25px;
}

.event-code {
  margin: 5px 0px 5px 0px;
  position: relative;
  width: 100%;
  padding-right: var(--code-height);
  
  &:hover {
    background-color: #fffee7;
  }
}

.code {
  width: 100%;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
}

.copy-button {
  position: absolute;
  right: -10px;
  top: -10px;
  height: var(--code-height);
  width: var(--code-height);

  & i {
    font-size: 14px;
  }
}
</style>
