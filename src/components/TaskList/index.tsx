import styles from "./styles.module.scss";
import { PencilSimpleLine, TrashSimple } from "@phosphor-icons/react";
import { useContext } from "react";
import { TasksContext } from "../../contexts/TasksContext";
import * as Dialog from "@radix-ui/react-dialog";
import { TaskModal } from "../TaskModal";
import { Todo } from "../../types/Todo";

type Props = {
   tasksData: Todo[];
};

export const TaskList = ({ tasksData }: Props) => {
   const { getTasks, deleteTask, editChecked } = useContext(TasksContext);

   const handleDeleteTask = (taskId: number, task: Todo) => {
      task.checked = false;
      deleteTask(taskId);
      getTasks();
   };

   const handleChecked = async (
      taskId: number,
      taskName: string,
      taskChecked: boolean
   ) => {
      editChecked(taskId, taskName, taskChecked);
   };

   return (
      <div className={styles.scrollList}>
         <table>
            <tbody>
               {tasksData.map((task) => (
                  <tr className={styles.tableRow} key={task.id}>
                     <td className={styles.tableData}>
                        <input
                           type="checkbox"
                           id={task.id.toString()}
                           name={task.description}
                           className={styles.checkboxInput}
                           checked={task.checked}
                           onChange={() =>
                              handleChecked(
                                 task.id,
                                 task.description,
                                 task.checked
                              )
                           }
                        />
                        <label htmlFor={task.id.toString()}>
                           {task.description}
                        </label>
                     </td>
                     <td className={styles.tableIcons}>
                        <Dialog.Root>
                           <Dialog.Trigger className={styles.editTrigger}>
                              <div className={styles.tableEdit}>
                                 <PencilSimpleLine size={24} />
                              </div>
                           </Dialog.Trigger>

                           <TaskModal title="UPDATE TASK" task={task} onEdit />
                        </Dialog.Root>
                        <div
                           className={styles.tableDelete}
                           onClick={() => handleDeleteTask(task.id, task)}
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
