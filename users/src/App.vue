<script setup>
import { RouterView } from 'vue-router';
import { NNotificationProvider } from 'naive-ui';

</script>

<template>
  <n-notification-provider>

    <RouterView />
    
  </n-notification-provider>

</template>

<style>
.n-menu .n-icon {
  color: white !important;
}

.n-menu .n-menu-item:hover .n-icon {
  color: white !important;
}

.n-menu .n-menu-item--active .n-icon {
  color: white !important;
}

</style>
