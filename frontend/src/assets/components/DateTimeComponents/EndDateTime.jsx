import React, { useContext, useState } from "react";

import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import { Calendar } from "primereact/calendar";
import { TodoContext } from "../../../contexts/TodoContext";

function EndDateTime() {
  const { endDateTime, setEndDateTime } = useContext(TodoContext);

  return (
    <div className=" flex justify-center w-50  py-1 text-md pl-3 font-medium rounded-md border-1 border-gray-400 bg-gray-100 text-gray-800">
      <div className="card flex flex-wrap gap-3 p-fluid">
        <div className="flex-auto ">
          <Calendar
            id="calendar-12h"
            value={endDateTime}
            onChange={(e)=>{
              setEndDateTime(e.target.value)
    
            }}
            showTime
            hourFormat="12"
          />
        </div>
      </div>
    </div>
  );
}

export default EndDateTime;
