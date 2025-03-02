<script setup lang="ts">
import { ref } from "vue";

const items = ref([
  {
    label: "Авторизация",
    icon: "pi pi-user",
    path: "/auth",
  },
  {
    label: "Добавить",
    icon: "pi pi-plus",
    path: "/",
  },
  {
    label: "Список собеседований",
    icon: "pi pi-list",
    path: "/list",
  },
  {
    label: "Статистика",
    icon: "pi pi-chast-pie",
    path: "/statistic",
  },
]);
</script>

<template>
  <app-menubar :model="items" class="menu"> </app-menubar>
</template>

<style scoped>
.menu {
}
</style>
