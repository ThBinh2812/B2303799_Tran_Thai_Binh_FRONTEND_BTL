<script setup>
import { ref, watch } from 'vue';
import { useNotify } from '@/utils/notify';
import { addPublisher, updatePublisher } from '@/services/publishers.service.js';
import rules from '@/rules/publisherRules.js';

const messageType = useNotify();
const formRef = ref(null);
const isSubmitting = ref(false);

const props = defineProps({
  show: Boolean,
  isEdit: Boolean,
  publisher: Object,
});

const emit = defineEmits(['close', 'saved']);

// ===== Form Data =====
const formData = ref({
  TENNXB: '',
  DIACHI: '',
});

// ===== Watch mở modal =====
const visible = ref(false);

watch(
  () => props.show,
  (val) => {
    visible.value = val;

    if (val) {
      if (props.isEdit && props.publisher) {
        formData.value = {
          MANXB: props.publisher.MANXB || '',
          TENNXB: props.publisher.TENNXB || '',
          DIACHI: props.publisher.DIACHI || '',
        };
      } else {
        resetForm();
      }
    }
  },
  { immediate: true }
);

// Khi đóng modal → emit ra cho cha
watch(visible, (val) => {
  if (!val) emit('close', false);
});

// ===== Reset form =====
const resetForm = () => {
  formData.value = {
    TENNXB: '',
    DIACHI: '',
  };
  formRef.value?.restoreValidation();
};

// ===== Submit =====
const handleSubmit = async () => {
  await formRef.value?.validate(async (errors) => {
    if (errors) return;

    isSubmitting.value = true;
    let res;

    if (props.isEdit) {
      res = await updatePublisher(formData.value.MANXB, formData.value);
    } else {
      res = await addPublisher(formData.value);
    }

    if (res.status === 'success') {
      messageType.success(
        props.isEdit ? 'Cập nhật nhà xuất bản thành công' : 'Thêm nhà xuất bản thành công'
      );
      emit('saved', res.data);
      emit('close', true);
    } else {
      messageType.error(res.message || 'Đã có lỗi xảy ra');
    }

    isSubmitting.value = false;
  });
};

const handleClose = () => {
  visible.value = false;
};
</script>

<template>
  <n-modal
    v-model:show="visible"
    preset="dialog"
    style="width: 500px"
    @update:show="(val) => { if (!val) emit('close') }"
  >
    <template #header>
      <h3 class="text-lg font-semibold">
        {{ props.isEdit ? 'Chỉnh sửa Nhà Xuất Bản' : 'Thêm Nhà Xuất Bản' }}
      </h3>
    </template>

    <n-form ref="formRef" :model="formData" :rules="rules" label-placement="top">
      <n-form-item v-if="props.isEdit" label="Mã NXB" path="MANXB">
        <n-input v-model:value="formData.MANXB" disabled />
      </n-form-item>

      <n-form-item label="Tên nhà xuất bản" path="TENNXB">
        <n-input v-model:value="formData.TENNXB" placeholder="Nhập tên nhà xuất bản" />
      </n-form-item>

      <n-form-item label="Địa chỉ" path="DIACHI">
        <n-input v-model:value="formData.DIACHI" placeholder="Nhập địa chỉ" />
      </n-form-item>
    </n-form>

    <template #action>
      <div class="flex justify-end gap-2 mt-4">
        <n-button @click="handleClose" :disabled="isSubmitting">Hủy</n-button>
        <n-button type="primary" @click="handleSubmit" :loading="isSubmitting">
          {{ props.isEdit ? 'Cập nhật' : 'Thêm mới' }}
        </n-button>
      </div>
    </template>
  </n-modal>
</template>
