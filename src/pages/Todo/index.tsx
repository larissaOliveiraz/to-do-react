import { Check, PencilSimpleLine, TrashSimple } from "@phosphor-icons/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Todo as TodoType } from "../../types/Todo";
import * as Checkbox from "@radix-ui/react-checkbox";
import styles from "./styles.module.scss";
import { TasksContext } from "../../contexts/TasksContext";
import { Dialog } from "@radix-ui/react-dialog";
import { TaskList } from "../../components/TaskList";
import { SearchForm } from "../../components/SearchForm";

export const Todo = () => {
   const { tasks, filteredTasks, searchTasks, getTasks } =
      useContext(TasksContext);

   const [searchInput, setSearchInput] = useState("");

   const handleOnSearch = (searchValue: string) => {
      setSearchInput(searchValue);
      searchTasks(searchValue);
   };

   useEffect(() => {
      getTasks();
   }, [tasks]);

   return (
      <div className={styles.container}>
         <header>
            <Header />
            <SearchForm onSearch={handleOnSearch} />
         </header>

         <main>
            {searchInput ? (
               <div>
                  <p>
                     <strong>{filteredTasks.length}</strong>{" "}
                     {filteredTasks.length > 1 ? "tasks" : "task"}
                  </p>
                  <TaskList />
               </div>
            ) : (
               <div>
                  <p>
                     <strong>{tasks.length}</strong>{" "}
                     {tasks.length > 1 ? "tasks" : "task"}
                  </p>
                  <TaskList />
               </div>
            )}
         </main>
      </div>
   );
};
