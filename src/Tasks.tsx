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



// DODAWANIE ZADANIA:

    // funkcja będzie wykonywać się asynchronicznie
    const addTask = async (title: string) => {

        // określamy nowe zadanie:
        const newTask: Task = {
            id: tasks.length + 1,
            title,
            completed: false,
        };

        // określamy odpowiedź z serwera,
        // który oczekuje na pojawienie się zadania za pomocą POST
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTask),
        });


        // sprawdzamy czy odpowiedź jest prawidłowa i tworzymy zmienną data.
        // Następnie za pomocą useState tworzymy nowe zadanie
        // i podmieniamy odpowiedź serwera, która wykonała się wyżej.
        if (response.ok) {
            const data = await response.json();
            setTasks([...tasks, data]);
        }
    }

// EDTYTOWANIE ZADANIA:




// Zwrotka użytkownika:
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

            <form action="" onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                const titleInput = e.currentTarget.elements.namedItem("title") as HTMLInputElement;
                

                const title = titleInput.value.trim();
                console.log("dodaję do listy: " + title)
                
                if (title) {
                    addTask(title);
                    titleInput.value = "";
                }


            }}>
                <input type="text" name="title" />
                <button type="submit">Dodaj</button>
            </form>

        </div>
    )
}

