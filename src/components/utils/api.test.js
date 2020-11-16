import axios from "axios";
import MockDate from "mockdate";
import { SendRecord, RetrieveRecordsForLastSevenDays } from "./api";

jest.mock("axios");

describe("SendRecord function", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("returns the entire response of a successful request", async () => {
    const expectedResponse = {
      status: 200,
      data: {
        mood: "ecstatic",
        userName: "tester",
        moodDate: "2020-01-01",
        comments: "test comment"
      }
    };
    axios.post.mockResolvedValue({ ...expectedResponse });
    const response = await SendRecord({ date: "2020-01-01" });
    expect(response).not.toEqual(expectedResponse.data);
    expect(response).toStrictEqual(expectedResponse);
  });

  it("returns a 500 status and an error message when the request fails", async () => {
    const errorMessage = "test for error scenario";
    const expectedResponse = {
      status: 500,
      error: errorMessage
    };
    axios.post.mockRejectedValue({ message: errorMessage });
    const response = await SendRecord({ date: "2020-01-01" });
    expect(response).toStrictEqual(expectedResponse);
  });
});

describe("RetrieveRecordsForLastSevenDays function", () => {
  beforeAll(() => {
    MockDate.set("2020-01-01");
  });

  afterAll(() => {
    MockDate.reset();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("returns the a correctly formatted response on a successful request", async () => {
    const testResponse = {
      data: [
        {
          mood: "ecstatic",
          userName: "tester",
          moodDate: "2020-01-01",
          comments: "test comment"
        }
      ]
    };

    axios.get.mockResolvedValue(testResponse);
    const response = await RetrieveRecordsForLastSevenDays(new Date());
    expect(response).toHaveLength(7);
    expect(response[0].moods).toStrictEqual(testResponse.data);
  });

  it("returns a 500 status and an error message when the request fails", async () => {
    const errorMessage = "test for error scenario";
    const expectedResponse = {
      status: 500,
      error: errorMessage
    };
    axios.get.mockRejectedValue({ message: errorMessage });
    const response = await RetrieveRecordsForLastSevenDays(new Date());
    expect(response).toStrictEqual(expectedResponse);
  });
});
