import { createContext, useRef, useState } from "react";

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

  const [selectedCategory, setSelectedCategory] = useState("");

  const [dateBasedFilter, setDateBasedFilter] = useState("");

  const [promptOpen, setPromptOpen] = useState(false);

  const [promptValue, setPromptvalue] = useState("");
  const [promptPromise, setPromptPromise] = useState();

  const [suggestedTask, setSuggestedTask] = useState([]);

  const resolveRef = useRef(null);
  const rejectRef = useRef(null);

   const [currentScreen, setCurrentScreen] = useState("main");

  const getUserInput = () => {
    setPromptOpen(true);
    return new Promise((resolve, reject) => {
      resolveRef.current = resolve;
      rejectRef.current = reject;
    });
  };

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
    setDateBasedFilter,
    promptOpen,
    setPromptOpen,
    promptValue,
    setPromptvalue,
    promptPromise,
    setPromptPromise,
    getUserInput,
    resolveRef,
    suggestedTask,
    setSuggestedTask,
    currentScreen,
    setCurrentScreen
  };

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};
