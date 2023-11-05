import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = 'http://localhost:3001/api/diaries'

export const getAllEntries = () => {
  return axios
    .get<DiaryEntry[]>(baseUrl)
    .then(response => response.data)
}

export const createEntry = async (object: NewDiaryEntry) => {
  //console.log(object)
  try {
    const response = await axios
    .post<DiaryEntry>(baseUrl, object)
    .then(response => response.data)
    return response
  } catch (error) {
    if (axios.isAxiosError(error)) {
      //console.log(error.status)
      console.error('ERROR:', error.response);
      return error.response?.data
    } else {
      console.error(error);
    }
  }
  
}