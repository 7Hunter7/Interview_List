<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

interface IMenuItem {
  label: string;
  icon: string;
  path: string;
}

const items = ref<IMenuItem[]>([
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
  <app-menubar :model="items" class="menu">
    <template #start>{{ userStore.userId }}</template>
    <template #item="{ item, props }">
      <router-link
        to="item.path"
        class="flex align-items-center"
        v-bind="props.action"
      >
        <span :class="item.icon" class="p-menuitem-icon"></span>
        <span class="ml-2">{{ item.label }}</span>
      </router-link>
    </template>
    <template #end>
      <span class="flex align-items-center menu-exit">
        <span class="pi pi-sign-out p-menuitem-icon" />
        <span class="ml-2">Выход</span>
      </span>
    </template>
  </app-menubar>
</template>

<style scoped>
.menu {
  margin: 30px 0;
}
.menu-exit {
  cursor: pointer;
}
</style>
