import React, { useState, useEffect } from "react";
import db from "../firebaseConfig";


const Day = () => {

    const [taskToSubmit, setTaskToSubmit] = useState("");
    const [tasksToShow, setTasksToShow] = useState([]);

   
    const handleChange = (e) => {    // This is called when the user changes an input.
        setTaskToSubmit(e.target.value) 
    }
     // Two goals for tasksToShow.
    // 1. When the page first loads, load the tasks from firebase. get
    // 2. When the user submits something, RE-load the tasks from firebase update/add
    // so that the UI is up to date.
    
    // Learning note: when we want to fetch something when the page loads,
    // we use React.useEffect.
    // All this says is: when the page loads for the first time, run this code.

        useEffect(() => {
            fetchTasksToShow();
        }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentDate = new Date();
        db.collection("tasks").add({ 
            task : taskToSubmit,
            dueDate: currentDate.toDateString(),
        })
        .then(function() {
            // Fulfills (2) above in the goals for tasksToShow.
            fetchTasksToShow();
            console.log("Document successfully written!");
            
            // Here, the code needs to refetch from the database.
            // So that even after we add it, the UI is up to date.
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });    
        setTaskToSubmit("");
    }

    // This function gets the tasks and print them out to the screen.
    const fetchTasksToShow = () => {
         db.collection("tasks")
            .get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data())
                console.log(data)
                setTasksToShow(data);
            })
    }
// Dear Tugba and Refia, this line of code may be wrong and you
// need to console.log(data) and double check. But you should set this
// to an array of tasks.
    //updateTask
    //deleteTask


const itemCard = (item) => {
    return (
        <li>{item.task} {item.dueDate}</li>
    )
}

const taskItemCards = tasksToShow.map(itemCard);


    return (
        <div className="container">
            <h4 className="center">Day</h4>
           
             <form onSubmit={handleSubmit} className="center">
                <input onChange={handleChange} type="text" placeholder="What do you want to do?" value={taskToSubmit}></input>
                <input type="date" placeholder="Due date" value={taskToSubmit}></input>
                <button>Add task</button>
             </form>

             <form className="container center">
                 <h2>Today's tasks</h2>
                    <ul>
                        {taskItemCards}
                    </ul>
             </form>
        </div>
    )
}

export default Day;
