<script setup>
import { ref } from 'vue';
import { useIcon } from '@/utils/useIcon.js';

const MSNV = ref('');
const password = ref('');
const showPassword = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const handleRegister = () => {
  console.log('Username:', MSNV.value);
  console.log('Password:', password.value);
};

</script>

<template>
  <div class="register-container">
    <!-- <div class="website-logo">
      <img src="/favicon.ico"/>
      <div class="logo-content">
        <h1 class="logo-title">Readly</h1>
        <h1 class="logo-title">Library</h1>
      </div>
    </div> -->
    <h1 class="register-title">Đăng ký</h1>

    <div class="form-group">
      <label>Mã số nhân viên</label>
      <n-input
        v-model:value="MSNV"
        placeholder="Nhập mã số nhân viên..."
        size="large"
      />
    </div>

    <div class="form-group">
      <label>Mật khẩu</label>
      <n-input
        v-model:value="password"
        :type="showPassword ? 'text' : 'password'"
        placeholder="Nhập mật khẩu..."
        size="large"
      >
        <template #suffix>
          <div class="icon-toggle" @click="togglePassword">
            <component
              :is="useIcon(showPassword ?'fa-solid fa-eye' : 'fa-solid fa-eye-slash')"
            />
          </div>
        </template>
      </n-input>
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
  max-width: 360px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 12px;
}

.register-title {
  font-size: 28px;
  font-weight: 600;
  color: #2c2c2c;
  text-align: center;
  margin-bottom: 10px;
}

.form-group label {
  font-weight: 600;
  font-size: 14px;
  color: #333;
  display: block;
  margin-bottom: 6px;
}

.register-button {
  background-color: #37422f;
  color: white;
  border: none;
  width: 100%;
  margin-top: 10px;
}

.register-button:hover {
  background-color: #2d3627;
}

/* Logo */
/* .website-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  margin-bottom: 20px;
} */

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

.login-text {
  text-align: center;
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
