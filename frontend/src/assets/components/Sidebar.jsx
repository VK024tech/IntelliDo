import React, { useState } from "react";
import { IoAdd, IoBookOutline, IoCalendarNumberOutline } from "react-icons/io5";
import { LuHouse } from "react-icons/lu";
import { BsSuitcaseLg } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { MdDoubleArrow } from "react-icons/md";

function Sidebar() {
  const iconColor = "#aeabb6";

  const [projects, setProjects] = useState([]);

  function Menu() {
    return (
      <>
        <div className="pl-2 pb-6">
          <div>
            <div className="cursor-pointer hover:bg-gray-200 rounded-xl text-gray-700 flex flex-row items-center  px-3 py-2">
              <IoCalendarNumberOutline
                style={{ iconColor }}
                size={18}
                className="mr-2 "
              />
              Today
            </div>
            <div className="cursor-pointer hover:bg-gray-200 rounded-xl text-gray-700 flex flex-row items-center  px-3 py-2">
              <MdDoubleArrow
                style={{ iconColor }}
                size={20}
                className="mr-2 "
              />
              Upcoming
            </div>
          </div>
        </div>
      </>
    );
  }
  function Projects() {
    return (
      <>
        <div className="pl-2">
          <div className="text-gray-700 pb-1  font-semibold flex flex-row items-center justify-between">
            Category
            <IoAdd
              className="cursor-pointer hover:bg-gray-200 rounded-sm "
              style={{ iconColor }}
              size={24}
            />
          </div>
          <div>
            <div className=" cursor-pointer hover:bg-gray-200 rounded-xl text-gray-700  flex flex-row items-center px-3 py-2">
              <LuHouse
                style={{ color: "#039BE5" }}
                size={18}
                className="mr-2 "
              />
              Personal
            </div>
            <div className="cursor-pointer hover:bg-gray-200 rounded-xl text-gray-700 flex flex-row items-center  px-3 py-2">
              <BsSuitcaseLg
                style={{ color: "#FB8C00" }}
                size={18}
                className="mr-2 "
              />
              Work
            </div>
            <div className="cursor-pointer hover:bg-gray-200 rounded-xl text-gray-700 flex flex-row items-center  px-3 py-2">
              <IoBookOutline
                style={{ color: "#4CAF50" }}
                size={18}
                className="mr-2 "
              />
              Learning
            </div>
            <div className="cursor-pointer hover:bg-gray-200 rounded-xl text-gray-700 flex flex-row items-center  px-3 py-2">
              <FaRegHeart
                style={{ color: "#F44336" }}
                size={18}
                className="mr-2 "
              />
              Health
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="bg-gray-100 max-w-[16rem] w-full h-dvh px-3  border-r-1 border-gray-300">
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="text-2xl py-2 pb-8 font-bold text-gray-900">
            Intelli<span className="text-teal-500">Do</span>
            <div className="text-xs  border-b pb-2  border-gray-300">
              The Smarter way to do!
            </div>
          </div>
          {Menu()}
          {Projects()}
        </div>

        <div className="cursor-pointer  bg-white rounded-xl transition-colors  hover:text-teal-700  hover:border-teal-300 hover:border-t-2 text-gray-700 flex flex-row items-center border-t-1 border-gray-300 p-3 mb-4 pl-0 ">
          <IoAdd className="mr-2 " style={{ iconColor }} size={24} />
          Create Category
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
