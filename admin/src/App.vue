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

</style>
