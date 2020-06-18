import React, { useState } from "react";
import db from "../firebaseConfig";


const Day = () => {

    const [task, setTask] = useState("");
    // const [li, setLi] = useState("");

    const handleChange = (e) => {
        setTask(e.target.value) 
    }

//handles the button be clicked
    const handleSubmit = (e) => {
        e.preventDefault();
        db.collection("tasks").add({ 
            task : task,
            dueDate: "june 17th",
         })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });    
        setTask("");
    }

    const handleTask = async () => {
        await db
            .collection("tasks")
            .doc("task")
            .get()
            const data = handleTask.data()
            setTask({
                task: data.task,
            });
            console.log(data)
            // .then((querySnapshot) => {
            //     // const data = querySnapshot.docs.map(doc => doc.data());
            //     console.log(querySnapshot.docs);
                // setLi(data.map(obj => {
                //     return <li>{li}</li>;
                // }

            // });
    }

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
    //updateTask
    //deleteTask


    return (
        <div className="container">
            <h4 className="center">Day</h4>
           
             <form onSubmit={handleSubmit} className="center">
                <input onChange={handleChange} type="text" placeholder="What do you want to do?" value={task}></input>
                <button>Add task</button>
             </form>

             <form className="container center" onChange={handleTask}>
                 <h2>Today's tasks</h2>
                    <ul>
                        <li>Drink water</li>
                    </ul>
             </form>
        </div>
    )
}

export default Day;