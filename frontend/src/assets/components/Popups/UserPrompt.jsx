import { Button } from "primereact/button";
import React, { useContext, useState } from "react";
import { TodoContext } from "../../../contexts/TodoContext";

function UserPrompt() {
  const { promptValue, setPromptvalue } = useContext(TodoContext);
  const { promptOpen, setPromptOpen } = useContext(TodoContext);
  const { resolveRef, rejectRef } = useContext(TodoContext);
  

  return (
    <div className={`fixed inset-0 z-50 w-dvw   h-dvh   bg-gray-400/20 backdrop-blur-sm`}>
      <div className={`bg-white w-full md:w-fit h-fit -translate-x-8   text-gray-800 gap-4 rounded-4xl flex flex-col mx-8 md:mx-auto mt-[18%] p-7 pl-4  `}>
        <div className="font-semibold text-xl cursor-default">
          Category name
        </div>
        <input
          onChange={(e) => {
            setPromptvalue(e.target.value);
          }}
          value={promptValue}
          className=" bg-gray-100 p-2 rounded-md   placeholder:font-medium md:pr-50"
          type="text"
          placeholder="Type the category name"
        />

        <div className="flex flex-row gap-4 justify-center">
          <div
            onClick={() => {
             
              setPromptvalue("");
              setPromptOpen(false);
              resolveRef.current(null)
            }}
            className="m-4 p-2 border-1 cursor-pointer hover:bg-red-300 border-gray-400 rounded-md px-4  "
          >
            Cancel
          </div>
          <div
            onClick={() => {
              setPromptOpen(false);
              resolveRef.current(promptValue)
            }}
            className="m-4 text-white  bg-teal-300 border-1  cursor-pointer border-teal-300 p-2 rounded-md px-4  "
          >
            Create
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPrompt;
