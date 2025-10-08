<script setup>
import { ref, h, computed, onMounted, resolveComponent } from 'vue';
import { getBooks, deleteBook } from '@/services/books.api.js';
import { getPublishers } from '@/services/publishers.api';
import { NButton, NTag, NDataTable, NInput, NSelect, NPagination } from 'naive-ui';
import BookModal from '@/components/BookModal.vue';
import LoadingOverlay from '@/components/loadingOverlay.vue';
import { useNotify } from '@/utils/notify';

const DB_URL = import.meta.env.VITE_DB_URL;
const FontAwesomeIcon = resolveComponent('font-awesome-icon');
const messageType = useNotify();

// ====== Dữ liệu ======
const books = ref([]);
const publishers = ref([]);
const loading = ref(false);
const actionsDisable = ref(false);

// ====== Lấy dữ liệu ======
const fetchBooks = async () => {
  const res = await getBooks();
  books.value = res.data;
};

const fetchPublisher = async () => { 
  const res = await getPublishers(); 
  publishers.value = res.data; 
};

function getPublisherName(mnxb) {
  const found = publishers.value.find((pub) => pub.MANXB === mnxb)
  return found ? found.TENNXB : mnxb
};

// ====== Mouted ======
onMounted(() => {
  fetchBooks()
  fetchPublisher()
});

// ====== Trạng thái của Options lọc sách ======
const statusOptions = [
  {
    label: 'Tất cả',
    value: 'all',
  },
  {
    label: 'Còn sách',
    value: 'in-stock',
  },
  {
    label: 'Hết sách',
    value: 'out-stock',
  },
];

// ====== Các cột trong bảng ======
const columns = [
  {
    title: 'Mã sách',
    key: 'MASACH',
  },
  {
    title: 'Ảnh bìa',
    key: 'cover',
    render(row) {
      const coverSrc = row.cover
        ? row.cover.startsWith('/imgs')
          ? `${DB_URL}${row.cover}`
          : row.cover
        : 'https://via.placeholder.com/40x60?text=No+Image'

      return h('img', {
        src: coverSrc,
        style:
          'width:40px; height:60px; object-fit:cover; border-radius:4px; background:#f0f0f0;',
      })
    },
  },
  {
    title: 'Tên sách',
    key: 'TENSACH',
  },
  {
    title: 'Mô tả',
    key: 'MOTA',
  },
  {
    title: 'Đơn giá',
    key: 'DONGIA',
    render(row) {
      return row.DONGIA?.toLocaleString('vi-VN') + 'đ'
    },
  },
  {
    title: 'Tổng số lượng',
    key: 'SOQUYEN',
    align: 'center',
    render(row) {
      return h(
        NTag,
        {
          type: 'success',
          bordered: false,
        },
        { default: () => row.SOQUYEN },
      )
    },
  },
  {
    title: 'Còn lại',
    key: 'CONLAI',
    align: 'center',
    render(row) {
      return h(
        NTag,
        {
          type: row.CONLAI > 0 ? 'warning' : 'error',
          bordered: false,
        },
        { default: () => row.CONLAI },
      )
    },
  },
  {
    title: 'Nhà xuất bản',
    key: 'MANXB',
    render(row) {
      return getPublisherName(row.MANXB)
    },
  },
  {
    title: 'Tác giả',
    key: 'TACGIA',
  },
  {
    title: 'Hành động',
    key: 'actions',
    render(row) {

      if (actionsDisable.value) {
        return h('span', { style: 'color: #999; font-style: italic;' }, 'Đang xử lý...')
      };

      return [
        h(
          NButton,
          {
            size: 'small',
            type: 'primary',
            circle: true,
            style: 'margin-right: 8px;',
            onClick: () => openEditModal(row),
          },
          { default: () => h(FontAwesomeIcon, { icon: ['fas', 'pen'] }) },
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'error',
            circle: true,
            onClick: () => handleDeleteBook(row.MASACH),
          },
          { default: () => h(FontAwesomeIcon, { icon: ['fas', 'trash'] }) },
        ),
      ]
    },
  },
];

// ====== Filtering và Paging ======
const searchText = ref('');
const selectedPublisher = ref('all');
const selectedStatus = ref('all');
const page = ref(1);
const pageSize = ref(5);

// Khởi tạo ra options publisher để lọc
const publisherOptions = computed(() => {
  return [
    { label: 'Tất cả', value: 'all' },
    ...publishers.value.map((pub) => ({
      label: pub.TENNXB,
      value: pub.MANXB,
    })),
  ]
});

// Filtering
const filteredBooks = computed(() => {
  return books.value.filter((book) => {
    const tennxb = getPublisherName(book.MANXB)
    // Filter theo thanh tìm kiếm
    const matchSearch =
      book.TENSACH.toLowerCase().includes(searchText.value.toLowerCase()) ||
      tennxb.toLowerCase().includes(searchText.value.toLowerCase())
    // Filter theo NXB
    const matchPublisher =
      selectedPublisher.value === 'all' || book.MANXB === selectedPublisher.value
    // Filter theo trạng thái
    const matchStatus =
      selectedStatus.value === 'all' ||
      (selectedStatus.value === 'in-stock' && book.CONLAI > 0) ||
      (selectedStatus.value === 'out-stock' && book.CONLAI === 0)

    return matchSearch && matchPublisher && matchStatus;
  });
});

const paginatedBooks = computed(() => {
  const start = (page.value - 1) * pageSize.value;
  return filteredBooks.value.slice(start, start + pageSize.value);
});

// ====== Các Modal ======
const showEditModal = ref(false);
const showAddModal = ref(false);
const editBook = ref({});
const newBook = ref({
  MASACH: '',
  TENSACH: '',
  DONGIA: null,
  SOQUYEN: null,
  CONLAI: null,
  MANXB: '',
  TACGIA: '',
  NAMXUATBAN: null,
  cover: '',
  MOTA: '',
});

function openAddModal() {
  showAddModal.value = true
  newBook.value = {
    MASACH: '',
    TENSACH: '',
    DONGIA: null,
    SOQUYEN: null,
    CONLAI: null,
    MANXB: '',
    TACGIA: '',
    NAMXUATBAN: null,
    cover: '',
    MOTA: '',
  };
};

function openEditModal(book) {
  editBook.value = { ...book }
  showEditModal.value = true
};

// ====== Function xử lý xóa sách ======
const handleDeleteBook = async (id) => {
  actionsDisable.value = true;
  loading.value = true;

  try {
    const res = await deleteBook(id)
    messageType[res.status]?.(res.message);

    if (res.status === 'success') {
      await fetchBooks();
    }
// eslint-disable-next-line no-unused-vars
  } catch (error) {
    messageType.error('Có lỗi xảy ra khi xóa sách');
  } finally {
    actionsDisable.value = false;
    loading.value = false;
  };
};

</script>

<!-- Template books -->
<template>
  <div style="padding: 20px; background: #fff; border-radius: 8px">
    <!-- Loading -->
    <LoadingOverlay :show="loading" />
    <!-- Thanh tìm kiếm + filter -->
    <div style="display: flex; gap: 12px; margin-bottom: 16px; align-items: flex-end">
      <!-- Ô tìm kiếm -->
      <div style="display: flex; flex-direction: column">
        <label style="margin-bottom: 4px; font-weight: 500">
          <font-awesome-icon :icon="['fas', 'search']" />
          Tìm kiếm
        </label>
        <n-input
          v-model:value="searchText"
          placeholder="Tìm theo tên sách..."
          clearable
          style="width: 220px"
        />
      </div>

      <!-- Filter theo NXB -->
      <div style="display: flex; flex-direction: column">
        <label style="margin-bottom: 4px; font-weight: 500">
          <font-awesome-icon :icon="['fas', 'building']" />
          Theo NXB
        </label>
        <n-select
          v-model:value="selectedPublisher"
          :options="publisherOptions"
          style="width: 180px"
        />
      </div>

      <!-- Filter theo trạng thái -->
      <div style="display: flex; flex-direction: column">
        <label style="margin-bottom: 4px; font-weight: 500">
          <font-awesome-icon :icon="['fas', 'chart-bar']" />
          Trạng thái
        </label>
        <n-select v-model:value="selectedStatus" :options="statusOptions" style="width: 150px" />
      </div>

      <n-button type="primary" @click="openAddModal">+ Thêm sách</n-button>
    </div>

    <!-- Bảng dữ liệu sách -->
    <n-data-table :columns="columns" :data="paginatedBooks" :pagination="false" bordered />

    <!-- Phân trang -->
    <div style="margin-top: 16px; display: flex; justify-content: center">
      <n-pagination v-model:page="page" :page-count="Math.ceil(filteredBooks.length / pageSize)" />
    </div>

    <!-- Modal add sách-->
    <BookModal
      :show="showAddModal"
      :book="newBook"
      :publishers="publishers"
      :db_url="DB_URL"
      @close="showAddModal = false"
      @reload="fetchBooks"
    />

    <!-- Modal sửa sách -->
    <BookModal
      :show="showEditModal"
      :book="editBook"
      :publishers="publishers"
      :isEdit="true"
      :db_url="DB_URL"
      @close="showEditModal = false"
      @reload="fetchBooks"
    />
  </div>
</template>
