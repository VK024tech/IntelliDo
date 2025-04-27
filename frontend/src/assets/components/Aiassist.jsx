import React, { useEffect, useState, useContext } from "react";

import { WiStars } from "react-icons/wi";
import { LuRefreshCw } from "react-icons/lu";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaWandMagicSparkles } from "react-icons/fa6";

import axios from "axios";

import { TodoContext } from "../../contexts/TodoContext";

function Aiassist() {
  const iconColor = "#aeabb6";

  const {suggestedTask, setSuggestedTask} = useContext(TodoContext);

  useEffect(() => {
    setSuggestedTask([
      {
        Category: "Work",
        Description: "Merged pull request #153 into main branch.",
        Priority: "High",
        Subtasks:
          "Review pull request, resolve conflicts, merge changes, verify merge.",
        TaskName: "Merge PR #153",
      },
      {
        Category: "Learning",
        Description:
          "Notification about first post on Coursera Support & Community, specifically an Icebreaker post.",
        Priority: "Normal",
        Subtasks: "View post in Coursera Support & Community",
        TaskName: "First post notification - Icebreaker",
      },
      {
        Category: "Work",
        Description:
          "Rejection email for Effect Department position at Polygon Pictures Malaysia.",
        Priority: "Medium",
        Subtasks:
          "Acknowledge receipt, inform closure, keep materials for future openings, provide website and social media links.",
        TaskName: "Process job application response",
      },
      {
        Category: "Work",
        Description:
          "Email correspondence regarding job application for Fx Artist position.",
        Priority: "Normal",
        Subtasks:
          "Review candidate profile and CV, determine next steps in the hiring process.",
        TaskName: "Process Vivek's job application",
      },
      {
        Category: "Work",
        Description:
          "Instructions on how to join Tom Hougaard's Telegram trading channels and receive free trading resources.",
        Priority: "High",
        Subtasks:
          "Contact @TomHougaard on Telegram with the message 'Please join TraderTom Telegram Channels'. Await welcome messages for channel access, free price action course info, and free signal software.",
        TaskName: "Join TraderTom Telegram Channels",
      },
      {
        Category: "Work",
        Description: "Rejection email from Mega Cat Studios",
        Priority: "High",
        Subtasks: "Acknowledge receipt, update job search tracker",
        TaskName: "Respond to Mega Cat Studios rejection email",
      },
      {
        Category: "Work",
        Description: "Update scripts for Maya 2025 and announce a sale.",
        Priority: "High",
        Subtasks:
          "Update scripts, test in Maya 2025, create sale announcement, distribute announcement.",
        TaskName: "Maya 2025 Scripts Update and Sale",
      },
      {
        Category: "Work",
        Description:
          "Pitch music directly to an Award-Winning Music Supervisor Pamela Liptak on Saturday, April 27, 2024, at 10 AM Pacific Time. The deadline to sign up is Friday, April 26, 2024, at 11:59 PM Pacific Time. Cost is $99 U.S.",
        Priority: "High",
        Subtasks: "Sign up for the pitching session by the deadline.",
        TaskName: "TEAM Pitching Session",
      },
      {
        Category: "Work",
        Description:
          "Information regarding tax regime selection for the financial year 2024-25 on the ESS portal.",
        Priority: "Medium",
        Subtasks:
          "Select tax regime (Old/New) on ESS portal between April 1st and April 20th, 2024. Understand the implications of each tax regime before making a selection.",
        TaskName: "Tax Regime Selection for FY 2024-25",
      },
      {
        Category: "Work",
        Description:
          "Attend the TEAM Mastermind session demonstrating the Checkerboard A/B Workflow System.",
        Priority: "High",
        Subtasks: "Join the Zoom meeting at 1 PM Pacific Time.",
        TaskName: "Attend TEAM Mastermind Session",
      },
      {
        Category: "Work",
        Description:
          "Consider joining the TEAM Essentials subscription service.",
        Priority: "Medium",
        Subtasks: "Review the benefits and pricing of the subscription.",
        TaskName: "Evaluate TEAM Essentials Subscription",
      },
      {
        Category: "Work",
        Description:
          "Fill out the TEAM Survey to share information about my music career goals.",
        Priority: "Medium",
        Subtasks: "Access and complete the survey form.",
        TaskName: "Complete TEAM Survey",
      },
      {
        Category: "Work",
        Description: "New job alert for visual effects artist in Bengaluru",
        Priority: "High",
        Subtasks: "Apply with resume & profile",
        TaskName: "Visual Effects Artist Job",
      },
      {
        Category: "Learning",
        Description:
          "Learn key lessons from the Melodic Techno track 'Metro' by Kevin de Vries and Mau P.",
        Priority: "High",
        Subtasks:
          "Watch the YouTube video, analyze the low end, melodies, layering, LFO, ride, and hat suppressor techniques.",
        TaskName: "Analyze 'Metro' by Kevin de Vries and Mau P",
      },
      {
        Category: "Learning",
        Description:
          "Explore Complete Melodic Techno Start to Finish Academy Vol.2 for sounds and techniques.",
        Priority: "Medium",
        Subtasks:
          "Check out the course program, sample pack, Serum presets, and MIDI files available.",
        TaskName: "Explore Melodic Techno Academy Vol.2",
      },
      {
        Category: "Work",
        Description:
          "Consider upgrading to the Everything Bundle Year 2024 or Collector's Edition 2024.",
        Priority: "Low",
        Subtasks:
          "Log into user account to check for custom discount upgrade code.",
        TaskName: "Evaluate Everything Bundle 2024",
      },
      {
        Category: "Learning",
        Description:
          "Review Ableton Beginner’s Guide for music production guidance.",
        Priority: "Medium",
        Subtasks:
          "Check out the Ableton Beginner’s Guide on the Production Music Live website.",
        TaskName: "Review Ableton Beginner's Guide",
      },
      {
        Category: "Learning",
        Description:
          "Explore Production Music Live's Online Courses for music production.",
        Priority: "Medium",
        Subtasks:
          "Check out the available Start To Finish, self-paced Online Courses on the website.",
        TaskName: "Explore PML Online Courses",
      },
    ]);
  }, []);

  // useEffect(() => {
  //   fetchSuggestions();
  // }, []);

  useEffect(() => {
    Suggestions();
  }, [suggestedTask]);

  async function AddTask(index) {
    const token = sessionStorage.getItem("currentSession");

    const curentDate = new Date().toLocaleDateString('en-US',{hour:'numeric', minute: 'numeric',second: 'numeric', hour12: true})
 
    
  

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
    } catch (error) {
      console.log(error);
    }
  }

  function Suggestions() {
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
              onClick={()=>{
                const updatedTasks = suggestedTask.filter((current, i) => i !== index);
                setSuggestedTask(updatedTasks);
              }}
              className="flex mr-4 flex-row cursor-pointer transition-colors hover:shadow-md/30  shadow-red-200 hover:text-red-400 hover:border-red-400 border-1 rounded-md w-max p-1 px-3 justify-center border-gray-500 text-gray-500">
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
        {/* <div className="mb-24">{Suggestions()}</div> */}
        <div className="fixed bottom-0 bg-gray-100 px-16.5 py-4 ">
          <div className="flex justify-center font-md text-gray-600   items-center bg-white p-2 cursor-pointer transition-colors  hover:text-teal-700  hover:border-teal-300 hover:border-t-2 rounded-xl border-t-1 border-gray-300">
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
