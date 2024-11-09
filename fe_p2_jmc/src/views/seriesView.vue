<script setup lang="ts">
import SerieList from '@/components/serie/serieList.vue'
import { Button } from 'primevue'
</script>

<template>
  <div>
    <h1>Series</h1>
    <Button label="Crear Nuevo" icon="pi pi-plus" />
    <SerieList />
  </div>
</template>

<style scoped></style>
