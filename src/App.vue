<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AppHeder from "@/components/AppHeader.vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

onMounted(() => {
  onAuthStateChanged(getAuth(), (user) => {
    userStore.userId = user ? user.uid : ""; // Если пользователь авторизован, то записываем его id в хранилище
  });
});
</script>

<template>
  <div class="container">
    <AppHeder />
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1280px;
  margin: auto;
  padding: 20px;
}
</style>
