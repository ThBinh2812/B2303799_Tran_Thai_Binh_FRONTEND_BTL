<script setup lang="ts">
import type {Component} from 'vue';
import {
  Pencil as EditIcon,
  LogOutOutline as LogoutIcon,
  PersonCircleOutline as UserIcon
} from '@vicons/ionicons5';
import { NIcon } from 'naive-ui';
import { h } from 'vue';

function renderIcon(icon: Component) {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    })
  };
};

const options = [
  {
    label: 'User Profile',
    key: 'profile',
    icon: renderIcon(UserIcon)
  },
  {
    label: 'Edit Profile',
    key: 'editProfile',
    icon: renderIcon(EditIcon)
  },
  {
    label: 'Logout',
    key: 'logout',
    icon: renderIcon(LogoutIcon)
  }
];

</script>

<template>
  <n-layout-header
    bordered
    style="background-color: #001f54; color: white; display: flex; align-items: center; padding: 0 16px; height: 64px;"
  >
    <img src="/faviconW.ico" alt="logo" style="width: 28px; height: 28px; margin-right: 8px; color: white;" />
    <h2 style="margin: 0; font-weight: 600; flex: 1;">READLY</h2>

    <n-dropdown :options="options" style="margin-left: auto;">
    <n-button text-color="white" ghost>User Profile</n-button>
  </n-dropdown>

  </n-layout-header>
</template>
