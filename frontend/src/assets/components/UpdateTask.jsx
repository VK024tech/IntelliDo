import React, { useContext, useEffect, useState } from "react";
import StartDateTime from "./DateTimeComponents/StartDateTime";
import EndDateTime from "./DateTimeComponents/EndDateTime";
import { TodoContext } from "../../contexts/TodoContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { MdErrorOutline } from "react-icons/md";
const errorColor = "#f24949";

function UpdateTask() {
  const navigate = useNavigate();

  const { btnClikedTask, setBtnClikedTask } = useContext(TodoContext);

  const { startDateTime, setStartDateTime } = useContext(TodoContext);
  const { endDateTime, setEndDateTime } = useContext(TodoContext);

  const { clickedIndex, setClickedIndex } = useContext(TodoContext);
  const { taskList, setTaskList } = useContext(TodoContext);

  const { totalCategories, setTotalCategories } = useContext(TodoContext);

  // console.log(taskList[clickedIndex]);
  const currentTaskUpdate = taskList[clickedIndex];
  const [currentTitle, setCurrentTitle] = useState(currentTaskUpdate.title);
  const [currentDescription, setCurrentDescription] = useState(
    currentTaskUpdate.description
  );
  const [currentCategory, setCurrentCategory] = useState(
    currentTaskUpdate.category
  );
  const [currentPriority, setCurrentPriority] = useState(
    currentTaskUpdate.priority
  );
  const [currentSubTasks, setCurrentSubTasks] = useState(
    currentTaskUpdate.subtasks
  );
  const [currentCompleted, setCurrentCompleted] = useState(
    currentTaskUpdate.completed
  );

  const { currentScreen, setCurrentScreen } = useContext(TodoContext);

  function taskTittleAndDes() {
    return (
      <>
        <div className=" py-4 border-b flex border-gray-300">
          <input
            value={currentTitle}
            onChange={(e) => {
              setCurrentTitle(e.target.value);
              setBtnClikedTask(false);
            }}
            className=" outline-none  w-full h-full placeholder:font-medium"
            type="text"
            placeholder="Task title"
          />
          {!currentTitle && btnClikedTask && (
            <MdErrorOutline style={{ color: errorColor }} size={24} />
          )}
        </div>
        <div className=" py-4 pb-1 border-b  flex border-gray-300">
          <textarea
            className="outline-none field-sizing-content min-h-[100px]  w-full h-full placeholder:font-medium"
            type="text"
            value={currentDescription}
            onChange={(e) => {
              setCurrentDescription(e.target.value);
              setBtnClikedTask(false);
            }}
            placeholder="Description"
          />
          {!currentDescription && btnClikedTask && (
            <MdErrorOutline style={{ color: errorColor }} size={24} />
          )}
        </div>
      </>
    );
  }

  //update of task and saving it in database
  async function TaskUpdateExisting() {
    if (!currentTitle || !currentDescription) {
      return;
    }

    const token = sessionStorage.getItem("currentSession");

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/todo/update`,
        {
          title: currentTitle,
          priority: currentPriority,
          completed: currentCompleted,
          // creationDate: startDateTime,
          // endDate: endDateTime,
          description: currentDescription,
          subtasks: currentSubTasks,
          category: currentCategory,
        },
        {
          headers: {
            token: token,
            todoid: currentTaskUpdate._id,
          },
        }
      );
      console.log(response);
      if (response.data.message == "todoUpdated") {
        // navigate("/dashboard");
        setCurrentScreen('main')
        setBtnClikedTask(false);
      }
    } catch (error) {
      console.log(error.response);
    }
  }

  
  return (
    <div className="w-screen h-dvh overflow-y-auto ">
      <div className="flex flex-col h-dvh justify-center items-center ">
        <div className="h-full w-full min-h-fit min-w-fit bg-white px-4 rounded-2xl pb-2 py-2  md:py-8">
          <div className="font-bold text-xl   text-gray-800  pb-1 border-b-1 border-gray-300">
            Edit task
          </div>
          {taskTittleAndDes()}

          <div className="max-w-150 w-full">
            <div className=" flex   py-4 pb-1 text-md font-medium text-gray-700 border-b border-gray-300">
              <div className="py-1 pl-0 px-1">Category</div>
              <select
                className="ml-auto  pr-4 hover:bg-gray-200 rounded-md py-1 px-1"
                name="Category"
                id="Category"
                value={currentCategory}
                onChange={(e) => {
                  setCurrentCategory(e.target.value);
                }}
              >
                {totalCategories.map((element) => (
                  <option key={element} value={element}>
                    {element}
                  </option>
                ))}
              </select>
            </div>
            <div className=" flex   py-4 pb-1 text-md font-medium text-gray-700 border-b border-gray-300">
              <div className="py-1 pl-0 px-1">Priority</div>
              <select
                value={currentPriority}
                onChange={(e) => {
                  setCurrentPriority(e.target.value);
                }}
                className="ml-auto  pr-4 hover:bg-gray-200 rounded-md py-1 px-1"
                name="Priority"
                id="Priority"
              >
                <option value="Low">Low</option>
                <option value="Medium">Mid</option>
                <option value="High">High</option>
              </select>
            </div>
            {/* <div className=" flex justify-center items-center  py-2 pb-1 text-md font-medium text-gray-700 border-b border-gray-300">
              <div className="py-1 pl-0 px-1">Start date & time</div>
              <div className="ml-auto mr-2 ">
                <StartDateTime />
              </div>
            </div>
            <div className=" flex   py-2 pb-1 text-md font-medium text-gray-700 border-b border-gray-300">
              <div className="py-1 pl-0 px-1">End date & time</div>
              <div className="ml-auto mr-2 ">
                <EndDateTime />
              </div>
            </div> */}
          </div>
          <div className="mt-4">
            <div className="text-xl font-semibold">Subtasks:</div>
            <div className=" py-4 border-b border-gray-300">
              <textarea
                value={currentSubTasks}
                onChange={(e) => {
                  setCurrentSubTasks(e.target.value);
                }}
                className="outline-none field-sizing-content min-h-[150px] w-full h-full placeholder:font-medium"
                type="text"
                placeholder="Break task into smaller parts"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-4 mb-4  justify-end self-end  mx-4">
          <div
            onClick={() => {
              setBtnClikedTask(false);
              // navigate("/dashboard");
              setCurrentScreen('main')
            }}
            className="bg-gray-100 text-sm self-center cursor-pointer hover:bg-red-300 hover:border-red-400 transition  w-fit h-auto   px-6 border border-gray-200 rounded-xl py-3  font-semibold text-gray-700"
          >
            Discard
          </div>
          <div
            onClick={() => {
              setBtnClikedTask(true);
              TaskUpdateExisting();
            }}
            className="bg-teal-300 text-sm self-center cursor-pointer hover:bg-teal-400 border border-teal-300 hover:border-teal-800  transition  w-fit  px-6  rounded-xl py-3 font-semibold text-gray-800"
          >
            Update task
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateTask;
