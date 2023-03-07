import { useEffect, useState } from "react"
import { Task } from "./Task"


const API_URL = "https://localhost:3001/tasks"

export const Tasks = () => {
    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
        fetch(API_URL)
            .then((res) => res.json())
            .then((data) => setTasks(data))
    }, [])

  return (
    <div>Tasks</div>
  )
}

