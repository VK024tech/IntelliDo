import { createContext, useRef, useState } from "react";

export const TodoContext = createContext();

export const TodoContextProvider = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState("main");
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


  const getUserInput = () => {
    setPromptOpen(true);
    return new Promise((resolve, reject) => {
      resolveRef.current = resolve;
      rejectRef.current = reject;
    });
  };


  const [burgerMenu, setBurgerMenu] = useState(false);
  const [burgerMenuVisible, setBurgerMenuVisible] = useState(window.innerWidth<768 ?"-translate-x-80": "translate-x-0");



  function sidebarBurger() {
    if (burgerMenu) {
      setBurgerMenuVisible("translate-x-0");
    } else {
      setBurgerMenuVisible("-translate-x-80");
    }
  }

  const [aiMenu, setAiMenu] = useState(false);
  const [aiMenuVisible, setAiMenuVisible] = useState("translate-x-100");

  function aiMenuBurger() {
    if (aiMenu) {
      return (setAiMenuVisible("translate-x-0"))
    } else {
      return (setAiMenuVisible("translate-x-100"))
    }
  }

  const contextValue = {

    setAiMenuVisible,
    aiMenuVisible,
    aiMenuBurger,
    setAiMenu,
    aiMenu,
    sidebarBurger,
    setBurgerMenuVisible,
    burgerMenuVisible,
    setBurgerMenu,
    burgerMenu,
    currentScreen,
    setCurrentScreen,
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
  };

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};
