<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth"; // Firebase Auth с помощью Email и пароля
import { useToast } from "primevue/usetoast";

const router = useRouter();
const toast = useToast();

const email = ref<string>("");
const password = ref<string>("");
const isLogin = ref<boolean>(true);
const isLoading = ref<boolean>(false);

const toggleAuth = () => {
  isLogin.value = !isLogin.value;
};

const subtitleText = computed<string>(() => {
  return isLogin.value ? "Аккаунта еще нет?" : "Уже есть аккаунт?";
});

const linkAccountText = computed<string>(() => {
  return isLogin.value ? "Cоздайте сейчас?" : "Войдите в него";
});

const submitButtonText = computed<string>(() => {
  return isLogin.value ? "Вход" : "Регистрация";
});

//  Функция регистрации
const signUp = async (): Promise<void> => {
  isLoading.value = true;
  try {
    await createUserWithEmailAndPassword(
      getAuth(),
      email.value,
      password.value
    );
    router.push("/"); // Переход на главную страницу
  } catch (error: unknown) {
    // Если ошибка
    if (error instanceof Error) {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: error.message,
        life: 3000,
      });
    }
  } finally {
    isLoading.value = false; // Загрузка завершена
  }
};

//  Функция входа
const signIn = async (): Promise<void> => {
  isLoading.value = true;
  try {
    await signInWithEmailAndPassword(getAuth(), email.value, password.value);
    router.push("/"); // Переход на главную страницу
  } catch (error: unknown) {
    // Если ошибка
    if (error instanceof Error) {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: error.message,
        life: 3000,
      });
    }
  } finally {
    isLoading.value = false; // Загрузка завершена
  }
};

const submitForm = (): void => {
  if (isLogin.value) {
    signIn();
  } else {
    signUp();
  }
};
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

      <form @submit.prevent="submitForm">
        <label for="email1" class="block text-900 font-medium mb-2"
          >Email</label
        >
        <app-input-text
          v-model="email"
          id="email1"
          type="email"
          class="w-full mb-3"
        />

        <label for="password1" class="block text-900 font-medium mb-2"
          >Пароль</label
        >
        <app-input-text
          v-model="password"
          id="password1"
          type="password"
          class="w-full mb-3"
        />

        <app-button
          :label="submitButtonText"
          type="submit"
          icon="pi pi-user"
          :loading="isLoading"
          class="w-full"
        ></app-button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
