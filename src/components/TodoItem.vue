<template>
  <q-item
    clickable
    class="my-card-item q-mb-sm"
    @click="$emit('click', todo.id)"
  >
    <q-item-section>
      <q-item-label class="text-h6">{{ todo.title }}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-btn
        @click.stop="$emit('delete', todo.id)"
        color="negative"
        flat
        icon="delete"
        class="q-ml-md"
        title="Delete"
      />
    </q-item-section>
  </q-item>
</template>

<script setup>
defineProps({
  todo: Object,
});
</script>

<style scoped>
.my-card-item {
  transition: background-color 0.2s ease;
}

.my-card-item:hover {
  background-color: #e3f2fd;
}
</style>
