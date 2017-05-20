<template>
<div class="container">
  <app-header />
  <hr>
  <div class="row">
    <app-server-list />
    <app-server-logs />
  </div>
  <hr>
  <app-footer />
</div>
</template>

<script>
import ServerList from './components/ServerList.vue';
import ServerLogs from './components/ServerLogs.vue';
export default {
  components: {
    'app-server-list': ServerList,
    'app-server-logs': ServerLogs
  }
}
</script>

<style></style>
