import { format, sub } from "date-fns";
import React, { useMemo } from "react";
import { Table } from "reactstrap";

const ManagerInterface = () => {
  const today = new Date();
  const dateArray = useMemo(() => [sub(today, { days: 1 }), today], []);
  const queryResults = [];

  return (
    <>
      {queryResults.length ? (
        <Table hover bordered>
          <thead>
            <th>Name</th>
            {dateArray.map(date => (
              <th>{format(date, "dd/MM/yyyy")}</th>
            ))}
          </thead>
          <tbody>
            {queryResults.map(result => (
              <tr>
                <td>{result.name}</td>
                {result.map(item => (
                  <td>{item.mood}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>Sorry, no results match your query</p>
      )}
    </>
  );
};
export default ManagerInterface;
