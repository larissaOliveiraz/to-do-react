import { Plus } from "@phosphor-icons/react";
import { SearchForm } from "../SearchForm";
import * as Dialog from "@radix-ui/react-dialog";
import styles from "./styles.module.scss";
import { TaskModal } from "../TaskModal";
import { useContext, useEffect, useState } from "react";
import { Todo } from "../../types/Todo";
import { TasksContext } from "../../contexts/TasksContext";

export const Header = () => {
   const { tasks } = useContext(TasksContext);

   return (
      <div className={styles.container}>
         <div className={styles.topHeader}>
            <span>to-do list</span>
            <Dialog.Root>
               <Dialog.Trigger className={styles.dialogTrigger}>
                  <div className={styles.btnContainer}>
                     <div>
                        <Plus size={24} weight="bold" />
                     </div>
                     <p>Add Task</p>
                  </div>
               </Dialog.Trigger>

               <TaskModal title="NEW TASK" onAdd task={tasks[0]} />
            </Dialog.Root>
         </div>
      </div>
   );
};
