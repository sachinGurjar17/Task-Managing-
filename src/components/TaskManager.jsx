import {useEvent} from '../hooks/useEvent'
import toast from 'react-hot-toast';
export default function TaskManager(){
    const {events} = useEvent();

return (
    <div className='w-full'>
      <div className="min-h-screen h-fit border-l-2 grid grid-cols-1 md:grid-cols-4 bg-gray-300 w-full m-2 rounded-lg p-4 gap-2"> 
        <div className="h-fit flex flex-col gap-3 bg-gray-100 px-2 py-3 border rounded-lg">
          <h1 className='text-sm font-semibold text-gray-500'>General Information</h1>
          {
            events.map((event)=>(
              event.status == "General Information"  ? <ItemBox event={event}/>:<></>
            ))
          }
        </div>
        <div className="h-fit flex flex-col gap-3 bg-gray-100 px-2 py-3 border rounded-lg">
          <h1 className='text-sm font-semibold text-gray-500'>Backlog</h1>
          {
            events.map((event)=>(
              event.status == 'Backlog' ? <ItemBox event={event}/> : <></>
            ))
          }
        </div>
        <div className="h-fit flex flex-col gap-3 bg-gray-100 px-2 py-3 border rounded-lg">
          <h1 className='text-sm font-semibold text-gray-500'>In Progress</h1>
          {
            events.map((event)=>(
              event.status == 'In Progress' ? <ItemBox event={event}/> : <></>
            ))
          }
        </div>
        <div className="h-fit flex flex-col gap-3 bg-gray-100 px-2 py-3 border rounded-lg">
          <h1 className='text-sm font-semibold text-gray-500'>Paused</h1>
          {
            events.map((event)=>(
              event.status == 'Paused' ? <ItemBox event={event}/> : <></>
            ))
          }
        </div>
      </div>
    </div>

    )
}

function ItemBox({event}){

    const { deleteEvent} = useEvent();
  
    const handleDelete = (id)=>{
      deleteEvent(id);
      toast.success("Congratulations, Event successfully Completed")
    }
  
    const StatusClass = {
      "Paused" : "bg-red-300",
      "In Progress": "bg-yellow-300",
      "General Information" : "bg-green-300",
      "Backlog" : "bg-violet-400"
    }
    return (
      <>
        <div className={`text-sm  bg-white flex flex-col gap-1 border-b-2 w-full shadow-lg rounded-md px-4 py-1`} >
          <div className="flex flex-col items-star py-1 gap-1">
            <div className={`${StatusClass[event.status]}  w-10 h-[8px] border rounded-xl`}></div>
            <div className="flex justify-between w-full">
              <h1 className="text-md  font-semibold text-zinc-700">{event.event}</h1>
              <button
                className=" py-1 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 text-4xl"
                onClick={() => handleDelete(event.id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#000000"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
              </button>
            </div>
           {event.date ? <span className="text-sm text-gray-700">{"📆 "+ event.date}</span>:<></>}
            {event.description ? <p className="text-sm text-gray-700">{"📰 "+event.description}</p> : <></>}
            {event.fromTime && event.toTime ? <p className="text-md text-gray-700">
              {"⏰ From " + event.fromTime + " - " + event.toTime}
            </p> : <></>}
          </div>

        </div>
      </>
    )
  }
