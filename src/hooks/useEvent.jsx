import { createContext, useContext, useState, useEffect } from "react";

const EventContext = createContext();

export const EventProvider = ({children})=>{

    const [events, setEvents] = useState([]);

    const defaultEvents = [
        { id: Math.random(), event: "Project Kickoff", date: "2025-02-03", status: "Backlog" },
        { id: Math.random(), event: "Team Meeting", date: "2025-02-05", status: "In Progress" },
        { id: Math.random(), event: "Submit Report", date: "2025-02-07", status: "General Information" },
        { id: Math.random(), event: "Client Call", date: "2025-02-09", status: "Backlog" },
        { id: Math.random(), event: "Code Review", date: "2025-02-12", status: "In Progress" },
        { id: Math.random(), event: "Sprint Planning", date: "2025-02-15", status: "Paused" },
        { id: Math.random(), event: "Final Submission", date: "2025-02-20", status: "Backlog" },
        { id: Math.random(), event: "Follow-up Email", date: "2025-02-22", status: "In Progress" },
        { id: Math.random(), event: "Design Review", date: "2025-02-25", status: "General Information" },
        { id: Math.random(), event: "Quarterly Meeting", date: "2025-02-28", status: "Paused" }
      ];

    useEffect(()=>{
        const storedEvents = JSON.parse(localStorage.getItem("events")) || [];

        if (!storedEvents || storedEvents.length === 0) {
            localStorage.setItem("events", JSON.stringify(defaultEvents));
            setEvents(defaultEvents);
          } else {
            setEvents(storedEvents);
        }
    },[])


    const addEvent = (newEvent)=>{
        console.log(newEvent);       
        setEvents((prevEvents)=>{
            const updatedEventList = [...prevEvents,newEvent];
            localStorage.setItem("events",JSON.stringify(updatedEventList))
            return updatedEventList ;
        })
    }

    const deleteEvent = (id) => {
        setEvents((prevEvents) => {
          const updatedEvents = prevEvents.filter((event) => event.id !== id);
          localStorage.setItem("events", JSON.stringify(updatedEvents));
          return updatedEvents;
        });
      };
    
    const editEvent = (updatedEvent) => {
    setEvents((prevEvents) => {
        const updatedEvents = prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
        );
        localStorage.setItem("events", JSON.stringify(updatedEvents));
        return updatedEvents;
    });
    };

    const getEventsForDate = (date)=>{
        const targetDate = date.toISOString().split("T")[0];

        return events.map((event)=> event.date === targetDate)
    }

    return (
        <EventContext.Provider 
            value={{events , addEvent, editEvent, deleteEvent, getEventsForDate}}
        > {children} </EventContext.Provider>
    )
}

export const useEvent = () => {
    return useContext(EventContext)
};