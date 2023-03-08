import { X } from "@phosphor-icons/react";
import * as Dialog from "@radix-ui/react-dialog";
import { KeyboardEvent, useContext, useEffect, useState } from "react";
import { TasksContext } from "../../contexts/TasksContext";
import { Todo } from "../../types/Todo";
import styles from "./styles.module.scss";

type Props = {
   title: string;
   setIsOpen: (open: boolean) => void;
   onAdd?: boolean;
   onEdit?: boolean;
};

export const TaskModal = ({ title, setIsOpen, onAdd, onEdit }: Props) => {
   const { currentTask, addTask, editTask, getTasks } =
      useContext(TasksContext);

   const [taskName, setTaskName] = useState("");
   const [focused, setFocused] = useState(true);
   const [close, setClose] = useState(false);

   const initialState = {
      id: 1,
      description: "",
      checked: false,
   };
   const [task, setTask] = useState<Todo>(initialState);

   const handleInputChange = (currentInput: string) => {
      setTaskName(currentInput);
      setTask({ ...task, description: currentInput });
   };

   const handleAddTask = () => {
      addTask(task);
      setTask(initialState);
      setTaskName("");
   };

   const handleEditTask = (taskId: number, task: Todo) => {
      editTask(taskId, task);
      setTaskName("");
      setIsOpen(false);
   };

   const handleOnKeyUp = (
      e: KeyboardEvent<HTMLInputElement>,
      taskId: number,
      task: Todo
   ) => {
      if (onAdd) {
         if (e.code === "Enter") {
            handleAddTask();
         }
      }
      if (onEdit) {
         if (e.code === "Enter") {
            handleEditTask(taskId, task);
            setIsOpen(false);
         }
      }
   };

   onEdit &&
      useEffect(() => {
         setTask(currentTask);
      }, [currentTask]);

   return (
      <Dialog.Portal>
         <Dialog.Overlay
            className={styles.dialogOverlay}
            style={{ opacity: onEdit ? 0.5 : 1 }}
         />
         <Dialog.Content className={styles.dialogContent}>
            <div className={styles.dialogHeader}>
               <Dialog.Title className={styles.dialogTitle}>
                  {title}
               </Dialog.Title>
               <Dialog.Close
                  className={styles.dialogClose}
                  onClick={() => onEdit && setIsOpen(false)}
               >
                  <X size={24} weight="bold" />
               </Dialog.Close>
            </div>

            <input
               type="text"
               id="input"
               name="description"
               placeholder="Task name"
               autoFocus
               onFocus={() => setFocused(true)}
               onBlur={() => setFocused(false)}
               onKeyUp={(e) => handleOnKeyUp(e, task.id, task)}
               value={taskName}
               onChange={(e) => handleInputChange(e.target.value)}
               style={{ borderColor: focused ? "#011627" : "#e2e2e2" }}
            />
            {onAdd && (
               <Dialog.Close
                  className={styles.addButton}
                  onClick={() => handleAddTask()}
               >
                  Add
               </Dialog.Close>
            )}
            {onEdit && (
               <Dialog.Close
                  className={styles.addButton}
                  onClick={() => handleEditTask(task.id, task)}
               >
                  Save changes
               </Dialog.Close>
            )}
         </Dialog.Content>
      </Dialog.Portal>
   );
};
