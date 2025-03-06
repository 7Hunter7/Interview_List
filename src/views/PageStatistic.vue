<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  getDocs,
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

  const listDocs = await getDocs(getData);
  return listDocs.docs.map((doc) => doc.data() as T);
};

onMounted(async () => {
  interviews.value = await getAllInterviews();
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

// Функция установки данных для графика
const setChartData = () => {
  const documentStyle = getComputedStyle(document.body);

  const data: number[] = [0, 0, 0];

  // Подсчет количества собеседований по результатам
  interviews.value.forEach((interview: IInterview) => {
    if (interview.result === "Offer") {
      data[0]++;
    } else if (interview.result === "Refusal") {
      data[1]++;
    } else {
      data[2]++;
    }
  });

  return {
    labels: ["Оффер", "Отказ", "В процессе"],
    datasets: [
      {
        data,
        backgroundColor: [
          documentStyle.getPropertyValue("--cyan-500"),
          documentStyle.getPropertyValue("--orange-500"),
          documentStyle.getPropertyValue("--gray-500"),
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue("--cyan-400"),
          documentStyle.getPropertyValue("--orange-400"),
          documentStyle.getPropertyValue("--gray-400"),
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
          cutout: "60%",
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
