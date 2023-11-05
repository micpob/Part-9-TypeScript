import axios from 'axios';
import { DiaryEntry } from "../types";

const baseUrl = 'http://localhost:3001/api/diaries'

export const getAllEntries = () => {
  return axios
    .get<DiaryEntry[]>(baseUrl)
    .then(response => response.data)
}

export const createEntry = async (object: NewDiaryEntry) => {
  //console.log(object)
    const response = await axios
    .post<DiaryEntry>(baseUrl, object)
    .then(response => response.data)
    return response
  } catch (error) {
  
}