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
      console.log("response.data", response.data);
      setEntries(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  //
  const addEntry = async (newEntry) => {
    let error = false;
    let addedEntry = {};
    try {
      const response = await axios.post(`${LOCAL_URL}/api/braindump`, newEntry);
      addedEntry = response.data;
      console.log("addedEntry", response.data);
      setEntries(response.data);
    } catch (e) {
      error = true;
      console.error(e);
    } finally {
      // lets the user knows if the add was successfull or not
      if (error) {
        setUpdate("there was an error");
      } else {
        //once i actually implement the post route in my backend, i will show added entry

        setUpdate(
          `successfully added:, ${addedEntry.entryType} - ${addedEntry.description} -id: ${addedEntry._id}`
        );
        console.log(
          `${addedEntry.entryType} - ${addedEntry.description} -id: ${addedEntry._id}`
        );
      }
    }
  };

  //
  useEffect(() => {
    getEntries();
  }, [update]);
  //

  const deleteEntry = async (id) => {
    try {
      const response = await axios.delete(`${LOCAL_URL}/api/braindump/${id}`);
      console.log(response);
      setUpdate(`deleted entry ${id} successfully `);
    } catch (err) {
      console.error(err);
      setUpdate(`delete failed`);
    }
  };
  //
  const editEntry = async (id) => {
    try {
      const response = await axios.put(`${LOCAL_URL}/api/braindump/${id}`);

      console.log(`edit`, response.data);
      let newData = response.data;
      console.log(
        "entry date",
        newData.entryDate,
        "entry type:",
        newData.entryType
      );
      setFormData(newData.entryType);

      //setFormData();
      setUpdate(`edited data ${id} successfully`);
    } catch (err) {
      console.error(err);
      setUpdate(`edit failed`);
    }
  };

  const handleEdit = async (e, id) => {
    console.log(`editing .... entry`);
    editEntry(id);
    //add in a function editEntry
    // console.log(id);
    // const response = await axios.get(`${LOCAL_URL}/api/braindump/${id}`);
    // // console.log(" edit get", response.data);
    // const newVal = response.data;
    // console.log(newVal);
    // const newValues = [...formData, id]; // Copy the current values array
    // //newValues[i] = event.target.value;
    // console.log(newValues[id]); //shows the text value in it
    //setFormData(newValues[id]);
    // setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //
  const handleSave = (e, id) => {};
  //
  const handleDelete = (e, id) => {
    console.log(`deleting ... entry`);
    // console.log(e, id);
    deleteEntry(id);

    //add in a function deleteEntry
  };

  //
  const handleSubmit = (e) => {
    e.preventDefault();
    let newEntry = {};
    console.log(`in handleSubmit`);

    console.log(entType);
    //this is where i will send my post request to the backend
    setFormData({ ...formData, entryType: entType });
    console.log(formData);
    newEntry = {
      entryDate: formData.entryDate,
      entryType: entType || "None",
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
  //
  const loading = () => {
    return <h3>there dont seem to be an entries yet</h3>;
  };

  const loaded = () => {
    return (
      <ul
        style={{
          listStyleType: "none",
          display: "flex",
          flexDirection: "column",
          border: "1px solid white",
        }}
      >
        {entries.map((entry) => {
          return (
            <>
              <li style={{ width: "80%" }}>
                {entry.entryDate}: {entry.entryType} : {entry.description}
                <button
                  onClick={(e) => {
                    handleEdit(e, entry._id);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    handleSave(e, entry._id);
                  }}
                >
                  Save
                </button>
                <button onClick={(e) => handleDelete(e, entry._id)}>
                  Delete
                </button>
              </li>
            </>
          );
        })}
      </ul>
    );
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
