import { useEffect, useState } from "react"
import { Task } from "./Task"


const API_URL = "https://localhost:3001/tasks"

export const Tasks = () => {
    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
        fetch(API_URL)
            .then((res) => res.json())
            .then((data) => setTasks(data))
    }, []);

    const addTask = async (title: string) => {
        const newTask: Task = {
            id: tasks.length + 1,
            title,
            completed: false,
        };

        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTask),
        });

        if (res.ok) {
            const data = await res.json();
            setTasks([...tasks, data]);
        }
    };



  return (
    <div>
        <h2>To-Do List</h2>
        <ul>
            
        </ul>
    </div>
  )
}

