import React, { useContext, useEffect, useState, useRef } from "react";
import { IoAdd } from "react-icons/io5";
import { FiTag } from "react-icons/fi";
import { SlFlag } from "react-icons/sl";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineCalendarToday } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TodoContext } from "../../contexts/TodoContext";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsRobot } from "react-icons/bs";


function MainScreen() {
  console.log("mainscreen started");

  const iconColor = "#aeabb6";
  let taskIcon = "#adadad";
  let deleteEnter = false;
  const navigate = useNavigate();
  const { taskList, setTaskList } = useContext(TodoContext);
  const { clickedIndex, setClickedIndex } = useContext(TodoContext);

  const [taskCompleted, setTaskCompleted] = useState(false);
  const [updatedTaskList, setUpdatedTaskList] = useState(false);
  const [filterMethod, setFilterMethod] = useState("all");

  const { selectedCategory, setSelectedCategory } = useContext(TodoContext);

  const { dateBasedFilter, setDateBasedFilter } = useContext(TodoContext);

  const { suggestedTask, setSuggestedTask } = useContext(TodoContext);

  const { currentScreen, setCurrentScreen } = useContext(TodoContext);

  console.log(currentScreen);

  const firstFetch = useRef(false);

  //for detching task list form database on update of tasks

  if (!firstFetch) {
    FetchTaskList();
    firstFetch.current = true;
  }

  useEffect(() => {
    console.log("start");
    FetchTaskList();
    console.log("end");
  }, [updatedTaskList, suggestedTask]);

  //fetch task function to get the data form database
  async function FetchTaskList() {
    const token = sessionStorage.getItem("currentSession");
    if (!token) {
      navigate("/signin");
      return;
    }
    console.log("inside fetch");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/todo/todolist`,
        {
          headers: {
            token: token,
          },
        }
      );
      console.log("fetch done");
      console.log(response.data.todoList);

      if (response.data.message == "todoList fetched") {
        setTaskList(response.data.todoList);
      }
    } catch (error) {
      console.log(error);
    }
  }

  ///route for task deletion from database
  async function deleteTodo(id) {
    const token = sessionStorage.getItem("currentSession");
    if (!token) {
      alert("Something went Wrong, Please Sign in again!");
      return;
    }

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/todo/delete`,
        {
          headers: {
            token: token,
            todoid: id,
          },
        }
      );
      // console.log(response);
      if (response.data.message == "todoDeleted") {
        setUpdatedTaskList(!updatedTaskList);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //for updating task if it is completed or not
  async function isCompleteTask(id) {
    const token = sessionStorage.getItem("currentSession");

    //temp customcompleted value to use for sending todo status, as the usestate does not get updated immediately
    const curentValueCompleted = !taskCompleted;
    setTaskCompleted(!taskCompleted);

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/todo/update`,
        {
          completed: curentValueCompleted,
        },
        {
          headers: {
            token: token,
            todoid: id,
          },
        }
      );
      // console.log(response);
      if (response.data.message == "todoUpdated") {
        setUpdatedTaskList(!updatedTaskList);
      }
    } catch (error) {
      console.log(error);
    }
  }

  ///use effect to trigger render when taskcompleted changes without this first time render was not happening
  useEffect(() => {
    Tasks();
  }, [taskCompleted]);

  //all tasks render on screen with filtering logic for tasks
  function Tasks() {
    let dateFilter = [];

    const today = new Date().toLocaleDateString();

    if (dateBasedFilter !== "") {
      if (dateBasedFilter == "Today") {
        dateFilter = taskList.filter((curr) => {
          const dateTime = curr.creationDate;
          console.log("i;mmain" + dateTime);
          const newDateTime = new Date(dateTime);
          console.log("i;mmain" + newDateTime);

          return newDateTime.toLocaleDateString() === today;
        });
      } else if (dateBasedFilter == "Upcoming")
        dateFilter = taskList.filter((curr) => {
          const dateTime = curr.creationDate;
          const newDateTime = new Date(dateTime);

          return newDateTime.toLocaleDateString() > today;
        });
    } else {
      dateFilter = taskList;
    }

    let categoryTask = [];

    if (selectedCategory !== "") {
      categoryTask = dateFilter.filter(
        (curr) => curr.category == selectedCategory
      );
    } else {
      categoryTask = dateFilter;
    }

    let tasks = [];

    if (filterMethod !== "all") {
      if (filterMethod == "active") {
        tasks = categoryTask.filter((current) => current.completed == false);
      } else if (filterMethod == "completed") {
        tasks = categoryTask.filter((current) => current.completed == true);
      }
    } else {
      tasks = categoryTask;
    }

    return tasks.map((task, index) => {
      const dateTime = task.creationDate;
      const newDateTime = new Date(dateTime);

      const taskComplete = task.completed;

      function categoryEmoji(type) {
        const emojis = {
          Personal: "🏠",
          Health: "♥️",
          Learning: "📖",
          Work: "💼",
          Custom: "📝",
        };

        return emojis[type] || emojis["Custom"];
      }

      return (
        <div
          key={task._id}
          className="flex   flex-row  justify-between cursor-pointer bg-gray-50 md:bg-white  hover:bg-gray-100 rounded-md py-2 px-2 pr-3 my-1 items-center font-medium text-gray-700 mx-2 md:mx-6"
        >
          <div className="flex items-center  gap-2 md:gap-3">
            <div
              onClick={() => {
                isCompleteTask(task._id);
              }}
              className={`border-2 p-2 w-fit  h-fit rounded-2xl  ${
                taskComplete
                  ? "bg-gray-300 border-gray-300"
                  : "hover:bg-teal-100 border-teal-400"
              } `}
            ></div>
            <div
              onClick={() => {
                setClickedIndex(index);
                // navigate("/dashboard/edittask");
                setCurrentScreen("updateTask");
              }}
            >
              <div
                className={`${
                  taskComplete ? "line-through text-gray-400" : ""
                }  `}
              >
                {task.title}
              </div>
              <div className="flex gap-5  font-normal text-sm text-gray-500">
                <div
                  className={`flex gap-1 md:block ${
                    taskComplete ? "text-gray-400 " : " text-gray-700"
                  }`}
                >
                  <span>{categoryEmoji(task.category)}</span> {task.category}
                </div>
                <div
                  className={` text-center md:text-left ${
                    taskComplete ? "text-gray-400 " : " text-gray-700"
                  }`}
                >
                  <span>🗓️</span> {newDateTime.toLocaleString()}
                </div>
                <div
                  className={`bg-gray-50 h-fit rounded-xl px-2 ${
                    task.priority === "High"
                      ? "text-red-400"
                      : task.priority === "Medium"
                      ? "text-yellow-400"
                      : task.priority === "Low"
                      ? "text-green-400"
                      : ""
                  } ${taskComplete ? "text-gray-400 " : " text-gray-700"}`}
                >
                  {task.priority}
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            {/* <MdOutlineCalendarToday
              className="cursor-pointer rounded-md"
              style={{ color: taskIcon }}
              size={17}
            />
            <FiTag
              className="cursor-pointer"
              style={{ color: taskIcon }}
              size={17}
            />
            <SlFlag
              className="cursor-pointer"
              style={{ color: taskIcon }}
              size={17}
            /> */}
            <RiDeleteBin6Line
              onMouseEnter={() => {
                deleteEnter = true;
              }}
              onClick={() => {
                deleteTodo(task._id);
              }}
              className="cursor-pointer  "
              style={{ color: deleteEnter ? taskIcon : "#f5655b" }}
              size={17}
            />
          </div>
        </div>
      );
    });
  }

  const { burgerMenu, setBurgerMenu } = useContext(TodoContext);
  const { burgerMenuVisible, setBurgerMenuVisible } = useContext(TodoContext);

  const { sidebarBurger } = useContext(TodoContext);

  const { aiMenu, setAiMenu } = useContext(TodoContext);
    const { aiMenuVisible, setAiMenuVisible } = useContext(TodoContext);
  
    const { aiMenuBurger } = useContext(TodoContext);

  console.log("mainscreen ended");

  return (
    <div className="w-full h-dvh  py-0 md:py-3  ">
      <div className="font-bold text-xl px-2 md:px-6 text-center md:text-left flex items-center gap-4   text-gray-800 pt-0 md:pt-2 pb-2 md:pb-4 border-b-1 border-gray-300">
        <div
          onClick={() => {
            setBurgerMenu(!burgerMenu);
            sidebarBurger();
            console.log("hey");
          }}
          className={` ${
              window.innerWidth < 768 ? "block py-3 " : "hidden"
            }`}
        >
          <RxHamburgerMenu size={28} />
        </div>
        <span className="mr-auto">Tasks</span>
        <div
          onClick={() => {
            setAiMenu(!aiMenu);
            aiMenuBurger();
            console.log("hey");
          }}
          className="py-3"
        >
          <BsRobot className={` ${
              window.innerWidth < 768 ? "block mr-2 " : "hidden"
            }`} size={28} />
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-row items-center gap-2 font-semibold px-2 md:px-6 mt-2 md:mt-4">
          <div
            onClick={() => {
              setFilterMethod("all");
              // FetchTaskList();
            }}
            className={`transition-all p-1 border-1 cursor-pointer ${
              filterMethod == "all"
                ? " bg-teal-500  border-teal-500 text-white"
                : "bg-white border-gray-300 text-gray-700"
            }  round rounded-md px-3  `}
          >
            All
          </div>
          <div
            onClick={() => {
              setFilterMethod("active");
            }}
            className={` transition-all p-1 border-1  cursor-pointer  ${
              filterMethod == "active"
                ? " bg-teal-500  border-teal-500 text-white"
                : "bg-white border-gray-300 text-gray-700"
            }  round rounded-md px-3`}
          >
            Active
          </div>
          <div
            onClick={() => {
              setFilterMethod("completed");
            }}
            className={` transition-all p-1 border-1  cursor-pointer ${
              filterMethod == "completed"
                ? " bg-teal-500  border-teal-500 text-white"
                : "bg-white border-gray-300 text-gray-700"
            }  round rounded-md px-3`}
          >
            Completed
          </div>
        </div>
        <div
          onClick={() => {
            // navigate("/dashboard/newtask");
            setCurrentScreen("newTask");
          }}
          className="flex gap-2 mx-2 md:mx-6 transition-colors hover:border-teal-300 hover:bg-teal-100 rounded-md py-3 p-1 border-1 border-gray-300 text-gray-400"
        >
          <IoAdd
            className="cursor-pointer  rounded-sm "
            style={{ iconColor }}
            size={24}
          />
          New task...
        </div>
      </div>
      <div className="mt-3 overflow-y-auto h-max max-h-145 no-scrollbar  ">
        {Tasks()}
      </div>
    </div>
  );
}

export default MainScreen;
