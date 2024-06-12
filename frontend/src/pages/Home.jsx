import React, { useEffect, useState } from 'react'
import api from '../api'
import Notes from '../components/Notes'
import '../styles/home.css'

const Home = () => {
  const [notes, setnotes] = useState()
  const [content , setcontent] = useState()
  const [title, settitle] = useState()
  useEffect(()=>{
    getNote()

  },[])

  const getNote = ()=>{
    api.get('/api/note/')
    .then((res)=>res.data)
    .then((data)=> {setnotes(data); console.log(data)})
    .catch((err)=> alert(err))
  }

  const deleteNote = (id)=>{
    api.delete(`/api/note/delete/${id}/`)
    .then((res)=>{
      if(res.status === 204) alert("note deleted")
      else alert("failed to delete note")
      getNote()
    }).catch((error)=> alert(error))
    
  }

  const createNote = (e)=>{
    e.preventDefault()
    api.post("/api/note/", {content, title})
    .then((res)=>{
      if(res.status === 201) alert("note created")
      else alert("failed to make note")
      getNote();
    }).catch((error)=>alert(error))

  }



  return (
    <div>
      <div>
        <h2>Notes</h2>
        {notes?.map((note)=><Notes note={note} onDelete={deleteNote} key={note.id}/>)}



      </div>
      <h2>create a note</h2>
      <form action="" onSubmit={createNote}>
        <label htmlFor="title">Title:</label>
        <br />
        <input type="text" id="title" name="title" value={title} required onChange={(e)=>settitle(e.target.value)} />

        <label htmlFor="content">content</label>
        <br />
        <textarea name="content" id="content" value={content} required onChange={(e)=> setcontent(e.target.value)}></textarea>
        <br />
        <input type="submit" value="submit" />
      </form>
      

    </div>
  )
}

export default Home
