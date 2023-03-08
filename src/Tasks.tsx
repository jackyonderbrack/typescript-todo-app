import { useEffect, useState } from "react"
import { Task } from "./Task"


const API_URL = "http://localhost:3001/tasks"

export function Tasks(): JSX.Element {
    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
        fetch(API_URL)
            .then((res) => res.json())
            .then((data) => setTasks(data))
    }, [])



// 1. DODAWANIE ZADANIA:

    // funkcja będzie wykonywać się asynchronicznie
    async function addTask({ title }: { title: string }): Promise<void> {

        const newTask: Task = {
            id: tasks.length + 1,
            title,
            completed: false,
        }

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTask),
        })

        // sprawdzamy czy odpowiedź jest prawidłowa i tworzymy zmienną data.
        // Następnie za pomocą useState tworzymy nowe zadanie
        // i podmieniamy odpowiedź serwera, która wykonała się wyżej.
        if (response.ok) {
            const data = await response.json()
            setTasks([...tasks, data])
        }
    }

// 2. EDTYTOWANIE ZADANIA:
    async function editTask({ updatedTask }: { updatedTask: Task }): Promise<void> {
        const response = await fetch(`${API_URL}/${updatedTask.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTask),
        })

        if (response.ok) {
            const data = await response.json()
            setTasks(tasks.map((task) => (task.id === data.id ? data : task)))
        }
    }

// 3. USUWANIE ZADANIA:
    async function deleteTask({ taskId }: { taskId: number }): Promise<void> {
        const response = await fetch(`${API_URL}/${taskId}`, {
            method: "DELETE",
        })

        if (response.ok) {
            setTasks(tasks.filter((task) => (task.id !== taskId)))
        }
    }



// Zwrotka użytkownika:
    return (
        <div>
            <h2>To-Do List</h2>
            <div className="list">
                {tasks.map((task) => {
                    return (
                        <a key={task.id}>
                            <input 
                                type="checkbox" 
                                checked={task.completed}
                                onChange={() => editTask({ updatedTask: { ...task, completed: !task.completed } })}
                            />
                            <input 
                                type="text" 
                                value={task.title} 
                                onChange={(e) => editTask({ updatedTask: { ...task, title: e.target.value } })}
                            />
                            <button onClick={() => deleteTask({ taskId: task.id })}>Del</button>
                        </a>
                    )

                })}
            </div>

            <form action="submit" onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                const titleInput = e.currentTarget.elements.namedItem("title") as HTMLInputElement;
                

                const title = titleInput.value.trim();
                console.log("dodaję do listy: " + title)
                
                if (title) {
                    addTask({ title });
                    titleInput.value = "";
                }


            }}>
                <input type="text" name="title" />
                <button type="submit">Dodaj</button>
            </form>

        </div>
    )
}

