<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import type { IInterview } from "@/interfaces";
import { v4 as uuidv4 } from "uuid"; // Для генерации уникального id
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { useToast } from "primevue/usetoast";

const userStore = useUserStore();
const router = useRouter();
const toast = useToast();

// Поля для нового собеседования
const company = ref<string>("");
const vacancyLink = ref<string>("");
const hrName = ref<string>("");
const contactTelegram = ref<string>("");
const contactWhatsApp = ref<string>("");
const contactPhone = ref<string>("");

const loading = ref<boolean>(false);

// Добавление нового собеседования
const addNewInterview = async (): Promise<void> => {
  loading.value = true;

  const payload: IInterview = {
    id: uuidv4(), // Генерируем уникальный id
    company: company.value,
    vacancyLink: vacancyLink.value,
    hrName: hrName.value,
    contactTelegram: contactTelegram.value,
    contactWhatsApp: contactWhatsApp.value,
    contactPhone: contactPhone.value,
    createdAt: new Date().toISOString(),
  };

  if (userStore.userId) {
    const db = getFirestore(); // Получаем доступ к Firestore

    try {
      // Добавляем новое собеседование
      await setDoc(
        doc(db, `users/${userStore.userId}/interviews`, payload.id),
        payload
      ).then(() => {
        toast.add({
          severity: "success",
          summary: "Усех",
          detail: "Собеседование успешно добавлено!",
          life: 3000,
        });
        router.push("/list"); // Переход на страницу со списком собеседований
      });
    } catch (error: unknown) {
      toast.add({
        severity: "error",
        summary: "Ошибка",
        detail: "Не удалось добавить собеседование!",
        life: 3000,
      });
      console.error(error);
    } finally {
      loading.value = false;
    }
  }
};

// Проверка на заполненность полей
const disabledSaveButton = computed<boolean>(() => {
  // Если хотя бы одно поле не заполнено, то кнопка неактивна
  return !(company.value && vacancyLink.value && hrName.value);
});
</script>

<template>
  <div class="content-interview">
    <app-card>
      <template #title>Новое собеседование</template>
      <template #content>
        <app-input-text
          class="input mb-3"
          placeholder="Компания"
          v-model="company"
        />
        <app-input-text
          v-model="vacancyLink"
          class="input mb-3"
          placeholder="Описание вакансии (ссылка)"
        />
        <app-input-text
          v-model="hrName"
          class="input mb-3"
          placeholder="Контакт (имя)"
        />
        <app-input-text
          v-model="contactTelegram"
          class="input mb-3"
          placeholder="Telegram username HR"
        />
        <app-input-text
          v-model="contactWhatsApp"
          class="input mb-3"
          placeholder="WhatsApp телефон HR"
        />
        <app-input-text
          v-model="contactPhone"
          class="input mb-3"
          placeholder="Телефон HR"
        />
        <app-button
          @click="addNewInterview"
          label="Создать собеседование"
          :disabled="disabledSaveButton"
          :loading="loading"
        ></app-button>
      </template>
    </app-card>
  </div>
</template>

<style scoped>
.input {
  width: 100%;
}
.content-interview {
  max-width: 600px;
  margin: auto;
}
</style>
