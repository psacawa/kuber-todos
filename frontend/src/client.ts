import { useMutation, useQuery } from "react-query";
import axios, { AxiosResponse } from "axios";
import { Todo } from "./types";
import { queryClient } from ".";

const apiRoot = "/api";

export const useTodos = () =>
  useQuery("todos", () =>
    axios
      .get(`${apiRoot}/todos/`)
      .then((response: AxiosResponse<Todo[]>) => response.data)
  );

export const useCreateTodo = () =>
  useMutation(
    (values: { text: string }) =>
      axios.post(`${apiRoot}/todos/`, values).then((response) => response.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );

export const useDeleteTodo = () =>
  useMutation(
    (values: { id: number }) => axios.delete(`${apiRoot}/todos/${values.id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );
