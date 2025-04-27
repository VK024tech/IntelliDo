import React, { useEffect, useState, useContext, useRef } from "react";

import { WiStars } from "react-icons/wi";
import { LuRefreshCw } from "react-icons/lu";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaWandMagicSparkles } from "react-icons/fa6";

import axios from "axios";

import { TodoContext } from "../../contexts/TodoContext";

function Aiassist() {
  const iconColor = "#aeabb6";

  const { suggestedTask, setSuggestedTask } = useContext(TodoContext);
  const [refreshTasks, setRefreshTask] = useState(false);

  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      fetchSuggestions();
    }
  }, []);

  useEffect(() => {
    Suggestions();
  }, [suggestedTask]);

  async function RefreshToken() {
    const token = sessionStorage.getItem("currentSession");

    try {
      const response = await axios.get(
        "http://localhost:3200/auth/refreshToken",
        {
          headers: {
            token: token,
          },
        }
      );
      // console.log(response.data.message);
      if (response.data.message == "Successfull") {
        fetchSuggestions();
        console.log("successfull");
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

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
        "http://localhost:3200/todo/add",
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
        console.log("successfull");
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  async function fetchSuggestions() {
    const token = sessionStorage.getItem("currentSession");

    try {
      const response = await axios.get("http://localhost:3200/connect/gemini", {
        headers: {
          token: token,
        },
      });
      console.log(response.data);
      setSuggestedTask(response.data);
      hasMounted.current = true;
    } catch (error) {
      console.log(error.message);
      if (error.message == "Request failed with status code 500") {
        RefreshToken();
      }
    }
  }

  function Suggestions() {
    ///skeleton screen
    if (suggestedTask.length == 0) {
      return (
        <>
          <div className="flex flex-col gap-4">
            <div className="flex justify-around bg-gray-100 w-full max-w-[20rem] gap-2  p-2 py-4 rounded-xl border-1 border-gray-300">
              <div className="bg-gray-300 animate-pulse p-5 max-h-6 rounded-full"></div>
              <div className="mx-4 ">
                <div className="bg-gray-300 py-4  animate-pulse rounded-md"></div>

                <div className="flex justify-center  gap-6 mt-2">
                  <div className="bg-gray-300 px-12 py-5 rounded-md animate-pulse  "></div>
                  <div className="bg-gray-300 px-12 py-5 rounded-md animate-pulse  "></div>
                </div>
              </div>
            </div>
            <div className="flex justify-around bg-gray-100 w-full gap-2 max-w-[20rem]  p-2 py-4 rounded-xl border-1 border-gray-300">
              <div className="bg-gray-300 animate-pulse p-5 max-h-6 rounded-full"></div>
              <div className="ml-4 mr-4">
                <div className="bg-gray-300 py-4 animate-pulse rounded-md"></div>

                <div className="flex justify-center  gap-6 mt-2">
                  <div className="bg-gray-300 px-12 py-5 rounded-md animate-pulse  "></div>
                  <div className="bg-gray-300 px-12 py-5 rounded-md animate-pulse  "></div>
                </div>
              </div>
            </div>
            <div className="flex justify-around gap-2 bg-gray-100 w-full max-w-[20rem]  p-2 py-4 rounded-xl border-1 border-gray-300">
              <div className="bg-gray-300 animate-pulse p-5 max-h-6 rounded-full"></div>
              <div className="ml-4 mr-4">
                <div className="bg-gray-300 py-4 animate-pulse rounded-md"></div>

                <div className="flex justify-center  gap-6 mt-2">
                  <div className="bg-gray-300 px-12 py-5 rounded-md animate-pulse  "></div>
                  <div className="bg-gray-300 px-12 py-5 rounded-md animate-pulse  "></div>
                </div>
              </div>
            </div>
            <div className="flex justify-around gap-2 bg-gray-100 w-full max-w-[20rem]  p-2 py-4 rounded-xl border-1 border-gray-300">
              <div className="bg-gray-300 animate-pulse p-5 max-h-6 rounded-full"></div>
              <div className="ml-4 mr-4">
                <div className="bg-gray-300 py-4 animate-pulse rounded-md"></div>

                <div className="flex justify-center  gap-6 mt-2">
                  <div className="bg-gray-300 px-12 py-5 rounded-md animate-pulse  "></div>
                  <div className="bg-gray-300 px-12 py-5 rounded-md animate-pulse  "></div>
                </div>
              </div>
            </div>
            <div className="flex justify-around gap-2 bg-gray-100 w-full max-w-[20rem]  p-2 py-4 rounded-xl border-1 border-gray-300">
              <div className="bg-gray-300 animate-pulse p-5 max-h-6 rounded-full"></div>
              <div className="ml-4 mr-4">
                <div className="bg-gray-300 py-4 animate-pulse rounded-md"></div>

                <div className="flex justify-center  gap-6 mt-2">
                  <div className="bg-gray-300 px-12 py-5 rounded-md animate-pulse  "></div>
                  <div className="bg-gray-300 px-12 py-5 rounded-md animate-pulse  "></div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }

    return suggestedTask.map((current, index) => {
      return (
        <div
          key={index}
          className="flex justify-around bg-white w-full max-w-[20rem]  p-2 py-4 rounded-xl border-1 border-gray-300"
        >
          <FaWandMagicSparkles
            style={{ color: "#00BBA7" }}
            size={18}
            className="m-1  w-full "
          />

          <div className="ml-4 mr-4">
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

  return (
    <div className="bg-gray-100 max-w-fit w-full  overflow-y-auto h-dvh px-5 ml-auto  border-l-1 border-gray-300">
      <div className="font-semibold py-4 flex w-fit  items-center ">
        IntelliDo Suggestions
        <WiStars style={{ color: "#00BBA7" }} size={34} className="ml-1  " />
      </div>
      <div className="flex flex-col w-fit gap-5">
        {Suggestions()}
        <div className="mb-8 w-full invisible text-center">
          Dummy Suggestion
        </div>
        <div className="fixed pl-14 w-full  bottom-0 bg-gray-100 px-auto py-4 ">
          <div
            onClick={() => {
              hasMounted.current = false
              // setRefreshTask(!refreshTasks);
            }}
            className="flex justify-center  font-md text-gray-600 w-55   items-center bg-white p-2 cursor-pointer transition-colors  hover:text-teal-700  hover:border-teal-300 hover:border-t-2 rounded-xl border-t-1 border-gray-300"
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
