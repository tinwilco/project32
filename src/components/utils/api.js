import axios from "axios";
import { format, sub } from "date-fns";

const baseBath = "https://y88t5h149g.execute-api.eu-west-2.amazonaws.com/dev";
const authBasePath =
  "https://hedwigproject32.auth.eu-west-2.amazoncognito.com/oauth2/token";
const redirectPath = "http://localhost:8000/";

const appClientId = "mc286662tub3dqr7hbods31p3";
const appClientSecret = "<insert client secret here>";

export async function Authenticate(code) {
  const auth = btoa(`${appClientId}:${appClientSecret}`);
  const response = await axios.post(
    authBasePath,
    {},
    {
      params: {
        grant_type: "authorization_code",
        client_id: appClientId,
        redirect_uri: redirectPath,
        code
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${auth}`
      }
    }
  );

  return response.data.id_token;
}

export async function SendRecord(idToken, payload) {
  try {
    const response = await axios.post(
      `${baseBath}/userMood`,
      { ...payload },
      {
        headers: {
          Authorization: idToken,
          "Content-Type": "application/json"
        }
      }
    );
    return response;
  } catch (e) {
    return {
      status: 500,
      error: e.message
    };
  }
}

export async function RetrieveRecordsForLastSevenDays(date) {
  try {
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
  } catch (e) {
    return {
      status: 500,
      error: e.message
    };
  }
}
