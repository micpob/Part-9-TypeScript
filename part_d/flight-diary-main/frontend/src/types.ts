export interface DiaryEntry {
  id: number,
  date: string,
  weather: string,
  visibility: string,
  comment?: string
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>

interface CustomElements extends HTMLFormControlsCollection   {
  date: HTMLInputElement;
  weather: HTMLInputElement;
  visibility: HTMLInputElement;
  comment?: HTMLInputElement;
}
 
export interface CustomForm extends HTMLFormElement {
  readonly elements: CustomElements;
}