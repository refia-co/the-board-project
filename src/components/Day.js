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
        db.collection("tasks").add({ 
            task : taskToSubmit,
            dueDate: "june 17th",
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
    const fetchTasksToShow = async () => {
        await db
            .collection("tasks")
            .doc("task")
            .get()
            const data = db.collection("tasks").data()
            // Dear Tugba and Refia, this line of code may be wrong and you
            // need to console.log(data) and double check. But you should set this
            // to an array of tasks.
            //setTasksToShow(data.task);
            console.log(data)
      
    }

    //updateTask
    //deleteTask


    return (
        <div className="container">
            <h4 className="center">Day</h4>
           
             <form onSubmit={handleSubmit} className="center">
                <input onChange={handleChange} type="text" placeholder="What do you want to do?" value={taskToSubmit}></input>
                <button>Add task</button>
             </form>

             <form className="container center">
                 <h2>Today's tasks</h2>
                    <ul>
                        {tasksToShow}//map tasks
                        <li>Drink water</li>
                    </ul>
             </form>
        </div>
    )
}

export default Day;


      // .then((querySnapshot) => {
            //     // const data = querySnapshot.docs.map(doc => doc.data());
            //     console.log(querySnapshot.docs);
                // setLi(data.map(obj => {
                //     return <li>{li}</li>;
                // }

            // });


// async componentDidMount({
//   const res = await db.collection("boards").doc("board").get()
//   const data = res.data()
//   this.setState({
//     field1: data.field1,
//   })
//   console.log(this)
// })

// addList = e => {
//   db.collection("lists").add({
//     title: this.state.item,
//     dueDate: this.state.dueDate
//   })
//   this.setState({
//     item: "",
//     dueDate: "",
//   });
// };