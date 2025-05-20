import React, { useEffect, useState } from "react";
import axios from "axios";

const NotesList = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchNotes = async() => {
            try {
                const res = await axios.get("http://localhost:5000/api/notes");
                setNotes(res.data);
            } catch (error) {
                console.error("Error fetching notes:", error);
            }
        };

        fetchNotes();
    }, []);

    return ( <
        div >
        <
        h2 > Notes < /h2> {
            notes.length === 0 ? ( <
                p > No notes found. < /p>
            ) : ( <
                ul > {
                    notes.map((note) => ( <
                        li key = { note._id } >
                        <
                        strong > { note.title } < /strong>: {note.content} <
                        /li>
                    ))
                } <
                /ul>
            )
        } <
        /div>
    );
};

export default NotesList;