import { X } from "@phosphor-icons/react";
import * as Dialog from "@radix-ui/react-dialog";
import { KeyboardEvent, useContext, useState } from "react";
import { TasksContext } from "../../contexts/TasksContext";
import { api } from "../../libs/axios";
import { Todo } from "../../types/Todo";
import styles from "./styles.module.scss";

type Props = {
   title: string;
   task: Todo;
   onAdd?: boolean;
   onEdit?: boolean;
};

export const TaskModal = ({ title, task, onAdd, onEdit }: Props) => {
   const { tasks, addTask, editTask } = useContext(TasksContext);
   const [taskName, setTaskName] = useState("");
   const [focused, setFocused] = useState(true);

   const handleAddTask = (taskName: string) => {
      addTask(taskName);
      setTaskName("");
   };

   const handleEditTask = (taskId: number, taskName: string) => {
      editTask(taskId, taskName);
      setTaskName("");
   };

   const handleOnKeyUp = (
      e: KeyboardEvent<HTMLInputElement>,
      taskId: number,
      taskName: string
   ) => {
      if (onAdd) {
         if (e.code === "Enter") {
            handleAddTask(taskName);
         }
      }
      if (onEdit) {
         if (e.code === "Enter") {
            handleEditTask(taskId, taskName);
         }
      }
   };

   return (
      <Dialog.Portal>
         <Dialog.Overlay className={styles.dialogOverlay} />
         <Dialog.Content className={styles.dialogContent}>
            <div className={styles.dialogHeader}>
               <Dialog.Title className={styles.dialogTitle}>
                  {title}
               </Dialog.Title>
               <Dialog.Close className={styles.dialogClose}>
                  <X size={24} />
               </Dialog.Close>
            </div>

            <input
               type="text"
               id="input"
               placeholder="Task name"
               onFocus={() => setFocused(true)}
               onBlur={() => setFocused(false)}
               onKeyUp={(e) => handleOnKeyUp(e, task.id, taskName)}
               value={taskName}
               onChange={(e) => setTaskName(e.target.value)}
               style={{ borderColor: focused ? "#011627" : "#e2e2e2" }}
            />
            {onAdd && (
               <Dialog.Close
                  className={styles.addButton}
                  onClick={() => handleAddTask(taskName)}
               >
                  Add
               </Dialog.Close>
            )}
            {onEdit && (
               <Dialog.Close
                  className={styles.addButton}
                  onClick={() => handleEditTask(task.id, taskName)}
               >
                  Save changes
               </Dialog.Close>
            )}
         </Dialog.Content>
      </Dialog.Portal>
   );
};
