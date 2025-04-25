import { createContext, useState } from "react";

export const TodoContext = createContext();

export const TodoContextProvider = ({ children }) => {
  const [startDateTime, setStartDateTime] = useState();
  const [endDateTime, setEndDateTime] = useState();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Personal");
  const [priority, setPriority] = useState("low");
  const [subtasks, setSubtasks] = useState("");

  const [btnClikedTask, setBtnClikedTask] = useState(false);

  const [taskList, setTaskList] = useState([]);
  const [clickedIndex, setClickedIndex] = useState("");

  const [totalCategories, setTotalCategories] = useState([
      "Personal",
      "Work",
      "Health",
      "Learning",
    ]);

     const [selectedCategory, setSelectedCategory] = useState('')

       const [dateBasedFilter, setDateBasedFilter] = useState("");


  const contextValue = {
    startDateTime,
    setStartDateTime,
    endDateTime,
    setEndDateTime,
    title,
    setTitle,
    description,
    setDescription,
    category,
    setCategory,
    priority,
    setPriority,
    subtasks,
    setSubtasks,
    btnClikedTask,
    setBtnClikedTask,
    taskList,
    setTaskList,
    clickedIndex,
    setClickedIndex,
    totalCategories,
    setTotalCategories,
    selectedCategory,
    setSelectedCategory,
    dateBasedFilter,
    setDateBasedFilter
  };

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};
