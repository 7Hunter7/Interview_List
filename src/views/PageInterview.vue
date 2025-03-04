<script setup lang="ts"></script>

<template>
  <div class="content-interview">
    <app-card>
      <template #title>Cобеседвание в компанию</template>
      <template #content>
        <div class="flex flex-column gap-2">
          <label for="company">Компания</label>
          <app-input-text class="input mb-3" id="company" />
        </div>
        <div class="flex flex-column gap-2">
          <label for="vacancyLink">Описание вакансиии (ссылка)</label>
          <app-input-text class="input mb-3" id="vacancyLink" />
        </div>
        <div class="flex flex-column gap-2">
          <label for="hrName">Контакт (имя)</label>
          <app-input-text class="input mb-3" id="hrName" />
        </div>
        <div class="flex flex-column gap-2">
          <label for="contactTelegram">Telegram username HR</label>
          <app-input-text class="input mb-3" id="contactTelegram" />
        </div>
        <div class="flex flex-column gap-2">
          <label for="contactWhatsApp">WhatsApp HR</label>
          <app-input-text class="input mb-3" id="contactWhatsApp" />
        </div>
        <div class="flex flex-column gap-2">
          <label for="contactPhone">Телефон HR</label>
          <app-input-text class="input mb-3" id="contactPhone" />
        </div>
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
