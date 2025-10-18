<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute()
const isRegisterPage = computed(() => route.path.includes('register'));
</script>

<template>
  <div class="auth-layout">
    <div class="auth-wrapper">
      
      <!-- Form Login/Register -->
      <div class="auth-content" :class="{ 'full-width': isRegisterPage }">
        <router-view />
      </div>

      <transition name="fade">
        <div v-if="!isRegisterPage" class="auth-illustration">
          <img src="/images/books-illustration.jpg" alt="Books Illustration" />
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.auth-layout {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: url('/images/login-bg.jpg'); */
  background: linear-gradient(135deg, #f8f7f3, #e8e6df);
}

.auth-wrapper {
  display: flex;
  width: 900px;
  height: 600px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
  background-color: #fff;
}

/* Các form */
.auth-content {
  flex: 1;
  padding: 60px 40px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.auth-content.full-width {
  flex: 1 1 100%;
  width: 100%;
  padding: 60px 80px;
}

/* Ảnh minh họa */
.auth-illustration {
  flex: 1;
  /* background-color: #f0ede6; */
  background-color: #f6f2e9;
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-illustration img {
  width: 80%;
  height: auto;
  object-fit: contain;
}

/* Animation khi ẩn/hiện ảnh */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
