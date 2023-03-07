import { useEffect, useState } from "react"
import { Task } from "./Task"


const API_URL = "http://localhost:3001/tasks"

export function Tasks() {
    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
        fetch(API_URL)
            .then((res) => res.json())
            .then((data) => setTasks(data))
    }, [])


    return (
        <div>
            <h2>To-Do List</h2>
            <ul>
                {tasks.map((task) => {
                    return (
                        <li key={task.id}>{task.title}</li>
                    )

                })}
            </ul>

        </div>
    )
}

