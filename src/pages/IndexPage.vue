<template>
  <q-page class="flex flex-center q-pa-md bg-blue" style="min-height: 100vh">
    <div
      class="q-gutter-md bg-white custom-border-radius"
      style="max-width: 600px; width: 100%"
    >
      <h1 class="text-h2 text-weight-bolder text-center text-primary q-mb-md">
        Todo List
      </h1>

      <q-form @submit.prevent="addTodo" class="q-ma-md">
        <div class="q-gutter-sm flex">
          <q-input
            v-model="newTodoTitle"
            label="Todo Title"
            required
            outlined
            class="flex-grow-1"
            style="flex: 3 1 0%"
          />
          <q-btn
            type="submit"
            color="primary"
            label="Add Todo"
            class="q-min-width"
            style="flex: 1 1 0%"
          />
        </div>
      </q-form>

      <q-card v-if="loading" class="q-ma-md" flat bordered>
        <q-card-section class="q-pa-md flex flex-center">
          <q-spinner color="primary" />
          <span class="q-ml-sm">Loading...</span>
        </q-card-section>
      </q-card>

      <q-card v-if="error" class="q-ma-md" flat bordered>
        <q-card-section class="q-pa-md flex flex-center text-negative">
          <q-icon name="warning" size="24px" color="negative" />
          <span class="q-ml-sm">Error: {{ error.message }}</span>
        </q-card-section>
      </q-card>

      <!-- TodoList Component -->
      <TodoList
        v-if="!loading && !error"
        :Todos="Todos"
        @click-todo="handleClick"
        @delete-todo="deleteTodo"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useTodoStore } from "../stores/todoStore";
import { useQuery } from "@vue/apollo-composable";
import { GET_TODOS } from "src/graphql/todo";
import TodoList from "../components/TodoList.vue";

const newTodoTitle = ref("");
const todoStore = useTodoStore();

const { result, loading, error } = useQuery(GET_TODOS);
const Todos = computed(() => result.value?.Todos || []);

onMounted(() => {
  todoStore.fetchTodos();
});

const addTodo = async () => {
  if (!newTodoTitle.value) {
    alert("Please enter a title for the todo.");
    return;
  }
  await todoStore.addTodo(newTodoTitle.value);
  newTodoTitle.value = "";
};

const handleClick = (id) => {
  console.log("Clicked todo id:", id);
};

const deleteTodo = async (id) => {
  if (confirm("Are you sure you want to delete this todo?")) {
    await todoStore.deleteTodo(id);
  }
};
</script>

<style>
.custom-border-radius {
  border-radius: 10px;
}
</style>
