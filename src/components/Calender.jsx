import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { useEvent } from "../hooks/useEvent";

export const Calender = ()=>{

    const [showDays , setShowDays] = useState(false)
    const [showMonth , setShowMonths] = useState(true)
    const [showWeeks , setShowWeeks] = useState(false)
    
    const {events} = useEvent();

    return (
        <>
            <div className="flex flex-col gap-8 mx-20">
              <div className="text-2xl sm:text-3xl pb-1 font-semibold flex  items-center">
                <h1 className="text-3xl sm:text-xl"></h1>
              </div>
              <nav >
                  <div className="border rounded-xl w-fit p-1 text-sm bg-gray-100">
                      <ul className="flex flex-row gap-2 ">
                        <button 
                            onClick={()=>{setShowDays(false) , setShowMonths(true) ,  setShowWeeks(false)}}
                            className="border px-2 py-1 rounded-xl bg-white">month
                        </button>
                        <button 
                            onClick={()=>{setShowDays(false) , setShowMonths(false) ,  setShowWeeks(true)}}
                            className="border px-2 py-1 rounded-xl bg-white ">Week
                        </button>
                        <button
                            onClick={()=>{setShowDays(true) ,setShowMonths(false) , setShowWeeks(false)}}
                            className="border px-2 py-1 rounded-xl bg-white">Day
                        </button>
                      </ul>
                  </div>
                </nav>
                {showDays ? <DayCalendar events={events}/> : <></>}
                {showMonth ? <MonthCalendar events={events}/> : <></>}
                {showWeeks? <WeekCalendar events={events}/> : <></>}
            </div>
        </>
    )
}

function DayCalendar({ events }) {
    const timeSlots = [
      "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00",
      "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
      "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00"
    ];
  
    return (
      <div className="border rounded-xl px-4 py-2 mb-6">
        <h1 className="text-xl text-gray-600 border-b font-bold mb-6">{new Date().toDateString(0)}</h1>
        <ul>
          {timeSlots.map((timeInst) => {

            const eventsForTime = events.filter((todo) => todo?.time?.substring(0, 2) === timeInst.substring(0, 2) && todo.date === new Date().toISOString().split('T')[0]);
            const StatusClass = {
                "Paused" : "bg-red-300",
                "In Progress": "bg-yellow-300",
                "General Information" : "bg-green-300",
                "Backlog" : "bg-violet-400"
            }
  
            return (
              <div key={timeInst} className="flex items-start gap-10 mb-4 ">
                <li className="text-gray-600 w-24 border-t ">
                  <span className="ml-14">{timeInst}</span>
                </li>
  
                <div className="ml-6 flex-grow h-20 ">
                  {
                  eventsForTime.length > 0 ? (
                    eventsForTime.map((todo, index) => (
                      <div key={index} className={`${StatusClass [todo.status]} text-gray-600 border rounded-lg text-sm p-2 h-full bg-red-200`}>
                        {todo.todo} : {todo.description}
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-400">No tasks</div>
                  )}
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }

function WeekCalendar({events}){

    const StatusClass = {
        "Paused" : "bg-red-300",
        "In Progress": "bg-yellow-300",
        "General Information" : "bg-green-300",
        "Backlog" : "bg-violet-400"
    }

    const today = new Date();
    const dayOfWeek = today.getDay(); 
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek);
  
    const daysArray = [];
  

    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(startOfWeek);
      currentDay.setDate(startOfWeek.getDate() + i);
      daysArray.push({
        date: currentDay.getDate(),
        fullDate: currentDay.toISOString().split('T')[0], 
        dayName: currentDay.toLocaleDateString('en-US', { weekday: 'long' })
      });
    }

    const getEventsForDay = (date) => {
        return events.filter((todo) => todo?.date === date); 
    };

    return(
        <div className="border rounded-xl px-4 py-2 mb-6">
            <h1 className="text-xl text-gray-600 font-bold border-b"> Week of {daysArray[0].fullDate} to {daysArray[6].fullDate}</h1>
            <ul>
                {daysArray.map((day, index) => {
                const eventsForDay = getEventsForDay(day.fullDate);
                return (
                    <div key={index} className="border-b p-2 h-32">
                    <div className="font-bold text-gray-600">{day.dayName}</div>
                    <div className="text-gray-400">{day.date}</div>
                    <div>
                        {eventsForDay.length > 0 ? (
                        eventsForDay.map((todo, index) => (
                            <div key={index} className={`${StatusClass[todo.status]} text-sm mt-1 p-1 rounded bg-red-200`}>
                            {todo.event} : {todo.description}
                            </div>
                        ))
                        ) : (
                        <div className="text-gray-400 text-xs">No tasks</div>
                        )}
                    </div>
                    </div>
                );
                })}
        </ul>
        </div>
    )
}

function MonthCalendar({ events }) {
    const today = new Date();
    const currentMonth = today.getMonth();  
    const currentYear = today.getFullYear(); 
  
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
    const daysArray = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(""); 
    }
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }
  
 
    const getEventsForDay = (day) => {
      const dateStr = `${currentYear}-${(currentMonth + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
      return events.filter((todo) => todo?.date === dateStr);
    };

    const StatusClass = {
        "Paused" : "bg-red-300",
        "In Progress": "bg-yellow-300",
        "General Information" : "bg-green-300",
        "Backlog" : "bg-violet-400"
    }
  
    return (
      <div className="border rounded-xl px-4 py-2 mb-6">
        <h1 className="text-xl text-gray-600 font-bold mb-6 border-b">
          {today.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </h1>
        <div className="grid grid-cols-7 gap-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="font-bold">{day}</div>
          ))}
          {daysArray.map((day, index) => {
            const todosForDay = getEventsForDay(day);
            return (
              <div key={index} className="  p-2 h-32">
                <div className="text-gray-600">{day ? day : ""}</div>
                <div>
                  {day && todosForDay.length > 0 ? (
                    todosForDay.map((todo, index) => (
                      <div key={index} className={`${StatusClass[todo.status]} text-[10px] mt-1 p-1 rounded bg-red-200`}>
                        {todo.event}
                      </div>
                    ))
                  ) : day ? (
                    <div className="text-gray-400 text-xs">No task</div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }