import React, { useContext, useEffect, useState } from "react";
import StartDateTime from "./DateTimeComponents/StartDateTime";
import EndDateTime from "./DateTimeComponents/EndDateTime";
import { TodoContext } from "../../contexts/TodoContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { MdErrorOutline } from "react-icons/md";
const errorColor = "#f24949";

function NewTask() {
  const navigate = useNavigate();

  const { title, setTitle } = useContext(TodoContext);
  const { description, setDescription } = useContext(TodoContext);
  const { category, setCategory } = useContext(TodoContext);
  const { priority, setPriority } = useContext(TodoContext);
  const { subtasks, setSubtasks } = useContext(TodoContext);

  const { btnClikedTask, setBtnClikedTask } = useContext(TodoContext);

  const { startDateTime, setStartDateTime } = useContext(TodoContext);
  const { endDateTime, setEndDateTime } = useContext(TodoContext);

  function taskTittleAndDes() {
    return (
      <>
        <div className=" py-4 border-b flex border-gray-300">
          <input
            onChange={(e) => {
              setTitle(e.target.value);
              setBtnClikedTask(false);
            }}
            className=" outline-none  w-full h-full placeholder:font-medium"
            type="text"
            placeholder="Task title"
          />
          {!title && btnClikedTask && (
            <MdErrorOutline style={{ color: errorColor }} size={24} />
          )}
        </div>
        <div className=" py-4 pb-1 border-b  flex border-gray-300">
          <textarea
            className="outline-none field-sizing-content min-h-[100px]  w-full h-full placeholder:font-medium"
            type="text"
            onChange={(e) => {
              setDescription(e.target.value);
              setBtnClikedTask(false);
            }}
            placeholder="Description"
          />
          {!description && btnClikedTask && (
            <MdErrorOutline style={{ color: errorColor }} size={24} />
          )}
        </div>
      </>
    );
  }

  async function TaskCreateNew() {
    if (!title || !description) {
      return;
    }

    const token = sessionStorage.getItem("currentSession");

    try {
      const response = await axios.post(
        "http://localhost:3200/todo/add",
        {
          title: title,
          priority: priority,
          completed: "false",
          creationDate: startDateTime,
          endDate: endDateTime,
          description: description,
          subtasks: subtasks,
          category: category,
        },
        {
          headers: {
            token: token,
          },
        }
      );
      // console.log(response.data.message);
      if (response.data.message == "Successfull") {
        setCategory('Personal')
        setDescription('')
        setEndDateTime('')
        setPriority('Low')
        setStartDateTime('')
        setSubtasks('')
        setTitle('')
        navigate("/dashboard");
        setBtnClikedTask(false)
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  return (
    <div className="w-screen h-dvh overflow-y-auto ">
      <div className="flex flex-col h-dvh justify-center items-center ">
        <div className="h-full w-full min-h-fit min-w-fit bg-white px-4 rounded-2xl pb-2   py-8">
          <div className="font-bold text-xl   text-gray-800  pb-1 border-b-1 border-gray-300">
            New task
          </div>
          {taskTittleAndDes()}

          <div className="max-w-150 w-full">
            <div className=" flex   py-4 pb-1 text-md font-medium text-gray-700 border-b border-gray-300">
              <div className="py-1 pl-0 px-1">Category</div>
              <select
                className="ml-auto  pr-4 hover:bg-gray-200 rounded-md py-1 px-1"
                name="Category"
                id="Category"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                <option value="Personal">Personal</option>
                <option value="Health">Health</option>
                <option value="Study">Study</option>
              </select>
            </div>
            <div className=" flex   py-4 pb-1 text-md font-medium text-gray-700 border-b border-gray-300">
              <div className="py-1 pl-0 px-1">Priority</div>
              <select
                onChange={(e) => {
                  setPriority(e.target.value);
                }}
                className="ml-auto  pr-4 hover:bg-gray-200 rounded-md py-1 px-1"
                name="Priority"
                id="Priority"
              >
                <option value="Low">Low</option>
                <option value="Mid">Mid</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className=" flex justify-center items-center  py-2 pb-1 text-md font-medium text-gray-700 border-b border-gray-300">
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
            </div>
          </div>
          <div className="mt-4">
            <div className="text-xl font-semibold">Subtasks:</div>
            <div className=" py-4 border-b border-gray-300">
              <textarea
                onChange={(e) => {
                  setSubtasks(e.target.value);
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
              setBtnClikedTask(false)
              navigate("/dashboard");
            }}
            className="bg-gray-100 text-sm self-center cursor-pointer hover:bg-red-300 hover:border-red-400 transition  w-fit h-auto   px-6 border border-gray-200 rounded-xl py-3  font-semibold text-gray-700"
          >
            Discard
          </div>
          <div
            onClick={() => {
              setBtnClikedTask(true);
              TaskCreateNew();
              
            }}
            className="bg-teal-300 text-sm self-center cursor-pointer hover:bg-teal-400 border border-teal-300 hover:border-teal-800  transition  w-fit  px-6  rounded-xl py-3 font-semibold text-gray-800"
          >
            Create Task
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewTask;
