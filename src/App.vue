<script setup lang="ts">
import AppHeder from "@/components/AppHeader.vue";
</script>

<template>
  <div class="container">
    <AppHeder />
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1280px;
  margin: auto;
  padding: 20px;
}
</style>
