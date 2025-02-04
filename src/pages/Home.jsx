import Taskform from "../components/TaskForm"
import TaskManager from "../components/TaskManager"
export default function Home(){
    return (
        <>
            <div className="flex flex-row gap-4 justify-between ">
                <TaskManager/>
                <Taskform/>
            </div>
        </>
    )
}