import { useState, useEffect } from "react";
import axios from "axios";

function BrainDumpPage() {
  const current = new Date();
  //const curreDate=`${current.getMonth}`
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({
    entryDate: current,
    entryType: "",
    description: "",
  });

  const [update, setUpdate] = useState("nothing changed");
  const [entType, setEntType] = useState("");

  const LOCAL_URL = `http://localhost:5050`;

  const getEntries = async () => {
    console.log(`in getEntries`);
    //fetch calendar entries from the back end
    //aslo known as the api that i an creating
    //this endpoint is:
    // /api/calendar

    try {
      const response = await axios.get(`${LOCAL_URL}/api/braindump`);
      console.log(response.data);
      setEntries(response.data);
    } catch (err) {
      console.err(err);
    }
  };
  //
  const addEntry = async (newEntry) => {
    let error = false;
    try {
      const response = await axios.get(`${LOCAL_URL}/api/braindump`, newEntry);
    } catch (e) {
      error = true;
      console.error(e);
    } finally {
      // lets the user knows if the add was successfull or not
      if (error) {
        setUpdate("there was an error");
      } else {
        //once i actually implement the post route in my backend, i will show added entry

        setUpdate("successfully added");
      }
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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`in handleSubmit`);
    let newEntry = {};
    console.log(entType);
    //this is where i will send my post request to the backend
    setFormData({ ...formData, entryType: entType });
    console.log(formData);
    newEntry = {
      entryDate: formData.entryDate,
      entryType: entType,
      description: formData.description,
    };
    console.log(newEntry);
    addEntry(newEntry);
  };
  //

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //

  const handleTypeSelect = (e) => {
    setEntType(e.target.value);
  };

  const loaded = () => {
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
            {entry.entryDate}: {entry.type}:{entry.description}
          </li>
        );
      })}
    </ul>;
  };

  return (
    <>
      <h2>Brain Dump Entries</h2>
      <ol>
        CRUD
        <li>Create -form to add a new entry</li>
        <li>Read - show all (which i have ), the rest is future work</li>
        <li>Update- form to edit a specific entry</li>
        <li>Delete - button to delete an entry</li>
      </ol>
      <div style={{ display: "flex" }}>
        <div>
          <h3>Add a new entry</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="date"
              name="entryDate"
              required
              onChange={handleChange}
              value={formData.entryDate}
            />
            <label>
              Choose the Entry Type
              <select value={entType} onChange={handleTypeSelect}>
                <option value="None"></option>
                <option value="ToDo">TO Do</option>
                <option value="Idea">Idea</option>
                <option value="Appt">Appt</option>
                <option value="Sched">TO Do</option>
                <option value="List">TO Do</option>
              </select>
            </label>
            <input
              type="text"
              name="description"
              required
              onChange={handleChange}
              value={formData.description}
            />
            <input type="submit" value="add a new entry" />
          </form>
          <p>{update}</p>
        </div>
        <div>{entries.length ? loaded() : loading()}</div>
      </div>
    </>
  );
}
export default BrainDumpPage;
