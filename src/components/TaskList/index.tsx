import styles from "./styles.module.scss";
import { PencilSimpleLine, TrashSimple } from "@phosphor-icons/react";
import { useContext, useEffect, useState } from "react";
import { TasksContext } from "../../contexts/TasksContext";
import * as Dialog from "@radix-ui/react-dialog";
import { TaskModal } from "../TaskModal";
import { Todo } from "../../types/Todo";
import { Tasks } from "../../utils/Tasks";

export const TaskList = () => {
   const { tasks, getTasks, deleteTask, editTask, selectTask } =
      useContext(TasksContext);
   const [isOpen, setIsOpen] = useState(false);

   const handleChecked = async (taskId: number, task: Todo) => {
      editTask(taskId, { ...task, checked: !task.checked });
   };

   useEffect(() => {
      getTasks();
   }, [Tasks]);

   return (
      <div className={styles.scrollList}>
         <table>
            <tbody>
               {tasks.map((task) => (
                  <tr key={task.id} className={`${styles.tableRow} row`}>
                     <td
                        className={styles.tableData}
                        onClick={() => selectTask(task)}
                     >
                        <input
                           type="checkbox"
                           id={task.id.toString()}
                           name={task.description}
                           className={styles.checkboxInput}
                           checked={task.checked}
                           onChange={() => handleChecked(task.id, task)}
                        />
                        <label htmlFor={task.id.toString()}>
                           {task.description}
                        </label>
                     </td>
                     <td className={styles.tableIcons}>
                        <Dialog.Root open={isOpen}>
                           <Dialog.Trigger
                              className={styles.editTrigger}
                              onClick={() => {
                                 setIsOpen(true);
                                 selectTask(task);
                              }}
                           >
                              <div className={styles.tableEdit}>
                                 <PencilSimpleLine size={24} />
                              </div>
                           </Dialog.Trigger>

                           <TaskModal
                              title="UPDATE TASK"
                              onEdit
                              setIsOpen={setIsOpen}
                           />
                        </Dialog.Root>
                        <div
                           className={styles.tableDelete}
                           onClick={() => deleteTask(task.id)}
                        >
                           <TrashSimple size={24} />
                        </div>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};
