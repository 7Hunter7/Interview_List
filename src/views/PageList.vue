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
import type { IInterview } from "@/interfaces"; // Импорт интерфейса IInterview

const userStore = useUserStore();
const db = getFirestore(); // Получение доступа к Firestore

const interviews = ref<IInterview[]>([]);
const isLoading = ref<boolean>(true);

// Создание функции для получения всех собеседований
const getAllInterviews = async <T extends IInterview>(): Promise<T[]> => {
  // Создание запроса к коллекции "interviews"
  const getData = query(
    collection(db, `users/${userStore.userId}/interviews`),
    orderBy("createdAt", "desc") // С сортировкой по полю "date" по убыванию
  );
  const ListDocs = await getDocs(getData); // Получение всех документов из коллекции
  console.log(ListDocs);
};

onMounted(async () => {
  await getAllInterviews();
});
</script>

<template>
  <h1>Список собеседований</h1>
  <p>Это страница списка собеседований</p>
</template>

<style scoped></style>
