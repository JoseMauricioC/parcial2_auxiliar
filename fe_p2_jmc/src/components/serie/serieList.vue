<script setup lang="ts">
import type { Serie } from '@/models/serie'
import http from '@/plugins/axios'
import { Button } from 'primevue'
import { onMounted, ref } from 'vue'

const ENDPOINT = 'series'
const series = ref<Serie[]>([])
const emit = defineEmits(['edit'])

async function obtenerLista() {
  series.value = await http.get(ENDPOINT).then((response) => response.data)
}

function emitirEdicion(serie: Serie) {
  emit('edit', serie)
}

onMounted(() => {
  obtenerLista()
})
defineExpose({ obtenerLista })
</script>

<template>
  <div>
    <table border="1">
      <thead>
        <tr>
          <th>Nro.</th>
          <th>Titulo</th>
          <th>Sinopsis</th>
          <th>Director</th>
          <th>Temporadas</th>
          <th>Fecha de Estreno</th>
          <th>
            Tipo Clasificacion
            <!-- <select name="tipo clasificacion" id="tipo clasificacion">
              <option value="1">todo publico</option>
              <option value="2">para ninios</option>
              <option value="3">publico mayor a 12 anios</option>
              <option value="4">publico mayor a 16 anios</option>
              <option value="5">publico mayor a 18 anios</option>
            </select> -->
          </th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(serie, index) in series" :key="serie.id">
          <td>{{ index + 1 }}</td>
          <td>{{ serie.titulo }}</td>
          <td>{{ serie.sinopsis }}</td>
          <td>{{ serie.director }}</td>
          <td>{{ serie.temporadas }}</td>
          <td>{{ serie.fechaEstreno }}</td>
          <td></td>
          <td>
            <Button icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(serie)" />
            <Button icon="pi pi-trash" aria-label="Eliminar" text />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
