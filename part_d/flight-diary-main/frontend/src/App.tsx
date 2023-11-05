import { useState, useEffect, FormEvent  } from 'react'
import './App.css'
import { DiaryEntry, NewDiaryEntry, CustomForm } from './types';
import { getAllEntries, createEntry } from './services/diaryService';

function App() {
  const [diaryEntries, setDiaryeEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllEntries().then(data  => {
      setDiaryeEntries(data)
    })
  }, [diaryEntries])

  const addNewEntry = async (e: FormEvent<CustomForm>) => {
    e.preventDefault()
    const target = e.currentTarget.elements;
    
    const newEntry : NewDiaryEntry = {
      date: target.date.value,
      weather: target.weather.value,
      visibility: target.visibility.value,
      comment: target.comment ? target.comment.value : undefined
    }
    const response = await createEntry(newEntry)
    if (typeof response === 'string') {
      const updatedDiaryEntries = [...diaryEntries, response]
      setDiaryeEntries(updatedDiaryEntries)

  return (
    <>
    <h2>Add new entry:</h2>
    <form onSubmit={addNewEntry}>
      <div>
        <label htmlFor="date">Date: </label>
        <input id="date" />
      </div>
      <div>
        <label htmlFor="weather">Weather: </label>
        <input id="weather" />
      </div>
      <div>
        <label htmlFor="visibility">Visibility: </label>
        <input id="visibility" />
      </div>
      <div>
        <label htmlFor="comment">Comment: </label>
        <input id="comment" />
      </div>
      <button type="submit">Add</button>
    </form>
    <h2>Diary entries:</h2>
      {diaryEntries.map(entry => (
        <div key={entry.id}>
          <h3>{entry.date} </h3>
          <p>visibility: {entry.visibility} </p>
          <p>weather: {entry.weather} </p>
        </div>
      ))}
    </>
  )
}

export default App
