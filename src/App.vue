<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useUserStore } from "@/stores/user";
import AppHeader from "@/components/AppHeader.vue";

const userStore = useUserStore();
const isLoading = ref<boolean>(true);

onMounted(() => {
  onAuthStateChanged(getAuth(), (user) => {
    userStore.userId = user ? user.uid : ""; // Если пользователь авторизован, то записываем его id в хранилище
  });
  isLoading.value = false;
});
</script>

<template>
  <app-progress v-if="isLoading" />
  <div v-else class="container">
    <AppHeader />
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
