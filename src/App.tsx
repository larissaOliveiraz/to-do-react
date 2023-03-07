import { TasksProvider } from "./contexts/TasksContext";
import { Todo } from "./pages/Todo";
import "./styles/global.scss";

function App() {
   return (
      <>
         <TasksProvider>
            <Todo />
         </TasksProvider>
      </>
   );
}

export default App;
