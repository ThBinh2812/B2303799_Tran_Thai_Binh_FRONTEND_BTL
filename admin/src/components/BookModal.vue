<script setup>
import { ref, watch, computed } from 'vue';
import axios from "axios";
import createBookRules from "@/rules/bookRules";
import { useNotify } from '@/utils/notify';

const messageType = useNotify();
const formRef = ref(null);

const props = defineProps({
  show: Boolean,
  isEdit: Boolean,
  book: Object,
  publishers: Array,
  dbUrl: String
});

const emit = defineEmits(["close", "reload"]);

// ====== Load nhà xuất bản =======
const publisherOptions = computed(() => {
  if (!props.publishers) return [];
  return props.publishers.map(pub => ({
    label: pub.TENNXB,
    value: pub.MANXB
  }));
});

// ====== Đồng bộ props & dữ liệu ======
const visible = ref(props.show);
watch(() => props.show, (val) => (visible.value = val));

const defaultBook = {
  MASACH: "",
  TENSACH: "",
  DONGIA: null,
  SOQUYEN: null,
  CONLAI: null,
  MANXB: null,
  TACGIA: "",
  NAMXUATBAN: null,
  cover: "",
  MOTA: ""
};

// Clone book từ props
const localBook = ref({ ...defaultBook, ...props.book });
watch(
  () => props.book,
  (newVal) => {
    localBook.value = { ...defaultBook, ...newVal };
    if (!localBook.value.MANXB) {
      localBook.value.MANXB = null;
    }
  },
  { deep: true }
);

// Xử lý file ảnh
const selectedFile = ref(null);
function handleFileChange(e) {
  selectedFile.value = e.target.files[0];
}

// ====== Validate ======
const checkBookExist = async (masach) => {
  if (!masach) return false;
  try {
    const res = await axios.get(`${import.meta.env.VITE_DB_URL}/api/books/${masach}`);
    return !!res.data.data;
  } catch {
    return false;
  }
};

// Tạo rules validate
const rules = createBookRules({
  localBook,
  isEdit: props.isEdit,
  checkBookExist
});

// ====== Call API =======
const handleSubmit = async () => {
  formRef.value?.validate(async (errors) => {
    if (errors) {
      messageType.error("Vui lòng nhập đầy đủ và đúng thông tin!");
      return;
    };

    try {
      const formData = new FormData();
      Object.entries(localBook.value).forEach(([key, val]) => {
        formData.append(key, val ?? "");
      });
      if (selectedFile.value) {
        formData.append("cover", selectedFile.value);
      }

      let res;
      if (props.isEdit) {
        res = await axios.put(
          `${import.meta.env.VITE_DB_URL}/api/books/${localBook.value.MASACH}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        res = await axios.post(
          `${import.meta.env.VITE_DB_URL}/api/books`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }
      // Send msg
      messageType[res.data.status]?.(res.data.message);

      emit("reload");
      emit("close");
      visible.value = false;

    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Có lỗi xảy ra khi lưu sách!";
      messageType.error(msg);
    }
  });
};

</script>

<template>
  <n-modal
    v-model:show="visible"
    preset="dialog"
    :title="props.isEdit ? 'Chỉnh sửa sách' : 'Thêm sách mới'"
    style="width: 500px; max-height: 80vh; overflow-y: auto;"
    @update:show="val => { if (!val) emit('close') }"
  >
    <n-form
      ref="formRef" 
      :model="localBook" 
      :rules="rules" 
      label-placement="top"
      validate-on-input
    >
      <n-form-item label="Mã sách" path="MASACH">
        <n-input
          v-model:value="localBook.MASACH" 
          placeholder="Nhập mã sách..." 
          :disabled="props.isEdit" 
        />
      </n-form-item>

      <n-form-item label="Tên sách" path="TENSACH">
        <n-input 
          v-model:value="localBook.TENSACH" 
          placeholder="Nhập tên sách..." />
      </n-form-item>

      <n-form-item label="Mô tả" path="MOTA">
        <n-input 
          v-model:value="localBook.MOTA" 
          type="textarea" 
          placeholder="Nhập mô tả..." />
      </n-form-item>

      <n-form-item label="Đơn giá" path="DONGIA">
        <n-input 
          v-model:value="localBook.DONGIA" 
          type="number" 
          placeholder="Nhập đơn giá..." />
      </n-form-item>

      <n-form-item label="Số lượng" path="SOQUYEN">
        <n-input 
          v-model:value="localBook.SOQUYEN" 
          type="number" 
          placeholder="Nhập số lượng..." />
      </n-form-item>

      <n-form-item label="Còn lại" path="CONLAI">
        <n-input 
          v-model:value="localBook.CONLAI" 
          type="number" 
          placeholder="Nhập số lượng còn lại..." />
      </n-form-item>

      <n-form-item label="Năm xuất bản" path="NAMXUATBAN">
        <n-input 
          v-model:value="localBook.NAMXUATBAN" 
          type="number" 
          placeholder="Nhập năm xuất bản..." />
      </n-form-item>

      <n-form-item label="Nhà xuất bản" path="MANXB">
        <n-select
          v-model:value="localBook.MANXB"
          :options="publisherOptions"
          placeholder="Chọn nhà xuất bản"
          clearable
        />
      </n-form-item>

      <n-form-item label="Tác giả" path="TACGIA">
        <n-input 
          v-model:value="localBook.TACGIA" 
          placeholder="Nhập tên tác giả..." />
      </n-form-item>

      <n-form-item label="Ảnh bìa" path="cover">
        <input 
          type="file" 
          @change="handleFileChange" 
          accept="image/*" />
      </n-form-item>
    </n-form>

    <template #action>
      <div style="display:flex; justify-content:right; gap:12px">
        <n-button @click="emit('close')">Hủy</n-button>
        <n-button type="primary" @click="handleSubmit">
          {{ props.isEdit ? "Lưu thay đổi" : "Lưu" }}
        </n-button>
      </div>
    </template>
  </n-modal>

</template>
