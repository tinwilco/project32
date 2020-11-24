import { format, parse } from "date-fns";
import { Fragment, useEffect, useState } from "react";
import { Card, CardBody, CardText, CardTitle } from "reactstrap";
import { RetrieveRecordsForLastSevenDays } from "../utils/api";

import styles from "./ManagerInterface.module.css";

const ManagerInterface = () => {
  const today = new Date();

  const [moodResults, setMoodResults] = useState([]);
  const [moodError, setMoodError] = useState([]);

  useEffect(() => {
    RetrieveRecordsForLastSevenDays(today).then(response => {
      if (response.status === 500) {
        setMoodError(response.error);
      } else {
        setMoodResults(response);
      }
    });
  }, []);

  return (
    <>
      <h2>How are you feeling today?</h2>
      {moodResults.length ? (
        <div className={styles.card_container}>
          {moodResults.map(moodResult => {
            return (
              <Card className={styles.card} key={`card-${moodResult?.date}`}>
                <CardBody>
                  <CardTitle className={styles.card_title}>
                    {format(
                      parse(moodResult?.date, "yyyy-MM-dd", new Date()),
                      "EEEE dd/MM/yyyy"
                    )}
                  </CardTitle>
                  <CardText>
                    {moodResult?.moods.map(mood => {
                      return (
                        <Fragment
                          key={`${mood.userName}-mood-${moodResult.date}`}
                        >
                          {`${mood?.userName}: ${mood?.mood}`}
                          <br />
                        </Fragment>
                      );
                    })}
                  </CardText>
                </CardBody>
              </Card>
            );
          })}
        </div>
      ) : (
        <p>
          Sorry, no results match your query. We got the following error:
          {JSON.stringify(moodError)}
        </p>
      )}
    </>
  );
};
export default ManagerInterface;
