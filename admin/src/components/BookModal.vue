<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  show: Boolean,
  isEdit: Boolean,
  book: Object,
  rules: Object,
});

const emit = defineEmits(["close", "submit"]);

// Đồng bộ hiển thị modal
const visible = ref(props.show);
watch(
  () => props.show,
  (newVal) => {
    visible.value = newVal;
  }
);

// Đồng bộ dữ liệu sách
const defaultBook = {
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

const localBook = ref({ ...defaultBook, ...props.book });
watch(
  () => props.book,
  (newBook) => {
    localBook.value = { ...defaultBook, ...newBook };
  },
  { deep: true }
);

const handleSubmit = () => {
  const formData = new FormData();
  Object.entries(localBook.value).forEach(([key, value]) => {
    formData.append(key, value);
  });
  if (selectedFile.value) {
    formData.append("cover", selectedFile.value);
  }
  emit("submit", formData);
};

// Xử lý file ảnh
const selectedFile = ref(null);
function handleFileChange(e) {
  selectedFile.value = e.target.files[0];
}

</script>

<template>
  <n-modal
    v-model:show="visible"
    preset="dialog"
    :title="props.isEdit ? 'Chỉnh sửa sách' : 'Thêm sách mới'"
    style="width: 500px; max-height: 80vh; overflow-y: auto;"
    @update:show="val => { if (!val) emit('close') }"
  >
    <n-form :model="localBook" label-placement="top">
      <n-form-item label="Mã sách" path="MASACH">
        <n-input
          v-model:value="localBook.MASACH"
          placeholder="Nhập mã sách..."
          :disabled="props.isEdit"
        />
      </n-form-item>
      <n-form-item label="Tên sách">
        <n-input
          v-model:value="localBook.TENSACH" 
          placeholder="Nhập tên sách..." />
      </n-form-item>
      <n-form-item label="Mô tả">
        <n-input
        v-model:value="localBook.MOTA"
        type="textarea"
        placeholder="Nhập mô tả sách..."
        />
      </n-form-item>
      <n-form-item label="Đơn giá">
        <n-input 
        v-model:value="localBook.DONGIA" 
        type="number"
        placeholder="Nhập đơn giá..." />
      </n-form-item>
      <n-form-item label="Số lượng">
        <n-input 
        v-model:value="localBook.SOQUYEN" 
        type="number"
          placeholder="Nhập số lượng..." />
        </n-form-item>
        <n-form-item label="Còn lại">
          <n-input 
          v-model:value="localBook.CONLAI" 
          type="number"
          placeholder="Nhập số lượng còn lại..." />
        </n-form-item>
        <n-form-item label="Năm xuất bản">
          <n-input 
          v-model:value="localBook.NAMXUATBAN" 
          type="number"
          placeholder="Nhập năm xuất bản..." />
        </n-form-item>
        <n-form-item label="Nhà xuất bản">
          <n-input 
          v-model:value="localBook.MANXB"
          placeholder="Nhập tên nhà xuất bản..." />
        </n-form-item>
        <n-form-item label="Tác giả">
          <n-input 
          v-model:value="localBook.TACGIA"
          placeholder="Nhập tên tác giả..." />
        </n-form-item>
        <n-form-item label="Ảnh bìa">
          <input type="file" @change="handleFileChange" accept="image/*" />
        </n-form-item>
      </n-form>

    <template #action>
      <div style="display:flex; justify-content: right; gap: 12px">
        <n-button @click="emit('close')">Hủy</n-button>
        <n-button type="primary" @click="handleSubmit">
          {{ props.isEdit ? "Lưu thay đổi" : "Lưu" }}
        </n-button>
      </div>
    </template>
  </n-modal>
</template>
