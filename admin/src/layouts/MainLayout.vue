<script setup>
import { RouterView } from 'vue-router';
import Header from '@/components/AdminHeader.vue';
import Sidebar from "@/components/SideBar.vue";

</script>

<template>

  <!-- Header -->
  <Header></Header>

  <!-- Body -->
  <n-layout has-sider style="height: 100vh;">
    <!-- Side bar -->
    <Sidebar></Sidebar>

    <!-- Main Layout -->
    <n-layout>
      <!-- Nội dung -->
      <n-layout-content content-style="padding: 24px;">
        <!-- Render các trang -->
        <RouterView />
      </n-layout-content>

    </n-layout>

  </n-layout>
  <!-- Body -->

</template>
