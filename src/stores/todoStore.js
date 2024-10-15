// store/todoStore.js
import { defineStore } from "pinia";
import { ref } from "vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { GET_TODOS, INSERT_TODO, DELETE_TODO } from "../graphql/todo";

export const useTodoStore = defineStore("todo", () => {
  const todos = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchTodos = () => {
    const {
      result,
      loading: loadingQuery,
      error: errorQuery,
    } = useQuery(GET_TODOS, {
      fetchPolicy: "network-only",
    });

    loading.value = loadingQuery;

    if (errorQuery.value) {
      error.value = errorQuery.value;
      console.error("Error fetching todos:", error.value);
      return;
    }

    if (result.value) {
      todos.value = result.value.Todos || [];
    }
  };

  const addTodo = async (title) => {
    const { mutate } = useMutation(INSERT_TODO, {
      variables: { title, completed: false },
      update: (cache, { data: { insert_Todos } }) => {
        if (insert_Todos.affected_rows > 0) {
          const existingTodos = cache.readQuery({ query: GET_TODOS });
          const newTodos = [...existingTodos.Todos, ...insert_Todos.returning];
          cache.writeQuery({
            query: GET_TODOS,
            data: { Todos: newTodos },
          });
        }
      },
    });
    await mutate();
    await fetchTodos();
  };

  const deleteTodo = async (id) => {
    const { mutate } = useMutation(DELETE_TODO, {
      variables: { id },
      update: (cache, { data: { delete_Todos } }) => {
        if (delete_Todos.affected_rows > 0) {
          const existingTodos = cache.readQuery({ query: GET_TODOS });
          const newTodos = existingTodos.Todos.filter((todo) => todo.id !== id);
          cache.writeQuery({
            query: GET_TODOS,
            data: { Todos: newTodos },
          });
        }
      },
    });
    await mutate();
    await fetchTodos();
  };

  return { todos, loading, error, fetchTodos, addTodo, deleteTodo };
});
