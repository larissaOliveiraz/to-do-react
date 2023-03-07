import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../libs/axios";
import { Todo } from "../types/Todo";

type TasksContextType = {
   tasks: Todo[];
   filteredTasks: Todo[];
   getTasks: () => void;
   searchTasks: (taskName: string) => void;
   addTask: (taskName: string) => void;
   editTask: (taskId: number, taskName: string) => void;
   editChecked: (
      taskId: number,
      taskName: string,
      taskChecked: boolean
   ) => void;
   deleteTask: (taskId: number) => void;
};

type TasksProviderProps = {
   children: ReactNode;
};

export const TasksContext = createContext({} as TasksContextType);

export const TasksProvider = ({ children }: TasksProviderProps) => {
   const [tasks, setTasks] = useState<Todo[]>([]);
   const [filteredTasks, setFilteredTasks] = useState<Todo[]>([]);

   const getTasks = async () => {
      const { data } = await api.get("/todos");
      setTasks(data);
   };

   const searchTasks = async (taskName: string) => {
      const { data } = await api.get("/todos");

      const filteredData = data.filter(
         (task: Todo) =>
            task.description.toLowerCase().indexOf(taskName.toLowerCase()) > -1
      );
      setFilteredTasks(filteredData);
   };

   const addTask = async (taskName: string) => {
      const { data } = await api.post("/todos", {
         description: taskName,
         checked: false,
         createdAt: new Date(),
      });
      setTasks((state) => [...state, data]);
   };

   const editTask = async (taskId: number, taskName: string) => {
      await api.put(`/todos/${taskId}`, {
         description: taskName,
         createdAt: new Date(),
      });
      getTasks();
   };

   const editChecked = async (
      taskId: number,
      taskName: string,
      taskChecked: boolean
   ) => {
      await api.put(`/todos/${taskId}`, {
         description: taskName,
         checked: !taskChecked,
         createdAt: new Date(),
      });
      getTasks();
   };

   const deleteTask = async (taskId: number) => {
      await api.delete(`/todos/${taskId}`);
      getTasks();
   };

   useEffect(() => {
      getTasks();
   }, []);

   return (
      <TasksContext.Provider
         value={{
            tasks,
            filteredTasks,
            getTasks,
            searchTasks,
            addTask,
            editTask,
            editChecked,
            deleteTask,
         }}
      >
         {children}
      </TasksContext.Provider>
   );
};
