<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useIcon } from "@/utils/useIcon";


const props       = defineProps({
  collapsed: Boolean
});
const router      = useRouter();
const activeKey   = ref("books");
const menuOptions = [
  {
    label: "Thông tin nhân viên",
    key: "employees",
    icon: () => useIcon('fa-solid fa-user-tie', '20px')
  },
  {
    label: "Nhà xuất bản",
    key: "publishers",
    icon: () => useIcon('fa-solid fa-building', '20px')
  },
  {
    label: "Quản lý sách",
    key: "books",
    icon: () => useIcon('fa-solid fa-book', '20px')
  },
  {
    label: "Quản lý mượn sách",
    key: "borrowRecords",
    icon: () => useIcon('fa-solid fa-book-reader', '20px')
  }, 
  {
    label: "Thống kê",
    key: "statistics",
    icon: () => useIcon('fa-solid fa-chart-bar', '20px')
  }
];

const collapsed = ref(props.collapsed);
watch(() => props.collapsed, (val) => collapsed.value = val);

const menuTheme = {
  itemTextColor: "white",
  itemTextColorHover: "white",
  itemTextColorActive: "white",
  itemTextColorActiveHover: "#4fc3f7",
  itemColorHover: "#003c8f",
  itemColorActive: "#0d47a1"
};

// Xử lý chuyển route khi chọn menu
function handleMenuSelect(key) {
  activeKey.value = key;
  router.push({ path: `/${key}` });
}
</script>

<template>
  <n-layout-sider
    bordered
    collapse-mode="width" 
    :collapsed-width="64"
    width="220"
    style="
      background-color: #001f54; 
      color: white; 
      display: flex; 
      flex-direction: column; 
      justify-content: space-between;"
    :collapsed="collapsed"
  >
    <div>
      <n-menu
        :options="menuOptions"
        v-model:value="activeKey"
        :theme-overrides="menuTheme"
        style="background-color: transparent; color: white;"
        @update:value="handleMenuSelect"
      />
    </div>

  </n-layout-sider>

</template>