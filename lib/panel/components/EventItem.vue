<template lang="pug">
.event
  | {{event.code}}
</template>

<script>
export default {
  name: 'Event',
  props: ['event'],
}
</script>
