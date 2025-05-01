import React, { useEffect, useState, useContext, useRef } from "react";

import { WiStars } from "react-icons/wi";
import { LuRefreshCw } from "react-icons/lu";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaWandMagicSparkles } from "react-icons/fa6";

import { IoClose } from "react-icons/io5";

import axios from "axios";

import { TodoContext } from "../../contexts/TodoContext";

function Aiassist() {
  const iconColor = "#aeabb6";

  const { suggestedTask, setSuggestedTask } = useContext(TodoContext);

  //for fetching suggestion only on intial render
  const hasMounted = useRef(false);

  //fetching suggestion on mount of component
  useEffect(() => {
    if (!hasMounted.current) {
      fetchSuggestions();
    }
  }, []);

  //updating ui on addition or removal of suggestion
  useEffect(() => {
    Suggestions();
  }, [suggestedTask]);

  //api call for updating token to be able use suggestion feature
  async function RefreshToken() {
    const token = sessionStorage.getItem("currentSession");

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/auth/refreshToken`,
        {
          headers: {
            token: token,
          },
        }
      );
      // console.log(response.data.message);
      if (response) {
        // console.log(response.data);
        return response.data;
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  ///adding suggested task to user task list in database
  async function AddTask(index) {
    const token = sessionStorage.getItem("currentSession");

    const curentDate = new Date().toLocaleDateString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/todo/add`,
        {
          title: suggestedTask[index].TaskName,
          priority: suggestedTask[index].Priority,
          completed: "false",
          creationDate: curentDate,
          // endDate: endDateTime,
          description: suggestedTask[index].Description,
          subtasks: suggestedTask[index].Subtasks,
          category: suggestedTask[index].Category,
        },
        {
          headers: {
            token: token,
          },
        }
      );
      // console.log(response.data.message);
      if (response.data.message == "Successfull") {
        const updatedTasks = suggestedTask.filter((current, i) => i !== index);
        setSuggestedTask(updatedTasks);
        // console.log("successfull");
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  //api route for fetching suggestion for task
  async function fetchSuggestions() {
    const token = sessionStorage.getItem("currentSession");

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/connect/gemini`,
        {
          headers: {
            token: token,
          },
        }
      );
      // console.log(response.data);
      setSuggestedTask(response.data);
      hasMounted.current = true;
    } catch (error) {
      console.log(error);
      if (error?.message == "Request failed with status code 500") {
        console.log("failed to load with 500, refreshing token ");
        const refreshed = await RefreshToken();
        // console.log(refreshed);
        if (refreshed) {
          console.log("retrying fetch");
          fetchSuggestions();
        } else {
          console.log("token refresh failed");
        }
      } else {
        console.log("error while fetching suggestions data");
      }
    }
  }

  //render each suggestions on screen
  function Suggestions() {
    ///skeleton screen
    if (suggestedTask.length == 0) {
      return (
        <>
          <div className="flex flex-col gap-4  m ">
            <div className="flex justify-around bg-gray-100 w-full max-w-[30rem] gap-4  p-2 py-4 rounded-xl border-1 border-gray-300">
              <div className="bg-gray-300 animate-pulse p-5 max-h-6 rounded-full"></div>
              <div className="mx-4 ">
                <div className="bg-gray-300 py-4  animate-pulse rounded-md"></div>

                <div className="flex justify-center gap-2 md:gap-8 mt-2">
                  <div className="bg-gray-300 px-13 py-5 rounded-md animate-pulse  "></div>
                  <div className="bg-gray-300 px-12 py-5 rounded-md animate-pulse  "></div>
                </div>
              </div>
            </div>
            <div className="flex justify-around bg-gray-100 w-full max-w-[30rem] gap-4 p-2  py-4 rounded-xl border-1 border-gray-300">
              <div className="bg-gray-300 animate-pulse p-5 max-h-6 rounded-full"></div>
              <div className="ml-4 mr-4">
                <div className="bg-gray-300 py-4 animate-pulse rounded-md"></div>

                <div className="flex justify-center  gap-8 mt-2">
                  <div className="bg-gray-300 px-13 py-5 rounded-md animate-pulse  "></div>
                  <div className="bg-gray-300 px-12 py-5 rounded-md animate-pulse  "></div>
                </div>
              </div>
            </div>
            <div className="flex justify-around gap-2 bg-gray-100 w-full max-w-[30rem] p-2 py-4 rounded-xl border-1 border-gray-300">
              <div className="bg-gray-300 animate-pulse p-5 max-h-6 rounded-full"></div>
              <div className="ml-4 mr-4">
                <div className="bg-gray-300 py-4 animate-pulse rounded-md"></div>

                <div className="flex justify-center  gap-8 mt-2">
                  <div className="bg-gray-300 px-13 py-5 rounded-md animate-pulse  "></div>
                  <div className="bg-gray-300 px-12 py-5 rounded-md animate-pulse  "></div>
                </div>
              </div>
            </div>
            <div className="flex justify-around gap-2 bg-gray-100 w-full max-w-[30rem] p-2  py-4 rounded-xl border-1 border-gray-300">
              <div className="bg-gray-300 animate-pulse p-5 max-h-6 rounded-full"></div>
              <div className="ml-4 mr-4">
                <div className="bg-gray-300 py-4 animate-pulse rounded-md"></div>

                <div className="flex justify-center  gap-8 mt-2">
                  <div className="bg-gray-300 px-13 py-5 rounded-md animate-pulse  "></div>
                  <div className="bg-gray-300 px-12 py-5 rounded-md animate-pulse  "></div>
                </div>
              </div>
            </div>
            
          </div>
        </>
      );
    }

    function lastMargin(index){
      if(index==suggestedTask.length-1){
        return ('mb-30')
      }
    }

    return suggestedTask.map((current, index) => {
      return (
        <div
          key={index}
          className={`flex justify-around ${lastMargin(index)} md:pl-2 mx-1 md:mx-0 no-scrollbar bg-white w-fit md:w-full max-w-[25rem] p-2 md:p-2 py-4 rounded-xl border-1 border-gray-300`}
        >
          <FaWandMagicSparkles
            style={{ color: "#00BBA7" }}
            size={18}
            className="m-1  w-full "
          />

          <div className={`ml-4 mr-4 } `}>
            {/* suggest fsdbdf gs  gdwvsdcd  cwevwvwev */}
            {current.TaskName}
            <div className="flex justify-center gap-6 mt-2">
              <div
                onClick={() => {
                  AddTask(index);
                }}
                className="flex  flex-row cursor-pointer transition-colors  hover:shadow-md/30  shadow-teal-200 border-1 rounded-md w-max p-1 px-3 justify-center border-teal-500 text-teal-600 "
              >
                <IoIosAddCircleOutline
                  className="mr-2"
                  style={{ color: "#00BBA7" }}
                  size={24}
                />
                Add
              </div>
              <div
                onClick={() => {
                  const updatedTasks = suggestedTask.filter(
                    (current, i) => i !== index
                  );
                  setSuggestedTask(updatedTasks);
                }}
                className="flex mr-4 flex-row cursor-pointer transition-colors hover:shadow-md/30  shadow-red-200 hover:text-red-400 hover:border-red-400 border-1 rounded-md w-max p-1 px-3 justify-center border-gray-500 text-gray-500"
              >
                Dismiss
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  const { burgerMenu, setBurgerMenu } = useContext(TodoContext);

  const { sidebarBurger } = useContext(TodoContext);

  const { aiMenu, setAiMenu } = useContext(TodoContext);
  const { aiMenuVisible, setAiMenuVisible } = useContext(TodoContext);

  const { aiMenuBurger } = useContext(TodoContext);

  return (
    <div
      className={`bg-gray-100 max-w-fit w-full  ${
        window.innerWidth < 768 ? aiMenuVisible : "translate-x-0 static"
      }  fixed md:static transition-transform transform  duration-500  h-dvh px-2 md:px-5 ml-auto  border-l-1 border-gray-300`}
    >
      <div className="font-semibold py-4 flex w-fit justify-between   items-center ">
        <div className="flex items-center ">
          IntelliDo Suggestions
          <WiStars
            style={{ color: "#00BBA7" }}
            size={34}
            className={`ml-1 ${
              window.innerWidth > 768 ? "visible" : "invisible"
            } `}
          />
        </div>
        <div
          onClick={() => {
            setAiMenu(!aiMenu);
            aiMenuBurger();
            // console.log("hey");
          }}
        >
          <IoClose
            className={` ml-20 ${
              window.innerWidth < 768 ? "visible" : "invisible"
            }`}
            size={28}
          />
        </div>
      </div>
      <div className="flex flex-col w-fit h-fit overflow-y-auto no-scrollbar   gap-5">
        {Suggestions()}
        {/* <div className="mb-8 w-full invisible text-center">
          Dummy Suggestion
        </div> */}
        <div className="fixed pl-14 w-fit  bottom-0 bg-gray-100 px-auto py-4 ">
          <div
            onClick={() => {
              hasMounted.current = false;
              fetchSuggestions();
              setSuggestedTask([]);
              // setRefreshTask(!refreshTasks);
            }}
            className="flex justify-center  font-md text-gray-600 w-fit  items-center bg-white p-2 cursor-pointer transition-colors  hover:text-teal-700  hover:border-teal-300 hover:border-t-2 rounded-xl border-t-1 border-gray-300"
          >
            <LuRefreshCw
              style={{ color: "#00BBA7" }}
              size={22}
              className="mr-3 "
            />
            Refresh Suggestions
          </div>
        </div>
      </div>
    </div>
  );
}

export default Aiassist;
