<template>
  <q-list v-if="Todos.length" class="q-ma-md">
    <q-item-group bordered>
      <TodoItem
        v-for="todo in Todos"
        :key="todo.id"
        :todo="todo"
        @click="handleClick"
        @delete="deleteTodo"
      />
    </q-item-group>
  </q-list>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import TodoItem from "./TodoItem.vue";

const props = defineProps({
  Todos: Array,
});

const emit = defineEmits(["delete-todo", "click-todo"]);

const handleClick = (id) => {
  emit("click-todo", id);
};

const deleteTodo = (id) => {
  emit("delete-todo", id);
};
</script>
