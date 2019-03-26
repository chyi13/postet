<template>
  <div class="home">
    <Preview msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Preview from '@/components/Interface.vue'

export default {
  name: 'home',
  components: {
      Preview
  }
}
</script>
