import React, { useContext, useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { FiTag } from "react-icons/fi";
import { SlFlag } from "react-icons/sl";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineCalendarToday } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TodoContext } from "../../contexts/TodoContext";

function MainScreen() {
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

  useEffect(() => {
    FetchTaskList();
  }, [updatedTaskList]);

  async function FetchTaskList() {
    const token = sessionStorage.getItem("currentSession");
    if (!token) {
      navigate("/signin");
      return;
    }

    try {
      const response = await axios.get("http://localhost:3200/todo/todolist", {
        headers: {
          token: token,
        },
      });
      // console.log(response.data.todoList);
      if (response.data.message == "todoList fetched") {
        setTaskList(response.data.todoList);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteTodo(id) {
    if (confirm("Are you sure?")) {
      const token = sessionStorage.getItem("currentSession");
      if (!token) {
        alert("Something went Wrong, Please Sign in again!");
        return;
      }

      try {
        const response = await axios.delete(
          "http://localhost:3200/todo/delete",
          {
            headers: {
              token: token,
              todoid: id,
            },
          }
        );
        // console.log(response);
        if (response.data.message == "todoDeleted") {
          setUpdatedTaskList(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function isCompleteTask(id) {
    const token = sessionStorage.getItem("currentSession");

    if (taskCompleted) {
      setTaskCompleted(false);
    } else {
      setTaskCompleted(true);
    }

    try {
      const response = await axios.put(
        "http://localhost:3200/todo/update",
        {
          completed: taskCompleted,
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
        if (updatedTaskList) {
          setUpdatedTaskList(false);
        } else {
          setUpdatedTaskList(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  function Tasks() {
    let dateFilter = [];

    const today = new Date().toLocaleDateString();

    if (dateBasedFilter !== "") {
      if (dateBasedFilter == "Today") {
        dateFilter = taskList.filter((curr) => {
          const dateTime = curr.creationDate;
          const newDateTime = new Date(dateTime);

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
          className="flex flex-row overflow-y-auto justify-between cursor-pointer  hover:bg-gray-100 rounded-md py-2 px-2 pr-3 my-1 items-center font-medium text-gray-700 mx-6"
        >
          <div className="flex items-center  gap-3">
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
                navigate("/dashboard/edittask");
              }}
            >
              <div
                className={`${
                  taskComplete ? "line-through text-gray-400" : ""
                }  `}
              >
                {task.title}
              </div>
              <div className="flex gap-5 font-normal text-sm text-gray-500">
                <div
                  className={`${
                    taskComplete ? "text-gray-400 " : " text-gray-700"
                  }`}
                >
                  <span>{categoryEmoji(task.category)}</span> {task.category}
                </div>
                <div
                  className={`${
                    taskComplete ? "text-gray-400 " : " text-gray-700"
                  }`}
                >
                  <span>🗓️</span> {newDateTime.toLocaleString()}
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
              className="cursor-pointer "
              style={{ color: deleteEnter ? taskIcon : "#f5655b" }}
              size={17}
            />
          </div>
        </div>
      );
    });
  }

  return (
    <div className="w-full h-dvh   py-3 ">
      <div className="font-bold text-xl px-6  text-gray-800 pt-2 pb-4 border-b-1 border-gray-300">
        Tasks
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-row items-center gap-2 font-semibold px-6 mt-4">
          <div
            onClick={() => {
              setFilterMethod("all");
              // FetchTaskList();
            }}
            className={`transition-all p-1 border-1 ${
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
            className={` transition-all p-1 border-1  ${
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
            className={` transition-all p-1 border-1  ${
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
            navigate("/dashboard/newtask");
          }}
          className="flex gap-2 mx-6 transition-colors hover:border-teal-300 hover:bg-teal-100 rounded-md py-3 p-1 border-1 border-gray-300 text-gray-400"
        >
          <IoAdd
            className="cursor-pointer  rounded-sm "
            style={{ iconColor }}
            size={24}
          />
          New task...
        </div>
      </div>
      <div className="mt-3">{Tasks()}</div>
    </div>
  );
}

export default MainScreen;
