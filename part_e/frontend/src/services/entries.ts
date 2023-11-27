import axios from "axios";
import { Entry, EntryFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const create = async (object: EntryFormValues, patientId: string) => {
  console.log('entries.create()');
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${patientId}/entries`,
    object
  );

  return data;
};

export default {
  create
};

