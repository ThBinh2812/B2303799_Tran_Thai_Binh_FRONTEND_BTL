<script setup>
import { RouterView } from 'vue-router';
import { NNotificationProvider } from 'naive-ui';

</script>

<template>
  <n-notification-provider
    placement="top-right"
    :max="3"
    :duration="3000"
    :closable="true"
  >
    <RouterView />
  </n-notification-provider>

</template>

<style>
.custom-message {
  animation: slide-left 0.3s ease-in-out;
  font-weight: 500;
}

.custom-success {
  background: #f6ffed !important;
  color: #389e0d !important;
  border-left: 4px solid #52c41a;
}

.custom-error {
  background: #fff1f0 !important;
  color: #cf1322 !important;
  border-left: 4px solid #f5222d;
}

.custom-warning {
  background: #fffbe6 !important;
  color: #d48806 !important;
  border-left: 4px solid #faad14;
}

.custom-info {
  background: #e6f7ff !important;
  color: #0958d9 !important;
  border-left: 4px solid #1890ff;
}

@keyframes slide-left {
  from {
    transform: translateX(20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

</style>
