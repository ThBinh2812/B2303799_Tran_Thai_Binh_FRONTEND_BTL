<template>
  <div class="auth-layout">
    <div class="auth-wrapper">
      
      <!-- Form Login/Register -->
      <div class="auth-content">
        <router-view />
      </div>

      <div class="auth-illustration">
        <img src="/images/books-illustration.jpg" alt="Books Illustration" />
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

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
</style>
