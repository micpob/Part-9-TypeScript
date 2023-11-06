import { useState, useEffect, FormEvent  } from 'react'
import './App.css'
import { DiaryEntry, NewDiaryEntry, CustomForm } from './types';
import { getAllEntries, createEntry } from './services/diaryService';

function App() {
  const [diaryEntries, setDiaryeEntries] = useState<DiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

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
      setErrorMessage(response)
    } else {
      setErrorMessage('')
      const updatedDiaryEntries = [...diaryEntries, response]
      setDiaryeEntries(updatedDiaryEntries)
    }
  }

  return (
    <>
    <h2>Add new entry:</h2>
    <h3 style={{color: 'red'}}>{errorMessage}</h3>
    <form onSubmit={addNewEntry}>
      <div>
        <label htmlFor="date"><b>Date:</b></label>
        <input type="date" id="date" />
      </div>
      <div style={{display: 'flex', marginTop: '1em'}}>
        <b>Weather: </b>
        <label style={{margin: 'auto 0 auto 0.5em'}} htmlFor="weather_sunny">sunny</label>
        <input type="radio" name="weather" value="sunny" id="weather_sunny" />
        <label style={{margin: 'auto 0 auto 0.5em'}} htmlFor="weather_rainy">rainy</label>
        <input type="radio" name="weather" value="rainy" id="weather_rainy" />
        <label style={{margin: 'auto 0 auto 0.5em'}} htmlFor="weather_cloudy">cloudy</label>
        <input type="radio" name="weather" value="cloudy" id="weather_cloudy" />
        <label style={{margin: 'auto 0 auto 0.5em'}} htmlFor="weather_stormy">stormy</label>
        <input type="radio" name="weather" value="stormy" id="weather_stormy" />
        <label style={{margin: 'auto 0 auto 0.5em'}} htmlFor="weather_windy">windy</label>
        <input type="radio" name="weather" value="windy" id="weather_windy" />
      </div>
      <div style={{display: 'flex', marginTop: '1em', marginBottom: '1em'}}>
        <b>Visibility: </b>
        <label style={{margin: 'auto 0 auto 0.5em'}} htmlFor="visibility_great">great</label>
        <input type="radio" name="visibility" value="great" id="visibility_great" />
        <label style={{margin: 'auto 0 auto 0.5em'}} htmlFor="visibility_good">good</label>
        <input type="radio" name="visibility" value="good" id="visibility_good" />
        <label style={{margin: 'auto 0 auto 0.5em'}} htmlFor="visibility_ok">ok</label>
        <input type="radio" name="visibility" value="ok" id="visibility_ok" />
        <label style={{margin: 'auto 0 auto 0.5em'}} htmlFor="visibility_poor">poor</label>
        <input type="radio" name="visibility" value="poor" id="visibility_poor" />
      </div>
      <div>
        <label htmlFor="comment">Comment: </label>
        <input id="comment" />
      </div>
      <button style={{backgroundColor:'green', color: 'white', marginTop: '1em'}} type="submit">Add</button>
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
