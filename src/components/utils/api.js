import axios from "axios";
import { format, sub } from "date-fns";

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

export async function RetrieveRecordsForLastSevenDays(date) {
  const dates = [
    format(sub(date, { days: 6 }), "yyyy-MM-dd"),
    format(sub(date, { days: 5 }), "yyyy-MM-dd"),
    format(sub(date, { days: 4 }), "yyyy-MM-dd"),
    format(sub(date, { days: 3 }), "yyyy-MM-dd"),
    format(sub(date, { days: 2 }), "yyyy-MM-dd"),
    format(sub(date, { days: 1 }), "yyyy-MM-dd"),
    format(date, "yyyy-MM-dd")
  ];
  const records = await Promise.all(
    dates.map(async item => {
      const response = await axios.get(`${baseBath}/userMoods?date=${item}`);
      return { date: item, moods: response.data };
    })
  );
  return records;
}
