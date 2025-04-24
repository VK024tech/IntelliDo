import React, { useContext, useEffect } from "react";
import StartDateTime from "./DateTimeComponents/StartDateTime";
import EndDateTime from "./DateTimeComponents/EndDateTime";

function NewTask() {
  return (
    <div className="w-screen h-dvh ">
      <div className="flex flex-col h-dvh justify-center items-center">
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
              className="outline-none field-sizing-content  w-full h-full placeholder:font-medium"
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
              className="outline-none field-sizing-content  w-full h-full placeholder:font-medium"
              type="text"
              placeholder="Break task into smaller parts"
            />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewTask;
