import React, { useEffect, useState } from "react";
import axios from "axios";

function Notes() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/notes")
            .then((res) => {
                console.log(res.data); // dekh console mein data aa raha ya nahi
                setNotes(res.data);
            })
            .catch((err) => {
                console.error("Error fetching notes:", err);
            });
    }, []);

    return ( <
        div >
        <
        h2 > All Notes < /h2> {
            notes.length === 0 ? ( <
                p > No notes found < /p>
            ) : (
                notes.map((note) => ( <
                    div key = { note._id }
                    style = {
                        { border: "1px solid gray", margin: "10px", padding: "10px" } } >
                    <
                    h3 > { note.title } < /h3> <
                    p > { note.content } < /p> <
                    /div>
                ))
            )
        } <
        /div>
    );
}

export default Notes;