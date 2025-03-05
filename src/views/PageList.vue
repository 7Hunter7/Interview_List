<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  getDocs,
  deleteDoc,
  doc,
  where,
} from "firebase/firestore"; // Импорт функций для работы с Firestore
import { useUserStore } from "@/stores/user";
import type { IInterview } from "@/interfaces";
import { useConfirm } from "primevue/useconfirm";

const userStore = useUserStore();
const db = getFirestore(); // Получение доступа к Firestore
const confirm = useConfirm();

const interviews = ref<IInterview[]>([]);
const isLoading = ref<boolean>(true);
const selectedFilterResult = ref<string>("");

// Функция получения всех собеседований
const getAllInterviews = async <T extends IInterview>(): Promise<T[]> => {
  // Создание запроса к коллекции "interviews"
  const getData = query(
    collection(db, `users/${userStore.userId}/interviews`),
    orderBy("createdAt", "desc") // С сортировкой по полю "date" по убыванию
  );
  const ListDocs = await getDocs(getData); // Получение всех документов из коллекции
  return ListDocs.docs.map((doc) => doc.data() as T);
};

// Функция удаления собеседования
const confirmRemoveInterview = async (id: string): Promise<void> => {
  confirm.require({
    header: "Удаление собеседования",
    message: "Вы уверены, что хотите удалить собеседование?",
    icon: "pi pi-info-circle",
    rejectLabel: "Отмена",
    acceptLabel: "Удалить",
    rejectClass: "p-button-secondary p-button-outlined",
    acceptClass: "p-button-danger",

    accept: async () => {
      isLoading.value = true;

      await deleteDoc(doc(db, `users/${userStore.userId}/interviews`, id));

      const listInterviews: Array<IInterview> = await getAllInterviews();
      interviews.value = [...listInterviews];
      isLoading.value = false;
    },
  });
};

onMounted(async () => {
  const listInterviews: Array<IInterview> = await getAllInterviews();
  interviews.value = [...listInterviews];
  isLoading.value = false;
});
</script>

<template>
  <app-dialog />
  <app-progress v-if="isLoading" />
  <app-message v-else-if="!isLoading && !interviews.length" severity="info"
    >Нет добавленных собеседований</app-message
  >
  <div v-else>
    <h1>Список собеседований</h1>

    // Фильтр по результату собеседования
    <div class="flex align-items-center mb-5">
      <div class="flex align-items-center mr-2">
        <app-radio
          inputId="interviewResult1"
          name="result"
          value="Refusal"
          v-model="selectedFilterResult"
        />
        <label for="interviewResult1" class="ml-2">Отказ</label>
      </div>
      <div class="flex align-items-center mr-2">
        <app-radio
          inputId="interviewResult1"
          name="result"
          value="Offer"
          v-model="selectedFilterResult"
        />
        <label for="interviewResult1" class="ml-2">Оффер</label>
      </div>
      <app-button class="mr-2"> Применить</app-button>
      <app-button class="mr-2" severity="danger"> Сбросить</app-button>
    </div>

    // Таблица с данными собеседований
    <app-data-table :data="interviews" :isLoading="isLoading">
      <app-column field="company" header="Компания" />
      <app-column field="hrName" header="Имя HR" />
      <app-column field="vacancyLink" header="Вакансия">
        <template #body="slotProps">
          <a :href="slotProps.data.vacancyLink" target="_blank"
            >Ссылка на вакансию</a
          >
        </template>
      </app-column>
      <app-column header="Контакты">
        <template #body="slotProps">
          <div class="contacts">
            <a
              v-if="slotProps.data.contactPhone"
              :href="`https://t.me/${slotProps.data.contactTelegram}`"
              target="_blank"
              class="contacts__telegram"
            >
              <span class="contacts__icon pi pi-telegram"></span>
            </a>
            <a
              v-if="slotProps.data.contactWhatsApp"
              :href="`https://wa.me/${slotProps.data.contactWhatsApp}`"
              target="_blank"
              class="contacts__whatsapp"
            >
              <span class="contacts__icon pi pi-whatsapp"></span>
            </a>
            <a
              v-if="slotProps.data.contactPhone"
              :href="`tel:${slotProps.data.contactPhone}`"
              target="_blank"
              class="contacts__phone"
            >
              <span class="contacts__icon pi pi-phone"></span>
            </a>
          </div>
        </template>
      </app-column>

      <app-column header="Пройденные этапы">
        <template #body="slotProps">
          <span v-if="!slotProps.data.stages">Не заполнено</span>
          <div v-else class="interview-stage">
            <app-badge
              v-for="(stage, index) in slotProps.data.stages"
              :key="index"
              :value="index + 1"
              rounded
              v-tooltip.top="stage.name"
            />
          </div>
        </template>
      </app-column>

      <app-column header="Зарлатная вилка">
        <template #body="slotProps">
          <span v-if="!slotProps.data.salaryFrom">Не заполнено</span>
          <span v-else>
            {{ slotProps.data.salaryFrom }} -
            {{ slotProps.data.salaryTo }}</span
          >
        </template>
      </app-column>

      <app-column header="Результат">
        <template #body="slotProps">
          <span v-if="!slotProps.data.result">Не заполнено</span>
          <template v-else>
            <app-badge
              :severity="
                slotProps.data.result === 'Offer' ? 'success' : 'danger'
              "
              :value="slotProps.data.result === 'Offer' ? 'Оффер' : 'Отказ'"
            />
          </template>
        </template>
      </app-column>

      <app-column>
        <template #body="slotProps">
          <div class="flex gap-2">
            <router-link to="`/interview/${slotProps.data.id}`">
              <app-button icon="pi pi-pencel" severity="info" />
            </router-link>
            <app-button
              icon="pi pi-trash"
              severity="danger"
              @click="confirmRemoveInterview(slotProps.data.id)"
            />
          </div>
        </template>
      </app-column>
    </app-data-table>
  </div>
</template>

<style scoped>
.contacts {
  display: flex;
  align-items: center;
  gap: 20px;
}
.contacts__telegram {
  color: #0088cc;
}
.contacts__whatsapp {
  color: #25d366;
}
.contacts__phone {
  color: #371777;
}
.contacts__icon {
  font-size: 20px;
}
.interview-stages {
  display: flex;
  gap: 5px;
}
</style>
