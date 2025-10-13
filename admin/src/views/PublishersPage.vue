<script setup>
import { ref, h, computed, onMounted, resolveComponent, watch } from 'vue';
import { NButton, NDataTable, NInput, NPagination } from 'naive-ui';
import { getPublishers, deletePublisher } from '@/services/publishers.service.js';
import PublisherModal from '@/components/PublisherModal.vue';
import { useNotify } from '@/utils/notify';
import { useIcon } from '@/utils/useIcon';
import LoadingOverLay from '@/components/LoadingOverLay.vue';

const messageType = useNotify();
const DB_URL = import.meta.env.VITE_DB_URL;

// ====== State ======
const publishers = ref([]);
const loading = ref(false);
const actionsDisable = ref(false);

const searchText = ref('');
const currentPage = ref(1);
const pageSize = ref(5);

const showAddModal = ref(false);
const showEditModal = ref(false);
const editPublisher = ref({});
const newPublisher = ref({});

// ====== Fetch ======
const fetchPublishers = async () => {
  loading.value = true;
  const res = await getPublishers();
  if (res.status === 'success') {
    publishers.value = res.data;
  } else {
    messageType.error(res.message || 'Không thể tải danh sách nhà xuất bản');
  }
  loading.value = false;
};

onMounted(fetchPublishers);

// ====== Search & Pagination ======
const filteredPublishers = computed(() => {
  const q = searchText.value.trim().toLowerCase();
  if (!q) return publishers.value;
  return publishers.value.filter((p) =>
    [p.TENNXB, p.EMAIL, p.DIACHI].some((f) => f?.toLowerCase().includes(q)),
  );
});

const pageCount = computed(() => Math.ceil(filteredPublishers.value.length / pageSize.value));

const paginatedPublishers = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredPublishers.value.slice(start, start + pageSize.value);
});

watch(
  () => pageCount.value,
  (newCount) => {
    if (newCount === 0) currentPage.value = 1;
    else if (currentPage.value > newCount) currentPage.value = newCount;
  },
);

// ====== CRUD ======
function openAddModal() {
  showAddModal.value = true;
  newPublisher.value = {
    MANXB: '',
    TENNXB: '',
    EMAIL: '',
    DIACHI: '',
    SDT: '',
  };
}

function openEditModal(publisher) {
  editPublisher.value = { ...publisher };
  showEditModal.value = true;
}

const handlePublisherSaved = (savedPublisher) => {
  if (!savedPublisher?.MANXB) return;

  const index = publishers.value.findIndex((p) => p.MANXB === savedPublisher.MANXB);
  if (index !== -1) {
    publishers.value[index] = { ...publishers.value[index], ...savedPublisher };
  } else {
    publishers.value.push(savedPublisher);
  }
};

const handleDeletePublisher = async (id) => {
  actionsDisable.value = true;
  loading.value = true;

  try {
    const res = await deletePublisher(id);
    messageType[res.status]?.(res.message);

    if (res.status === 'success') {
      publishers.value = publishers.value.filter((p) => p.MANXB !== id);
    }
  } catch {
    messageType.error('Có lỗi xảy ra khi xóa nhà xuất bản');
  } finally {
    actionsDisable.value = false;
    loading.value = false;
  }
};

// ====== Columns ======
const columns = [
  { title: 'Mã NXB', key: 'MANXB', align: 'center', width: 100 },
  { title: 'Tên NXB', key: 'TENNXB' },
  { title: 'Địa chỉ', key: 'DIACHI', width: 200 },
  {
    title: 'Hành động',
    key: 'actions',
    align: 'center',
    width: 150,
    render(row) {
      if (actionsDisable.value) {
        return h('span', { style: 'color: #999; font-style: italic;' }, 'Đang xử lý...');
      }

      const editBtn = h(
        NButton,
        {
          size: 'small',
          type: 'primary',
          circle: true,
          style: 'margin-right: 8px;',
          onClick: () => openEditModal(row),
        },
        { default: () => useIcon('fa-solid fa-pen', '14px') },
      );

      const delBtn = h(
        resolveComponent('n-popconfirm'),
        {
          onPositiveClick: () => handleDeletePublisher(row.MANXB),
          positiveText: 'Xóa',
          negativeText: 'Hủy',
          type: 'error',
          showIcon: true,
          trigger: 'click',
        },
        {
          trigger: () =>
            h(
              NButton,
              { size: 'small', type: 'error', circle: true },
              { default: () => useIcon('fa-solid fa-trash', '14px') },
            ),
          default: () => `Bạn có chắc chắn muốn xóa NXB "${row.TENNXB}" không?`,
        },
      );

      return [editBtn, delBtn];
    },
  },
];
</script>

<template>
  <div style="padding: 20px; background: #fff; border-radius: 8px">
    <LoadingOverLay :show="loading" />

    <!-- Thanh tìm kiếm -->
    <div style="display: flex; gap: 12px; margin-bottom: 16px; align-items: flex-end">
      <div style="display: flex; flex-direction: column">
        <label style="margin-bottom: 4px; font-weight: 500">
          <font-awesome-icon :icon="['fas', 'search']" /> Tìm kiếm
        </label>
        <n-input
          v-model:value="searchText"
          placeholder="Tìm theo tên, email hoặc địa chỉ..."
          clearable
          style="width: 250px"
        />
      </div>

      <n-button type="primary" @click="openAddModal">+ Thêm NXB</n-button>
    </div>

    <!-- Bảng -->
    <n-data-table
      :key="paginatedPublishers.map((p) => p.MANXB).join('-')"
      :columns="columns"
      :data="paginatedPublishers"
      :pagination="false"
      bordered
    />

    <!-- Phân trang -->
    <div style="margin-top: 16px; display: flex; justify-content: center">
      <n-pagination v-if="pageCount > 1" v-model:page="currentPage" :page-count="pageCount" />
    </div>

    <!-- Modal thêm -->
    <PublisherModal
      :show="showAddModal"
      :publisher="newPublisher"
      :db_url="DB_URL"
      @close="showAddModal = false"
      @saved="handlePublisherSaved"
    />

    <!-- Modal sửa -->
    <PublisherModal
      :show="showEditModal"
      :publisher="editPublisher"
      :isEdit="true"
      :db_url="DB_URL"
      @close="showEditModal = false"
      @saved="handlePublisherSaved"
    />
  </div>
</template>
