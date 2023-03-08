import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";
import { Todo } from "../types/Todo";
import { Tasks } from "../utils/Tasks";

type TasksContextType = {
   tasks: Todo[];
   filteredTasks: Todo[];
   currentTask: Todo;
   getTasks: () => void;
   searchTasks: (taskName: string) => void;
   addTask: (task: Todo) => void;
   selectTask: (task: Todo) => void;
   editTask: (taskId: number, updatedTask: Todo) => void;
   deleteTask: (taskId: number) => void;
};

type TasksProviderProps = {
   children: ReactNode;
};

export const TasksContext = createContext({} as TasksContextType);

export const TasksProvider = ({ children }: TasksProviderProps) => {
   const [tasks, setTasks] = useState<Todo[]>(Tasks);
   const [filteredTasks, setFilteredTasks] = useState<Todo[]>([]);
   const [editing, setEditing] = useState(false);

   const initialState = { id: 1, description: "", checked: false };
   const [currentTask, setCurrentTask] = useState(initialState);

   // Get all tasks
   const getTasks = async () => {
      return tasks;
   };

   // Search tasks
   const searchTasks = async (taskName: string) => {
      let tableRow = document.getElementsByClassName(
         "row"
      ) as HTMLCollectionOf<HTMLElement>;
      let filteredData: Todo[] = [];

      for (let i = 0; i < tasks.length; i++) {
         let taskDesc = tasks[i].description.toLowerCase();
         let userInput = taskName.toLowerCase();

         if (taskDesc.indexOf(userInput) > -1) {
            tableRow[i].style.display = "";
            filteredData.push(tasks[i]);
         } else {
            tableRow[i].style.display = "none";
         }
      }
      setFilteredTasks(filteredData);
   };

   // Add task
   const addTask = async (task: Todo) => {
      task.id = tasks.length + 1;
      setTasks([...tasks, task]);
   };

   // Select task to be edited
   const selectTask = (task: Todo) => {
      setEditing(true);
      setCurrentTask({
         id: task.id,
         description: task.description,
         checked: task.checked,
      });
   };

   // Edit selected task
   const editTask = async (taskId: number, updatedTask: Todo) => {
      setEditing(false);
      setTasks(tasks.map((task) => (task.id === taskId ? updatedTask : task)));
   };

   // Delete task
   const deleteTask = async (taskId: number) => {
      setTasks(tasks.filter((task) => task.id !== taskId));
   };

   return (
      <TasksContext.Provider
         value={{
            tasks,
            filteredTasks,
            currentTask,
            getTasks,
            searchTasks,
            addTask,
            selectTask,
            editTask,
            deleteTask,
         }}
      >
         {children}
      </TasksContext.Provider>
   );
};
