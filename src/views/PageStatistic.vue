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

const userStore = useUserStore();
const db = getFirestore();
const interviews = ref<IInterview[]>([]);
const chartData = ref();
const chartOptions = ref();

// Функция получения всех собеседований
const getAllInterviews = async <T extends IInterview>(): Promise<T[]> => {
  const getData = query(
    collection(db, `users/${userStore.userId}/interviews`),
    orderBy("createdAt", "desc")
  );

  // Получение всех документов из коллекции
  const listDocs = await getDocs(getData);
  return listDocs.docs.map((doc) => doc.data() as T);
};

onMounted(() => {
  // chartData.value = setChartData();
  // chartOptions.value = setChartOptions();
});

const setChartData = () => {
  const documentStyle = getComputedStyle(document.body);

  return {
    labels: ["A", "B", "C"],
    datasets: [
      {
        data: [540, 325, 702],
        backgroundColor: [
          documentStyle.getPropertyValue("--p-cyan-500"),
          documentStyle.getPropertyValue("--p-orange-500"),
          documentStyle.getPropertyValue("--p-gray-500"),
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue("--p-cyan-400"),
          documentStyle.getPropertyValue("--p-orange-400"),
          documentStyle.getPropertyValue("--p-gray-400"),
        ],
      },
    ],
  };
};

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--p-text-color");

  return {
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          color: textColor,
        },
      },
    },
  };
};
</script>

<template>
  <h1>Статистика</h1>
  <div class="card flex justify-center">
    <app-chart
      type="pie"
      :data="chartData"
      :options="chartOptions"
      class="w-full md:w-[30rem]"
    />
  </div>
</template>
