<script setup>
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import Header from '@/components/AdminHeader.vue';
import Sidebar from "@/components/SideBar.vue";

const isCollapsed = ref(false);

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>

<template>

  <!-- Header -->
  <Header  
    :is-collapsed="isCollapsed"
    @toggle-sidebar="toggleSidebar"
></Header>

  <!-- Body -->
  <n-layout has-sider style="height: 100vh;">

    <!-- Side bar -->
    <Sidebar :collapsed="isCollapsed"></Sidebar>

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
