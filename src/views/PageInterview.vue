<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore"; // Импорт функций для работы с Firestore
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import type { IInterview, IStage } from "@/interfaces";

const db = getFirestore();
const router = useRouter();
const userStore = useUserStore();
const interview = ref<IInterview>();
const isLoading = ref<boolean>(true);

const docRef = doc(
  db,
  `users/${userStore.userId}/interviews`,
  router.currentRoute.value.params.id as string
);

// Функция получения данных
const getData = async (): Promise<void> => {
  isLoading.value = true;

  const docSnap = await getDoc(docRef);
  // Если документ существует, записываем его в переменную interview
  if (docSnap.exists()) {
    interview.value = docSnap.data() as IInterview;
    console.log(interview.value);
    isLoading.value = false;
  }
};

onMounted(async () => {
  await getData();
});
</script>

<template>
  <app-progress v-if="isLoading" />
  <div class="content-interview" v-else-if="interview?.id && !isLoading">
    <app-card>
      <template #title
        >Cобеседвание в компанию {{ interview.company }}</template
      >
      <template #content>
        <div class="flex flex-column gap-2">
          <label for="company">Компания</label>
          <app-input-text
            class="input mb-3"
            id="company"
            v-model="interview.company"
          />
        </div>
        <div class="flex flex-column gap-2">
          <label for="vacancyLink">Описание вакансиии (ссылка)</label>
          <app-input-text
            class="input mb-3"
            id="vacancyLink"
            v-model="interview.vacancyLink"
          />
        </div>
        <div class="flex flex-column gap-2">
          <label for="hrName">Контакт (имя)</label>
          <app-input-text
            class="input mb-3"
            id="hrName"
            v-model="interview.hrName"
          />
        </div>
        <div class="flex flex-column gap-2">
          <label for="contactTelegram">Telegram username HR</label>
          <app-input-text
            class="input mb-3"
            id="contactTelegram"
            v-model="interview.contactTelegram"
          />
        </div>
        <div class="flex flex-column gap-2">
          <label for="contactWhatsApp">WhatsApp HR</label>
          <app-input-text
            class="input mb-3"
            id="contactWhatsApp"
            v-model="interview.contactWhatsApp"
          />
        </div>
        <div class="flex flex-column gap-2">
          <label for="contactPhone">Телефон HR</label>
          <app-input-text
            class="input mb-3"
            id="contactPhone"
            v-model="interview.contactPhone"
          />
        </div>
        <div class="flex flex-wrap gap-3 p-fluid mb-3">
          <div class="flex-auto">
            <app-input-number
              inputId="salsaryFrom"
              placeholder="Зарплатная вилка от"
              v-model="interview.salsaryFrom"
            />
          </div>
          <div class="flex-auto">
            <app-input-number
              inputId="salsaryTo"
              placeholder="Зарплатная вилка до"
              v-model="interview.salsaryTo"
            />
          </div>
        </div>

        <app-button
          label="Добавить этап"
          severity="info"
          Icon="pi pi-plus"
          class="mb-3"
        />

        // Шаблон для добавления этапа
        <template v-if="interview.stage">
          <div class="interview-stage">
            <div class="flex flex-column gap-2">
              <label for="stageName">Название этапа</label>
              <app-input-text class="input mb-3" id="stageName" />
            </div>

            <div class="flex flex-column gap-2">
              <label for="stageСalendar">Дата прохождения этапа</label>
              <app-calendar
                class="input mb-3"
                id="stageСalendar"
                dateFormat="dd.mm.yy"
              />
            </div>

            <div class="flex flex-column gap-2">
              <label for="stageDescription">Комментарий</label>
              <app-input-textarea
                id="stageDescription"
                class="input mb-3"
                rows="5"
              />
            </div>
            <app-button severity="danger" label="Удалить этап" />
          </div>
        </template>

        <div class="flex flex-wrap gap-3 mb-3">
          <div class="flex align-items-center">
            <app-radio
              inputId="interviewResult1"
              name="result"
              value="Refusal"
            />
            <label for="interviewResult1" class="ml-2">Отказ</label>
          </div>
        </div>
        <div class="flex flex-wrap gap-3 mb-3">
          <div class="flex align-items-center">
            <app-radio inputId="interviewResult2" name="result" value="Offer" />
            <label for="interviewResult2" class="ml-2">Оффер</label>
          </div>
        </div>

        <app-button label="Сохранить" icon="pi pi-save" />
      </template>
    </app-card>
  </div>
</template>

<style scoped>
.content-interview {
  max-width: 600px;
  margin: auto;
}
.input {
  width: 100%;
}
.interview-stage {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
