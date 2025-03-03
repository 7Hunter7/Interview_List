<script setup lang="ts">
import { computed, ref } from "vue";

const isLogin = ref<boolean>(true);

const toggleAuth = () => {
  isLogin.value = !isLogin.value;
};

const subtitleText = computed<string>(() => {
  return isLogin.value ? "Аккаунта еще нет?" : "Уже есть аккаунт?";
});

const linkAccountText = computed<string>(() => {
  return isLogin.value ? "Cоздайте сейчас?" : "Войдите в него";
});
</script>

<template>
  <app-toast position="bottom-right" />
  <div class="flex justify-content-center p-2">
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
      <div class="text-center mb-3">
        <div class="text-900 text-3xl font-medium mb-3">Приветствую!</div>
        <span class="text-600 font-medium line-height-3">{{
          subtitleText
        }}</span>
        <a
          class="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
          @click="toggleAuth"
        >
          {{ linkAccountText }}
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
