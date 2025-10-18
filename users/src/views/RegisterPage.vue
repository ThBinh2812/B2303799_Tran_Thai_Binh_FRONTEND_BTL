<script setup>
import { ref } from 'vue'
import { NInput, NDatePicker, NRadioGroup, NRadio, NButton } from 'naive-ui'
import { useIcon } from '@/utils/useIcon.js'

const hoLot = ref('')
const ten = ref('')
const ngaySinh = ref(null) // timestamp (ms)
const phai = ref('Nam') // 'Nam' | 'Nữ'
const diaChi = ref('')
const dienThoai = ref('')

// Password fields
const password = ref('')
const confirmPassword = ref('')

// Toggles for show/hide password
const showPassword = ref(false)
const showConfirmPassword = ref(false)

function togglePassword() {
  showPassword.value = !showPassword.value
}
function toggleConfirmPassword() {
  showConfirmPassword.value = !showConfirmPassword.value
}

const handleRegister = () => {
  console.log('Họ lót:', hoLot.value)
  console.log('Tên:', ten.value)
  console.log('Ngày sinh (timestamp):', ngaySinh.value)
  console.log('Phái:', phai.value)
  console.log('Địa chỉ:', diaChi.value)
  console.log('Điện thoại:', dienThoai.value)
  console.log('Mật khẩu:', password.value)
  console.log('Xác nhận mật khẩu:', confirmPassword.value)
}
</script>

<template>
  <div class="register-container">
    <div class="website-logo">
      <img src="/favicon.ico" />
      <div class="logo-content">
        <h1 class="logo-title">Readly</h1>
        <h1 class="logo-title">Library</h1>
      </div>
    </div>

    <h1 class="register-title">Đăng ký</h1>

    <div class="form-grid">
      <!-- Hàng 1 -->
      <div class="form-group">
        <label>Họ <span class="required">*</span></label>
        <div class="control">
          <n-input
            v-model:value="hoLot"
            placeholder="Nhập họ của bạn..."
            size="large"
          />
        </div>
      </div>

      <div class="form-group">
        <label>Tên <span class="required">*</span></label>
        <div class="control">
          <n-input
            v-model:value="ten"
            placeholder="Nhập tên của bạn..."
            size="large"
          />
        </div>
      </div>

      <!-- Hàng 2 -->
      <div class="form-group">
        <label>Ngày sinh</label>
        <div class="control">
          <n-date-picker
            v-model:value="ngaySinh"
            type="date"
            size="large"
            clearable
            placeholder="YYYY-MM-DD"
          />
        </div>
      </div>

      <div class="form-group">
        <label>Giới tính</label>
        <div class="control radio-inline">
          <n-radio-group v-model:value="phai" name="gender" size="large">
            <n-radio value="Nam">Nam</n-radio>
            <n-radio value="Nữ">Nữ</n-radio>
          </n-radio-group>
        </div>
      </div>

      <!-- Hàng 3 -->
      <div class="form-group">
        <label>Địa chỉ</label>
        <div class="control">
          <n-input
            v-model:value="diaChi"
            placeholder="Nhập địa chỉ..."
            size="large"
          />
        </div>
      </div>

      <div class="form-group">
        <label>Số điện thoại <span class="required">*</span></label>
        <div class="control">
          <n-input
            v-model:value="dienThoai"
            type="tel"
            placeholder="Nhập số điện thoại..."
            size="large"
          />
        </div>
      </div>

      <!-- Hàng 4 -->
      <div class="form-group">
        <label>Mật khẩu <span class="required">*</span></label>
        <div class="control">
          <n-input
            v-model:value="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Nhập mật khẩu..."
            size="large"
          >
            <template #suffix>
              <div class="icon-toggle" @click="togglePassword" title="Hiện/ẩn mật khẩu">
                <component
                  :is="useIcon(showPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash')"
                />
              </div>
            </template>
          </n-input>
        </div>
      </div>

      <div class="form-group">
        <label>Xác nhận mật khẩu <span class="required">*</span></label>
        <div class="control">
          <n-input
            v-model:value="confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            placeholder="Nhập lại mật khẩu..."
            size="large"
          >
            <template #suffix>
              <div class="icon-toggle" @click="toggleConfirmPassword" title="Hiện/ẩn mật khẩu">
                <component
                  :is="useIcon(showConfirmPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash')"
                />
              </div>
            </template>
          </n-input>
        </div>
      </div>
    </div>

    <n-button
      type="primary"
      size="large"
      class="register-button"
      @click="handleRegister"
    >
      Đăng ký
    </n-button>

    <p class="login-text">
      Bạn đã có tài khoản?
      <router-link to="/auth/login" class="login-link">Đăng nhập.</router-link>
    </p>
  </div>
</template>

<style scoped>
.register-container {
  width: 100%;
  max-width: 720px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  border-radius: 12px;
}

.register-title {
  font-size: 28px;
  font-weight: 600;
  color: #2c2c2c;
  text-align: left;
  margin-bottom: 10px;
}

/* Căn giữa tiêu đề, nút và đoạn văn nếu muốn */
.register-title,
.register-button,
.login-text {
  text-align: center;
}

/* Lưới 2 cột, các ô thẳng hàng */
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 24px;
  row-gap: 16px;
  width: 100%;
  max-width: 600px;
  text-align: left;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-weight: 600;
  font-size: 14px;
  color: #333;
}

.required {
  color: #ef4444;
}

.control {
  width: 100%;
}

.control :deep(.n-input),
.control :deep(.n-date-picker),
.control :deep(.n-date-picker .n-input),
.control :deep(.n-radio-group) {
  width: 100%;
}

/* Radio nằm ngang như yêu cầu */
.radio-inline :deep(.n-radio-group) {
  display: inline-flex;
  gap: 16px;
  align-items: center;
  width: auto;
}

.radio-inline {
  display: flex;
  align-items: center;
  height: 40px;
}

/* Toggle icon trong ô mật khẩu */
.icon-toggle {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  color: #666;
}
.icon-toggle:hover {
  color: #333;
}

.register-button {
  background-color: #37422f;
  color: white;
  border: none;
  width: fit-content;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 600;
}

.register-button:hover {
  background-color: #2d3627;
}

.website-logo {
  position: absolute;
  top: 30px;
  left: 40px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.website-logo img {
  width: 38px;
  height: 38px;
  object-fit: contain;
}

.logo-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1;
}

.logo-title {
  font-size: 22px;
  font-weight: 600;
  color: #222;
  text-align: left;
  margin: 0;
}

/* Link đăng nhập */
.login-text {
  text-align: left;
  font-size: 14px;
  color: #555;
  margin-top: 8px;
}

.login-link {
  color: #37422f;
  font-weight: 600;
  text-decoration: none;
  margin-left: 4px;
}

.login-link:hover {
  text-decoration: underline;
}
</style>