<template lang="pug">
.code
  .code-body(
    ref='code'
    v-html='codeHtml'
  )
  v-btn.copy-button(
    small outline
    :loading="copying"
    :disabled="copying"
    :class='{ "indigo--text": copying }'
    @click.native='copy'
  )
    | copy
    span(slot='loader') COPIED!
</template>

<script>
import _ from 'lodash';

export default {
  name: 'CodeList',
  props: ['code'],
  data() {
    return {
      copying: false,
    };
  },
  computed: {
    codeHtml() {
      return _.join(this.code, '\n');
    }
  },
  methods: {
    copy() {
      const range = document.createRange();
      range.selectNodeContents(this.$refs.code);

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
.code {
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
