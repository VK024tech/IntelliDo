import React, { useContext, useEffect } from "react";
import StartDateTime from "./DateTimeComponents/StartDateTime";
import EndDateTime from "./DateTimeComponents/EndDateTime";

function NewTask() {
  console.log();
  return (
    <div className="w-screen h-dvh ">
      <div className="flex flex-col h-dvh justify-center items-center ">
        <div className="h-full w-full min-h-fit min-w-fit bg-white px-8 rounded-2xl border border-gray-200 py-8">
          <div className="text-xl font-semibold">Task:</div>
          <div className=" py-4 border-b border-gray-300">
            <input
              className=" outline-none  w-full h-full placeholder:font-medium"
              type="text"
              placeholder="Task tittle"
            />
          </div>
          <div className=" py-4 pb-1 border-b border-gray-300">
            <textarea
              className="outline-none field-sizing-content min-h-[100px]  w-full h-full placeholder:font-medium"
              type="text"
              placeholder="Description"
            />
          </div>
          <div className="max-w-150 w-full">
            <div className=" flex   py-4 pb-1 text-md font-medium text-gray-700 border-b border-gray-300">
              <div className="py-1 pl-0 px-1">Category</div>
              <select
                className="ml-auto  pr-4 hover:bg-gray-200 rounded-md py-1 px-1"
                name="Category"
                id="Category"
              >
                <option value="Personal">Personal</option>
                <option value="Health">Health</option>
                <option value="Study">Study</option>
              </select>
            </div>
            <div className=" flex   py-4 pb-1 text-md font-medium text-gray-700 border-b border-gray-300">
              <div className="py-1 pl-0 px-1">Priority</div>
              <select
                className="ml-auto  pr-4 hover:bg-gray-200 rounded-md py-1 px-1"
                name="Priority"
                id="Priority"
              >
                <option value="High">High</option>
                <option value="Mid">Mid</option>
                <option value="Low">Low</option>
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
                className="outline-none field-sizing-content min-h-[50px] w-full h-full placeholder:font-medium"
                type="text"
                placeholder="Break task into smaller parts"
              />
            </div>
          </div>
        </div>
          <div className="flex gap-8 my-4 justify-end self-end mx-4">
            <div className="bg-gray-100 text-sm self-center hover:bg-red-300 hover:border-red-400 transition  w-fit h-auto   px-6 border border-gray-200 rounded-xl py-3  font-semibold text-gray-700">
              Discard
            </div>
            <div className="bg-teal-300 text-sm self-center hover:bg-teal-400 border border-teal-300 hover:border-teal-800  transition  w-fit  px-6  rounded-xl py-3 font-semibold text-gray-800">
              Create Task
            </div>
          </div>
      </div>
    </div>
  );
}

export default NewTask;
