import React, { useContext, useEffect, useState } from "react";
import { IoAdd, IoBookOutline, IoCalendarNumberOutline } from "react-icons/io5";
import { LuHouse } from "react-icons/lu";
import { BsSuitcaseLg } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { MdDoubleArrow } from "react-icons/md";
import { WiMoonAltNew } from "react-icons/wi";
import { RiDeleteBin6Line } from "react-icons/ri";

import axios from "axios";
import { TodoContext } from "../../contexts/TodoContext";
import UserPrompt from "./Popups/UserPrompt";

function Sidebar() {
  const iconColor = "#aeabb6";

  const { totalCategories, setTotalCategories } = useContext(TodoContext);

  const { selectedCategory, setSelectedCategory } = useContext(TodoContext);
  const { dateBasedFilter, setDateBasedFilter } = useContext(TodoContext);

  const { promptOpen, setPromptOpen } = useContext(TodoContext);
  const { promptValue, setPromptvalue } = useContext(TodoContext);

  //promise for await on user input prompt
  const { getUserInput } = useContext(TodoContext);

  useEffect(() => {
    fetchAllCategories();
  }, []);

  async function fetchAllCategories() {
    const token = sessionStorage.getItem("currentSession");
    if (!token) {
      return navigate("/signin");
    }

    try {
      const response = await axios.get(
        "http://localhost:3200/user/allcategories",

        {
          headers: {
            token: token,
          },
        }
      );
      // console.log(response.data.todoList);
      if (response.data.message == "categories fetched") {
        setTotalCategories(response.data.allCategories);
        // console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function addNewCategory() {
    let CategoryName = "";

    try {
      CategoryName = await getUserInput();
    } catch (error) {
      console.log(error);
    }

    if (!CategoryName || CategoryName.trim() == "") {
      console.log("Cancel");
      return;
    }

    setTotalCategories([...totalCategories, CategoryName]);

    const token = sessionStorage.getItem("currentSession");
    if (!token) {
      return navigate("/signin");
    }

    try {
      const response = await axios.post(
        "http://localhost:3200/user/addcategory",
        {
          totalCategories: [...totalCategories, CategoryName],
        },
        {
          headers: {
            token: token,
          },
        }
      );
      // console.log(response.data.todoList);
      if (response.data.message == "Successfull created category") {
        console.log("done");
      }

      fetchAllCategories();
    } catch (error) {
      console.log(error);
    }
  }

  function Menu() {
    return (
      <>
        <div className="pl-2 pb-6">
          <div>
            <div
              onClick={() => {
                if (dateBasedFilter !== "Today") {
                  setDateBasedFilter("Today");
                  console.log(dateBasedFilter);
                } else {
                  setDateBasedFilter("");
                  console.log(dateBasedFilter);
                }
              }}
              className={`cursor-pointer transition  rounded-xl ${
                dateBasedFilter == "Today"
                  ? "bg-teal-500 text-white "
                  : "hover:bg-gray-200"
              }  text-gray-700 flex flex-row items-center  px-3 py-2`}
            >
              <IoCalendarNumberOutline
                style={{ iconColor }}
                size={18}
                className="mr-2 "
              />
              Today
            </div>
            <div
              onClick={() => {
                if (dateBasedFilter !== "Upcoming") {
                  setDateBasedFilter("Upcoming");
                  console.log(dateBasedFilter);
                } else {
                  setDateBasedFilter("");
                  console.log(dateBasedFilter);
                }
              }}
              className={`cursor-pointer transition  rounded-xl ${
                dateBasedFilter == "Upcoming"
                  ? "bg-teal-500 text-white "
                  : "hover:bg-gray-200"
              }  text-gray-700 flex flex-row items-center  px-3 py-2`}
            >
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

  function DynamicCategoryArray() {
    const categoryIcons = {
      Work: (
        <BsSuitcaseLg
          style={{ color: `${selectedCategory == "Work" ? "" : "#FB8C00"}` }}
          size={18}
          className="mr-2 "
        />
      ),
      Personal: (
        <LuHouse
          style={{
            color: `${selectedCategory == "Personal" ? "" : "#039BE5"}`,
          }}
          size={18}
          className="mr-2 "
        />
      ),
      Learning: (
        <IoBookOutline
          style={{
            color: `${selectedCategory == "Learning" ? "" : "#4CAF50"}`,
          }}
          size={18}
          className="mr-2 "
        />
      ),
      Health: (
        <FaRegHeart
          style={{ color: `${selectedCategory == "Health" ? "" : "#F44336"}` }}
          size={18}
          className="mr-2 "
        />
      ),
      Custom: (
        <WiMoonAltNew
          style={{
            color: `${
              selectedCategory == "Health" ||
              selectedCategory == "Learning" ||
              selectedCategory == "Personal" ||
              selectedCategory == "work"
                ? ""
                : "#fffff"
            }`,
          }}
          size={18}
          className="mr-2 "
        />
      ),
    };

    return totalCategories.map((category, index) => {
      return (
        <div
          key={category}
          className={`cursor-pointer transition  rounded-xl text-gray-700 ${
            selectedCategory == category
              ? "bg-teal-500 text-white "
              : "hover:bg-gray-200"
          }  flex flex-row items-center px-3 py-2 justify-between`}
        >
          <div
            onClick={() => {
              if (selectedCategory !== category) {
                setSelectedCategory(category);
                console.log(selectedCategory);
              } else {
                setSelectedCategory("");
                console.log(selectedCategory);
              }
            }}
            key={category}
            className=" flex flex-row items-center w-full"
          >
            {categoryIcons[category] || categoryIcons["Custom"]}
            {category}
          </div>
          {/* <div>
            <RiDeleteBin6Line
              onClick={() => {
                deleteTodo(task._id);
              }}
              className={`  rounded-xl text-gray-700 ${
                selectedCategory == category ? "text-red-400  bg-red-300  " : "hidden "
              }   `}
              size={17}
            />
          </div> */}
        </div>
      );
    });
  }

  function category() {
    return (
      <>
        <div className="pl-2  ">
          <div className="text-gray-700 pb-1   font-semibold flex flex-row items-center justify-between">
            Category
            {/* <IoAdd
              className="cursor-pointer hover:bg-gray-200 rounded-sm "
              style={{ iconColor }}
              size={24}
            /> */}
          </div>

          {DynamicCategoryArray()}
        </div>
      </>
    );
  }

  return (
    <div className="bg-gray-100 max-w-[16rem] w-full h-dvh px-3   border-r-1 border-gray-300">
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="text-2xl py-2 pb-8 font-bold text-gray-900">
            Intelli<span className="text-teal-500">Do</span>
            <div className="text-xs  border-b pb-2  border-gray-300">
              The Smarter way to do!
            </div>
          </div>
          {Menu()}
          {category()}
        </div>

        <div
          onClick={() => {
            addNewCategory();
          }}
          className="cursor-pointer  bg-white rounded-xl transition-colors  hover:text-teal-700  hover:border-teal-300 hover:border-t-2 text-gray-700 flex flex-row items-center border-t-1 border-gray-300 p-3 mb-4 pl-0 "
        >
          <IoAdd className="mx-4 mr-2 " style={{ iconColor }} size={24} />
          Create Category
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
