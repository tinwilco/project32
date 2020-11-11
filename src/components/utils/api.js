import axios from "axios";

const baseBath = "https://y88t5h149g.execute-api.eu-west-2.amazonaws.com/dev";

export async function SendRecord(payload) {
  try {
    const response = await axios.post(`${baseBath}/userMood`, { ...payload });
    return response;
  } catch (e) {
    return {
      status: 500,
      error: e.message
    };
  }
}

export async function RetrieveRecordByDate(payload) {
  const { date } = payload;
  const response = await axios.get(`${baseBath}/userMood?date=${date}`);
  return response.status;
}
