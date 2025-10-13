<script setup>
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useIcon } from "@/utils/useIcon";

const props = defineProps({
  collapsed: Boolean
});

const router = useRouter();
const route = useRoute();

// ===== MENU OPTIONS =====
const menuOptions = [
  {
    label: "Nhà xuất bản",
    key: "publishers",
    icon: () => useIcon("fa-solid fa-building", "20px")
  },
  {
    label: "Quản lý sách",
    key: "books",
    icon: () => useIcon("fa-solid fa-book", "20px")
  },
  {
    label: "Quản lý mượn sách",
    key: "borrowRecords",
    icon: () => useIcon("fa-solid fa-book-reader", "20px")
  },
  {
    label: "Thống kê",
    key: "statistics",
    icon: () => useIcon("fa-solid fa-chart-bar", "20px")
  }
];

// ===== ACTIVE MENU SYNC VỚI ROUTE =====
const activeKey = ref("");

//  lấy key từ path
const getActiveKeyFromRoute = (path) => {
  if (path.includes("publishers")) return "publishers";
  if (path.includes("books")) return "books";
  if (path.includes("borrowRecords")) return "borrowRecords";
  if (path.includes("statistics")) return "statistics";
  return "";
};

// khi component mount hoặc route thay đổi → update activeKey
watch(
  () => route.path,
  (newPath) => {
    activeKey.value = getActiveKeyFromRoute(newPath);
  },
  { immediate: true }
);

// ===== Handle click menu =====
function handleMenuSelect(key) {
  activeKey.value = key;
  router.push({ path: `/${key}` });
}

// ===== Collapse =====
const collapsed = ref(props.collapsed);
watch(() => props.collapsed, (val) => (collapsed.value = val));

const menuTheme = {
  itemTextColor: "white",
  itemTextColorHover: "white",
  itemTextColorActive: "white",
  itemTextColorActiveHover: "#4fc3f7",
  itemColorHover: "#003c8f",
  itemColorActive: "#0d47a1"
};
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
        :value="activeKey"
        :theme-overrides="menuTheme"
        style="background-color: transparent; color: white;"
        @update:value="handleMenuSelect"
      />
    </div>
  </n-layout-sider>
</template>
