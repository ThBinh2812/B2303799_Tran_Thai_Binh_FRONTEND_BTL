<script setup lang="ts">
import { NIcon } from 'naive-ui';
import { defineEmits, defineProps } from 'vue';
import { useIcon } from '@/utils/useIcon';

const emit = defineEmits(['toggle-sidebar']);
const props = defineProps({
  isCollapsed: Boolean
});

const options = [
  {
    label: 'User Profile',
    key: 'profile',
    icon: () => useIcon('fa-solid fa-user')
  },
  {
    label: 'Edit Profile',
    key: 'editProfile',
    icon: () => useIcon('fa-solid fa-user-pen')
  },
  {
    label: 'Logout',
    key: 'logout',
    icon: () => useIcon('fa-solid fa-right-from-bracket')
  }
];
</script>

<template>
  <n-layout-header
    bordered
    style="
      background-color: #001f54;
      color: white;
      display: flex;
      align-items: center;
      padding: 0 20px;
      height: 64px;
      gap: 16px;
    "
  >
      <n-icon
    size="24px"
    class="toggle-icon"
    :class="{ 'rotated': props.isCollapsed }"
    @click="emit('toggle-sidebar')"
    >
      <i class="fa-solid fa-bars"></i>
    </n-icon>

    <div style="display: flex; align-items: center; gap: 10px;">
      <img src="/faviconW.ico" alt="logo" style="width: 28px; height: 28px;" />
      <h2 style="margin: 0; font-weight: 600;">READLY</h2>
    </div>

    <div style="flex: 1;"></div>

    <n-dropdown :options="options" style="margin-left: auto;">
      <n-button text-color="white" ghost>User Profile</n-button>
    </n-dropdown>
  </n-layout-header>
</template>

<style scoped>
.toggle-icon {
  cursor: pointer;
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
}

.toggle-icon.rotated {
  transform: rotate(180deg);
}
</style>
