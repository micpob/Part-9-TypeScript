import { useState, useEffect } from 'react'
import './App.css'
import { DiaryEntry } from './types';
import { getAllEntries } from './services/diaryService';

function App() {
  const [diaryEntries, setDiaryeEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllEntries().then(data  => {
      console.log(data)
      setDiaryeEntries(data)
    })
  }, [])


  return (
    <>
    <h1>Diary entries:</h1>
      {diaryEntries.map(entry => (
        <div>
          <h2>{entry.date} </h2>
          <p>visibility: {entry.visibility} </p>
          <p>weather: {entry.weather} </p>
        </div>
      ))}
    </>
  )
}

export default App
