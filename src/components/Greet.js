import React, { useState } from "react";
import db from "../firebaseConfig";



const Greet = (props) => {
//     setTimeout(() => {
//         props.history.push("/day")
//     }, 5000);

    const [user, setUser] = useState("");

    const handleChange = (e) => {
        setUser(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        db.collection("users").add({ 
            user : user,
            joined: "January 1st",
         })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });    
        setUser("");
    }

        return (
            <div>
                <form onSubmit={handleSubmit} className="center">
                    <input placeholder="Your name" type="text" onChange={handleChange} value={user}></input>
                    <button>Submit</button>
                </form>

                <div>
                    `Hello {user}!`
                </div>
            </div>
        )
    }
    
    // return (
    //     <h1 onChange={Submit}>
    //         Hello {user}!
    //     </h1>
    // )
// }

export default Greet;