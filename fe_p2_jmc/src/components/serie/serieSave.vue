<script setup lang="ts">
import type { Serie } from '@/models/serie'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'series'
const props = defineProps({
  mostrar: Boolean,
  serie: {
    type: Object as () => Serie,
    default: () => ({}) as Serie,
  },
  modoEdicion: Boolean,
})
const emit = defineEmits(['guardar', 'close'])

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  },
})

const serie = ref<Serie>({ ...props.serie })

watch(
  () => props.serie,
  (newVal) => {
    serie.value = { ...newVal }
  },
)

async function handleSave() {
  try {
    const body = {
      titulo: serie.value.titulo,
      sinopsis: serie.value.sinopsis,
      director: serie.value.director,
      temporadas: serie.value.temporadas,
      fechaEstreno: serie.value.fechaEstreno,
    }

    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${serie.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }

    emit('guardar')
    serie.value = {} as Serie
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message || 'Error al guardar la serie')
  }
}
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="props.modoEdicion ? 'Editar' : 'Crear'"
      style="width: 25rem"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="titulo" class="font-semibold w-24">Titulo</label>
        <InputText
          id="titulo"
          v-model="serie.titulo"
          class="flex-auto"
          autocomplete="off"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="sinopsis" class="font-semibold w-24">Sinopsis</label>
        <InputText id="sinopsis" v-model="serie.sinopsis" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="director" class="font-semibold w-24">Director</label>
        <InputText id="director" v-model="serie.director" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="temporadas" class="font-semibold w-24">Temporadas</label>
        <InputText
          id="temporadas"
          v-model.number="serie.temporadas"
          class="flex-auto"
          autocomplete="off"
        />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="fecha estreno" class="font-semibold w-24">fecha Estreno</label>
        <InputText
          id="fecha estreno"
          v-model="serie.fechaEstreno"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <!-- <div class="flex items-center gap-4 mb-4">
        <label for="tipo clacificacion" class="font-semibold w-24">Tipo Clasificacion</label>
        <InputText
          id="tipo clasificacion"
          v-model="serie.tipo"
          class="flex-auto"
          autocomplete="off"
        />
      </div> -->
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          icon="pi pi-times"
          severity="secondary"
          @click="dialogVisible = false"
        />
        <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave" />
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
