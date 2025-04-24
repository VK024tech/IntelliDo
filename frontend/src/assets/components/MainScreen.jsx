import React from "react";
import { IoAdd } from "react-icons/io5";
import { FiTag } from "react-icons/fi";
import { SlFlag } from "react-icons/sl";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineCalendarToday } from "react-icons/md";

function MainScreen() {
  const iconColor = "#aeabb6";
  const taskIcon = "#adadad";

  function Tasks() {
    return (
      <div className="flex flex-row  justify-between cursor-pointer  hover:bg-gray-100 rounded-md py-2 px-2 pr-3 my-1 items-center font-medium text-gray-700 mx-6">
        <div className="flex items-center gap-3">
          <div className="border-2 p-2 w-fit hover:bg-teal-100 h-fit rounded-2xl border-teal-400 "></div>
          <div>
            Complete project proporsal
            <div className="flex gap-2 font-normal text-sm text-gray-500">
              <div>
                <span>💼</span> work
              </div>
              <div>
                <span>🗓️</span> Today
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <MdOutlineCalendarToday
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
          />
          <RiDeleteBin6Line
            className="cursor-pointer"
            style={{ color: taskIcon }}
            size={17}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-dvh   py-3 ">
      <div className="font-bold text-xl px-6  text-gray-800 pt-2 pb-4 border-b-1 border-gray-300">
        Tasks
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-row items-center gap-2 font-semibold px-6 mt-4 text-white">
          <div className="p-1 border-1 border-teal-500  bg-teal-500 round rounded-md px-3 ">
            All
          </div>
          <div className="p-1 border-1 border-gray-300 text-gray-700  round rounded-md px-3 ">
            Active
          </div>
          <div className="p-1 border-1 border-gray-300 text-gray-700  round rounded-md px-3 ">
            Completed
          </div>
        </div>
        <div className="flex gap-2 mx-6 transition-colors hover:border-teal-300 hover:bg-teal-100 rounded-md py-3 p-1 border-1 border-gray-300 text-gray-400">
          <IoAdd
            className="cursor-pointer  rounded-sm "
            style={{ iconColor }}
            size={24}
          />
          Add a task....
        </div>
      </div>
      <div className="mt-3">
        {Tasks()}
        {Tasks()}
      </div>
    </div>
  );
}

export default MainScreen;
