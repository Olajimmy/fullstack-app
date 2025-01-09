import { useState, useEffect } from "react";
import axios from "axios";

function TodoPage() {
  //
  const [entries, setEntries] = useState([]);
  const LOCAL_URL = `http://localhost:5050`;

  const getEntries = async () => {
    console.log(`in getEntries`);
    //fetch calendar entries from the back end
    //aslo known as the api that i an creating
    //this endpoint is:
    // /api/todo

    try {
      const response = await axios.get(`${LOCAL_URL}/api/todo`);
      console.log(response.data);
      setEntries(response.data);
    } catch (err) {
      console.err(err);
    }
  };

  //
  useEffect(() => {
    getEntries();
  }, []);

  const loading = () => {
    return <h3>there dont seem to be an entries yet</h3>;
  };
  //
  const loaded = () => {
    return (
      <ul
        style={{
          listStyleType: "none",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {entries.map((entry) => {
          return (
            <li style={{ width: "80%" }}>
              {entry.due}: {entry.completed ? <>DONE</> : <>_______</>}:
              {entry.text}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <>
      <h2>todo Entries</h2>

      {entries.length ? loaded() : loading()}
    </>
  );
}
//

export default TodoPage;
