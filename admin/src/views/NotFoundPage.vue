<template>
  <div class="notfound-container">
    <div class="content">
      <h1>404</h1>
      <p>Trang bạn tìm kiếm không tồn tại.</p>
      <!-- Tạm để return về login sau này fix về trang chủ -->
      <router-link to="/auth/login" class="back-home">← Quay lại trang chủ</router-link> 
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.notfound-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f8f7f3, #e8e6df);
  font-family: 'Segoe UI', sans-serif;
}

.content {
  text-align: center;
}

h1 {
  font-size: 8rem;
  font-weight: 700;
  color: #c9a227;
  margin-bottom: 0.5rem;
}

p {
  font-size: 1.3rem;
  color: #444;
  margin-bottom: 1.5rem;
}

.back-home {
  text-decoration: none;
  background-color: #c9a227;
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  transition: background 0.2s;
}

.back-home:hover {
  background-color: #b38e1f;
}
</style>
