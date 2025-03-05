<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore"; // Импорт функций для работы с Firestore
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import type { IInterview, IStage } from "@/interfaces";
import { useToast } from "primevue/usetoast";

const db = getFirestore();
const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const toast = useToast();

const interview = ref<IInterview>();
const isLoading = ref<boolean>(true);

const docRef = doc(
  db,
  `users/${userStore.userId}/interviews`,
  route.params.id as string
);

// Функция получения данных
const getData = async (): Promise<void> => {
  isLoading.value = true;

  const docSnap = await getDoc(docRef);
  // Если документ существует, записываем его в переменную interview
  if (docSnap.exists()) {
    const data = docSnap.data() as IInterview;

    // Проверяем, что массив существует и не пустой
    if (data.stages && data.stages.length) {
      data.stages = data.stages.map((stage: IStage) => {
        // Проверяем, что поле date является Timestamp
        if (stage.date && stage.date instanceof Timestamp) {
          return {
            ...stage,
            date: stage.date.toDate(), // Преобразуем Timestamp в Date
          };
        }
        return stage;
      });
    }

    interview.value = data;
  }
  isLoading.value = false;
  console.log(interview.value);
};

// Функция добавления этапа
const addStage = () => {
  if (interview.value) {
    try {
      // Если массива нет, создаем его
      if (!interview.value.stages) {
        interview.value.stages = [];
      }
      // Добавляем новый объект в массив
      interview.value.stages.push({
        name: "",
        date: null,
        description: "",
      });
    } catch (error: unknown) {
      toast.add({
        severity: "error",
        summary: "Ошибка",
        detail: "Не удалось добавить новый этап собеседования!",
        life: 3000,
      });
      console.error(error);
    }
  }
};

// Функция удаления этапа
const deleteStage = (index: number): void => {
  if (interview.value) {
    try {
      // Удаляем объект из массива по индексу
      if (interview.value.stages) {
        interview.value.stages.splice(index, 1);
      }
    } catch (error: unknown) {
      toast.add({
        severity: "error",
        summary: "Ошибка",
        detail: "Не удалось удалить этап собеседования!",
        life: 3000,
      });
      console.error(error);
    }
  }
};

// Функция сохранения данных
const saveInterview = async (): Promise<void> => {
  isLoading.value = true;
  try {
    // Обновляем документ в Firestore
    await updateDoc(docRef, { ...interview.value });
    // Обновляем данные
    await getData().then(() => {
      toast.add({
        severity: "success",
        summary: "Усех",
        detail: "Собеседование успешно сохранено",
        life: 3000,
      });
      router.push("/list"); // Переход на страницу со списком собеседований
    });
  } catch (error: unknown) {
    toast.add({
      severity: "error",
      summary: "Ошибка",
      detail: "Не удалось сохранить собеседование!",
      life: 3000,
    });
    console.error(error);
  } finally {
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
        >Собеседование в компанию {{ interview.company }}</template
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
          <label for="vacancyLink">Описание вакансии (ссылка)</label>
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
              inputId="salaryFrom"
              placeholder="Зарплатная вилка от"
              v-model="interview.salaryFrom"
            />
          </div>
          <div class="flex-auto">
            <app-input-number
              inputId="salaryTo"
              placeholder="Зарплатная вилка до"
              v-model="interview.salaryTo"
            />
          </div>
        </div>

        <app-button
          label="Добавить этап"
          severity="info"
          icon="pi pi-plus"
          class="mb-3"
          @click="addStage()"
        />
        <template v-if="interview.stages">
          <div
            class="interview-stage"
            v-for="(stage, index) in interview.stage"
            :key="index"
          >
            <div class="flex flex-column gap-2">
              <label :for="`stage-name-${index}`">Название этапа</label>
              <app-input-text
                class="input mb-3"
                :id="`stage-name-${index}`"
                v-model="stage.name"
              />
            </div>

            <div class="flex flex-column gap-2">
              <label :for="`stage-date-${index}`">Дата прохождения этапа</label>
              <app-calendar
                class="input mb-3"
                :id="`stage-date-${index}`"
                dateFormat="dd.mm.yy"
                v-model="stage.date"
              />
            </div>

            <div class="flex flex-column gap-2">
              <label :for="`stage-description-${index}`">Комментарий</label>
              <app-textarea
                :id="`stage-description-${index}`"
                class="input mb-3"
                rows="5"
                v-model="stage.description"
              />
            </div>
            <app-button
              severity="danger"
              label="Удалить этап"
              @click="deleteStage(index)"
            />
          </div>
        </template>

        <div class="flex flex-wrap gap-3 mb-3">
          <div class="flex align-items-center">
            <app-radio
              inputId="interviewResult1"
              name="result"
              value="Refusal"
              v-model="interview.result"
            />
            <label for="interviewResult1" class="ml-2">Отказ</label>
          </div>
          <div class="flex align-items-center">
            <app-radio
              inputId="interviewResult2"
              name="result"
              value="Offer"
              v-model="interview.result"
            />
            <label for="interviewResult2" class="ml-2">Оффер</label>
          </div>
        </div>

        <app-button
          label="Сохранить"
          icon="pi pi-save"
          @click="saveInterview()"
        />
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
