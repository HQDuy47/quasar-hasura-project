// src/graphql/todos.js
import { gql } from "graphql-tag";

export const GET_TODOS = gql`
  query {
    Todos {
      id
      title
    }
  }
`;

export const INSERT_TODO = gql`
  mutation InsertTodos($completed: Boolean, $title: String!) {
    insert_Todos(objects: { completed: $completed, title: $title }) {
      affected_rows
      returning {
        id
        title
      }
    }
  }
`;

export const DELETE_TODO = gql`
  mutation deleteTodo($id: String!) {
    delete_Todos(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;
