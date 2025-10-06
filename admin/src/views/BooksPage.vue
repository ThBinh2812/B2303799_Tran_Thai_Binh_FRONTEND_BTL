<script setup>
import { ref, h, computed, onMounted } from "vue";
import { 
  getBooks, 
  addBook, 
  deleteBook, 
  updateBook 
} from '@/services/books.api.js';
import {
  NButton,
  NTag,
  NDataTable,
  NInput,
  NSelect,
  NPagination,
  useMessage,
} from "naive-ui";

import {
  SearchOutline,
  BusinessOutline,
  StatsChartOutline,
} from "@vicons/ionicons5";
import BookModal from "@/components/BookModal.vue";

const DB_URL = import.meta.env.VITE_DB_URL;

const message = useMessage();
const messageType = {
  success: (msg) =>
  message.success(msg, { class: "custom-message custom-success" }),
  error: (msg) =>
  message.error(msg, { class: "custom-message custom-error" }),
  warning: (msg) =>
  message.warning(msg, { class: "custom-message custom-warning" }),
  info: (msg) =>
  message.info(msg, { class: "custom-message custom-info" }),
};

// Dữ liệu sách
const books = ref([]);

onMounted(async () => {
  const res = await getBooks();
  console.log(res.data);
  books.value = res.data;
});

// Trạng thái sách
const statusOptions = [
  {
    label: "Tất cả",
    value: "all",
  },
  {
    label: "Còn sách",
    value: "in-stock",
  },
  {
    label: "Hết sách",
    value: "out-stock",
  }
];

// Các cột trong bảng
const columns = [
  {
    title: "Mã sách",
    key: "MASACH"
  },
{
  title: "Ảnh bìa",
  key: "cover",
  render(row) {
    const coverSrc = row.cover
      ? (row.cover.startsWith("/imgs") ? `${DB_URL}${row.cover}` : row.cover)
      : "https://via.placeholder.com/40x60?text=No+Image";

    return h("img", {
      src: coverSrc,
      style: "width:40px; height:60px; object-fit:cover; border-radius:4px; background:#f0f0f0;"
    });
  }
},
  {
    title: "Tên sách",
    key: "TENSACH",
  },
  {
    title: "Mô tả",
    key: "MOTA",
  },
  {
    title: "Đơn giá",
    key: "DONGIA",
    render(row) {
      return row.DONGIA?.toLocaleString("vi-VN") + "đ";
    }
  },
  {
  title: "Tổng số lượng",
  key: "SOQUYEN",
  align: "center",
  render(row) {
    return h(
      NTag,
      {
        type: "success",
        bordered: false
      },
      { default: () => row.SOQUYEN }
    );
  }
  },
  {
    title: "Còn lại",
    key: "CONLAI",
    align: "center",
    render(row) {
      return h(
        NTag,
        {
          type: row.CONLAI > 0 ? "warning" : "error",
          bordered: false
        },
        { default: () => row.CONLAI }
      );
    }
  },
  {
    title: "Nhà xuất bản",
    key: "MANXB"
  },
  {
    title: "Tác giả",
    key: "TACGIA"
  },
  {
    title: "Hành động",
    key: "actions",
    render(row) {
      return [
        h(
          NButton,
          {
            size: "small",
            type: "primary",
            style: "margin-right: 8px;",
            onClick: () => openEditModal(row)
          },
          { default: () => "Sửa" }
        ),
        h(
          NButton,
          {
            size: "small",
            type: "error",
            onClick: () => handleDeleteBook(row.MASACH)
          },
          { default: () => "Xóa" }
        )
      ];
    },
  },
];

// Khởi tạo ra danh sách publisher từ dữ liệu có sẵn
const publisherOptions = computed(() => {
  const set = new Set(books.value.map(book => book.MANXB));
  return [{ label: "Tất cả", value: "all" }, ...[...set].map(
    MANXB => ({
      label: MANXB,
      value: MANXB
    }))
  ];
});

// Các giá trị filter khởi tạo
const searchText = ref("");
const selectedPublisher = ref("all");
const selectedStatus = ref("all");

// Dữ liệu sau khi lọc
const filteredBooks = computed(() => {
  return books.value.filter(book => {
    const matchSearch =
      book.TENSACH.toLowerCase().includes(searchText.value.toLowerCase()) ||
      book.MANXB.toLocaleLowerCase().includes(searchText.value.toLocaleLowerCase());
    const matchPublisher =
      selectedPublisher.value === "all" ||
      book.MANXB === selectedPublisher.value;
    const matchStatus =
      selectedStatus.value === "all" ||
      (selectedStatus.value === "in-stock" && book.CONLAI > 0) ||
      (selectedStatus.value === "out-stock" && book.CONLAI === 0);

    return matchSearch && matchPublisher && matchStatus;
  });
});

// Phân trang
const page = ref(1);
const pageSize = ref(5);

const paginatedBooks = computed(() => {
  const start = (page.value - 1) * pageSize.value;
  return filteredBooks.value.slice(start, start + pageSize.value);
});

// Function xử lý thêm sách
const showAddModal = ref(false);
function openAddModal() {
  showAddModal.value = true;
  newBook.value = {
    MASACH: "",
    TENSACH: "",
    DONGIA: null,
    SOQUYEN: null,
    CONLAI: null,
    MANXB: "",
    TACGIA: "",
    NAMXUATBAN: null,
    cover: "",
    MOTA: ""
  };
};

const newBook = ref({ // Khởi tạo sách mới
  MASACH: "",
  TENSACH: "",
  DONGIA: null,
  SOQUYEN: null,
  CONLAI: null,
  MANXB: "",
  TACGIA: "",
  NAMXUATBAN: null,
  cover: "",
  MOTA: ""
});

const handleAddBook = async (formData) => {
  const res = await addBook(formData);
  messageType[res.status]?.(res.message);

  if (res.status === "success") {
    const booksRes = await getBooks();
    books.value = booksRes.data;
    showAddModal.value = false;
  }
};

// Function xử lý sửa sách
const showEditModal = ref(false);
const editBook = ref({});

function openEditModal(book) {
  editBook.value = { ...book };
  showEditModal.value = true;
};

const handleEditBook = async (formData) => {
  const bookId = formData.get("MASACH");
  const res = await updateBook(bookId, formData);
  messageType[res.status]?.(res.message);

  if (res.status === "success") {
    const booksRes = await getBooks();
    books.value = booksRes.data;
    showEditModal.value = false;
  }
};

// Function xử lý xóa sách
const handleDeleteBook = async (id) => {
  const res = await deleteBook(id);
  messageType[res.status]?.(res.message);

  if (res.status === "success") {
    const booksRes = await getBooks();
    books.value = booksRes.data;
  };
};

</script>

<!-- Template books -->
<template>
  <div style="padding: 20px; background: #fff; border-radius: 8px;">
    <!-- Thanh tìm kiếm + filter -->
    <div style="display: flex; gap: 12px; margin-bottom: 16px; align-items:flex-end;">
      <!-- Ô tìm kiếm -->
      <div style="display: flex; flex-direction: column;">
        <label style="margin-bottom: 4px; font-weight: 500;">
          <n-icon size="16"><SearchOutline /></n-icon>  
          Tìm kiếm
        </label>
        <n-input 
          v-model:value="searchText" 
          placeholder="Tìm theo tên sách..." 
          clearable 
          style="width: 220px;" />
      </div>

      <!-- Filter theo NXB -->
      <div style="display: flex; flex-direction: column;">
        <label style="margin-bottom: 4px; font-weight: 500;">
          <n-icon size="16"><BusinessOutline /></n-icon>
          Theo NXB
        </label>
        <n-select 
          v-model:value="selectedPublisher" 
          :options="publisherOptions" 
          style="width: 180px;" />
      </div>

      <!-- Filter theo trạng thái -->
      <div style="display: flex; flex-direction: column;">
        <label style="margin-bottom: 4px; font-weight: 500;">
          <n-icon size="16"><StatsChartOutline /></n-icon>  
          Trạng thái
        </label>
        <n-select 
          v-model:value="selectedStatus" 
          :options="statusOptions" 
          style="width: 150px;" />
      </div>

      <n-button type="primary" @click="openAddModal">+ Thêm sách</n-button>
    </div>

    <!-- Bảng dữ liệu sách -->
    <n-data-table
      :columns="columns"
      :data="paginatedBooks"
      :pagination="false"
      bordered
    />

    <!-- Phân trang -->
    <div style="margin-top: 16px; display:flex; justify-content:center;">
      <n-pagination 
        v-model:page="page" 
        :page-count="Math.ceil(filteredBooks.length / pageSize)" 
      />

    </div>

     <!-- Modal add sách-->
      <BookModal
        :show="showAddModal"
        :book="newBook"
        @close="showAddModal = false"
        @submit="handleAddBook"
      />

      <!-- Modal sửa sách -->
      <BookModal
        :show="showEditModal"
        :book="editBook"
        :isEdit="true"
        @close="showEditModal = false"
        @submit="handleEditBook"
      />

  </div>
</template>
