<script setup>
import { ref, h } from "vue";
import { useRouter } from "vue-router";
import { NIcon } from "naive-ui";
import { 
  PersonOutline, 
  PeopleOutline, 
  BookOutline, 
  BarChartOutline,
  FileTrayFullOutline,
  BusinessOutline,
  ChevronBackOutline,
  ChevronForwardOutline,
} from "@vicons/ionicons5";

const router = useRouter();
const activeKey = ref("books");
const collapsed = ref(false);

function renderIcon(icon, color = "white") {
  return () => h(NIcon, { color }, { default: () => h(icon) });
}

const menuOptions = [
  {
    label: "Quản lý độc giả",
    key: "readers",
    icon: renderIcon(PersonOutline, "white")
  },
  {
    label: "Quản lý nhân viên",
    key: "employees",
    icon: renderIcon(PeopleOutline, "white")
  },
  {
    label: "Nhà xuất bản",
    key: "publishers",
    icon: renderIcon(BusinessOutline, "white")
  },
  {
    label: "Quản lý sách",
    key: "books",
    icon: renderIcon(BookOutline, "white")
  },
  {
    label: "Quản lý mượn sách",
    key: "borrowRecords",
    icon: renderIcon(FileTrayFullOutline, "white")
  }, 
  {
    label: "Thống kê",
    key: "statistics",
    icon: renderIcon(BarChartOutline, "white")
  }
];

const menuTheme = {
  itemTextColor: "white",
  itemTextColorHover: "white",
  itemTextColorActive: "white",
  itemTextColorActiveHover: "#4fc3f7",
  itemColorHover: "#003c8f",
  itemColorActive: "#0d47a1"
};

function toggleSidebar() {
  collapsed.value = !collapsed.value;
}

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
    <div style="padding: 12px; text-align: center;">
      <button
        @click="toggleSidebar"
        style="background: none; border: none; cursor: pointer; color: white;"
      >
        <n-icon size="24">
          <component :is="collapsed ? ChevronForwardOutline : ChevronBackOutline" />
        </n-icon>
      </button>
    </div>
  </n-layout-sider>
</template>