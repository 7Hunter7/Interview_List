<script setup lang="ts">
import { computed, ref } from "vue";

const company = ref<string>("");
const vacancyLink = ref<string>("");
const hrName = ref<string>("");
const contactTelegram = ref<string>("");
const contactWhatsApp = ref<string>("");
const contactPhone = ref<string>("");

const loading = ref<boolean>("false");
const addNewInterview = (){};

const disabledSaveButton = computed<boolean>(() => {
  return !(company.value && vacancyLink.value && hrName.value)
})
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
