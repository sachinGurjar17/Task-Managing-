import { useState } from "react"
import toast from "react-hot-toast";
import { useEvent } from "../hooks/useEvent";

function Taskform(){

    function getTodayDate() {
        const today = new Date();
        return today.toISOString().split('T')[0];  
    }

    const {addEvent} = useEvent();

    const [event , setEvent] = useState("");
    const [description , setDescription] = useState("");
    const [fromTime , setFromTime] = useState("");
    const [toTime , setToTime] = useState("");
    const [status , setStatus] = useState("Backlog");
    const [date , setDate] = useState(getTodayDate());


    const handleSubmit = (e)=>{
        e.preventDefault();      

        addEvent({
            id:Math.random(),
            event:event,
            description:description,
            fromTime:fromTime,
            toTime:toTime,
            status:status,
            date:date,
        })
        
        toast.success('event Successfully added!')
        
    }
    return(
        <>
            <div>
            <div className="bg-gray-50 m-2 p-4 border rounded-3xl flex flex-col gap-4 font-[500] text-[14px] text-gray-600">
                    <form onSubmit={handleSubmit}  className="flex flex-col gap-4 p-2 text-gray-600">
                        <div className="text-center text-2xl">Add task</div>
                    <input
                        type="text"
                        required
                        placeholder="Title of work"
                        className="w-full border-2 rounded-lg px-3 outline-none duration-150 bg-white/20 py-2"
                        value={event}
                        onChange={(e) => setEvent(e.target.value)}
                    />
                    
                    <textarea
                        className="w-full h-24 px-2 py-1.5 bg-gray-100 border-2 rounded-lg "
                        placeholder="Description"
                        value = {description}
                        onChange={(e)=> setDescription(e.target.value)}
                    ></textarea>

                    <div className="flex flex-col gap-3">
                        <div className="grid grid-cols-2 justify-between">
                            <h1>Status</h1>
                            <select 
                                required
                                value={status}
                                onChange={(e)=>setStatus(e.target.value)}
                                name="status" id="status" className=" p-1 bg-gray-100 border rounded-lg w-full">
                                <option value="Backlog">Backlog</option>
                                <option value="General Information">General Information</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Paused">Paused</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 justify-between">
                            <h1>Due Date</h1>
                            <input
                                required
                                value={date}
                                onChange={(e)=>setDate(e.target.value)}
                                className=" bg-gray-100 border rouned-lg rounded-lg p-1 w-full"
                                type="date" />
                        </div>

                        <div className="grid grid-cols-2 justify-between">
                            <h1>From</h1>
                            <input
                                value={fromTime}
                                onChange={(e)=>setFromTime(e.target.value)}
                                className="w-fit bg-gray-100 border rouned-lg rounded-lg p-1"
                                type="time" />
                        </div>
                        <div className="grid grid-cols-2 justify-between">
                            <h1>To</h1>
                            <input
                                value={toTime}
                                onChange={(e)=>setToTime(e.target.value)}
                                className="w-fit bg-gray-100 border rouned-lg rounded-lg p-1"
                                type="time" />
                        </div>

                    </div>
                    <button type="submit" className="bg-cyan-200 text-black p-2 border rounded-lg ">
                        Add  
                    </button>
                    </form>
                </div>
            </div>         
        
        </>
    )
}



export default Taskform