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
  //
  const [editingData, setEditingData] = useState({});

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
      // addEntry(id);
      //   setFormData({
      //     entryDate: [response.data.entryDate],
      //     entryType: [response.data.entryType],
      //     description: [response.data.description],
      //   });

      //   console.log(`edit`, response.data);

      //   let newData = response.data;
      //   console.log(
      //     "entry date",
      //     newData.entryDate,
      //     "entry type:",
      //     newData.entryType
      //   );
      //   setFormData({
      //     entryDate: newData.entryDate,
      //     entryType: newData.entryType,
      //     description: newData.description,
      //   });
      //   console.log(formData);

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

  const handleSave = async (e, id) => {
    console.log("save is clicked:", id);
    try {
      const response = await axios.get(`${LOCAL_URL}/api/braindump/`);
      //console.log("response in save", response.data);
      //   let newRes = response.data;
      //   console.log(newRes);
      //   setEditingData(newRes);
      //   console.log("editing data", editingData);
      //   editingData.map((i, index) => {
      //     console.log(editingData[index]._id);
      //     if (id === editingData[index]._id) {
      //       console.log("we matched", id);
      //       setFormData;
      //       //setFormData({ ...formData, [e.target.name]: e.target.value });
      setFormData({ ...formData, [e.target.name]: e.target.value });
      console.log(formData);
      //       //handleSubmit();
      //       //   handleChange();
      //       //   handleTypeSelect();
      //     }
      //   });
      //   if (editingData == id) {
      //     console.log("id matched");
      //   } else {
      //     console.log("not matched");
      //   }
      //setEntries(response.data);
    } catch (err) {
      console.error(err);
    }
    //setFormData({ ...formData });
  };

  //

  // handleChange(id);

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
    console.log(formData);
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
//
//
//
// //KATIE'S CODE
//
// import { useEffect, useState } from "react";
// import axios from "axios";

// function BrainDumpPage() {
//   const current = new Date();
//   const [entries, setEntries] = useState([]);
//   const [formData, setFormData] = useState({
//     entryDate: current,
//     entryType: "",
//     description: "",
//   });
//   const [entryUpdate, setEntryUpdate] = useState("");
//   // ** changing the entryType
//   const [entryType, setEntryType] = useState("");
//   // ** edit
//   const [editFormId, setEditFormId] = useState();
//   const [editedForm, setEditedForm] = useState({
//     entryDate: current,
//     entryType: "",
//     description: "",
//   });

//   // ** setting local host to variable this would be deployed and placed in .env
//   const LOCAL_URL = "http://localhost:5050";

//   // ** get all entries
//   const getEntries = async () => {
//     //console.log("in getEntries");
//     // ** fetch brain dump entries from the back end also known as the api that i am creating
//     // ** this endpoint is: GET /api/braindump
//     try {
//       const response = await axios.get(`${LOCAL_URL}/api/braindump`);
//       //console.log(response.data);
//       setEntries(response.data);
//     } catch (err) {
//       console.err(err);
//     }
//   };

//   // ** add an entry
//   // ** this endpoint is: POST /api/braindump
//   const addEntry = async (newEntry) => {
//     let error = false;
//     let addedEntry = {};
//     try {
//       const response = await axios.post(`${LOCAL_URL}/api/braindump`, newEntry);
//       addedEntry = response.data;
//     } catch (err) {
//       error = true;
//       console.log(err);
//     } finally {
//       if (error) {
//         setEntryUpdate("there was an error");
//       } else {
//         setEntryUpdate(
//           `Successfully Added ${addedEntry.entryType} - ${addedEntry.description}`
//         );
//       }
//     }
//   };

//   // ** Delete entry
//   // ** this endpoint is: DELETE /api/braindump/:id
//   const deleteEntry = async (id) => {
//     try {
//       const response = await axios.delete(`${LOCAL_URL}/api/braindump/${id}`);
//       //console.log(response);
//       setEntryUpdate(`Successfully deleted entry: ${id}`);
//     } catch (err) {
//       console.error(err);
//       setEntryUpdate("delete failed");
//     }
//   };

//   // ** edit entries
//   // ** this endpoint is: PUT /api/braindump/:id
//   const editEntry = async (id) => {
//     try {
//       //console.log("Updating entry with id:", id); // ** Debug log to make sure the id being passed
//       const response = await axios.put(
//         `${LOCAL_URL}/api/braindump/${id}`,
//         editedForm
//       );
//       //console.log(response);
//       setEditFormId(null); // ** Close the edit form by setting the editFormId to null
//       setEditedForm({ entryDate: current, entryType: "", description: "" }); // ** Reset the edited form
//       setEntryUpdate(`Successfully updated entry: ${id}`);
//       // ** Re-fetch entries to update the displayed list
//       getEntries();
//     } catch (err) {
//       console.error(err);
//       setEntryUpdate("edit failed");
//     }
//   };

//   const handleEdit = (date, type, description, id) => {
//     //console.log(date, type, description, id); // *** all data is pulled
//     setEditFormId(id);
//     //console.log("this is the edit id:", id);
//     // *** edited form data
//     setEditedForm({
//       entryDate: date,
//       entryType: type,
//       description: description,
//     });

//     //console.log(editedForm); // ** ensuring the form data is going fully through the handleEdit
//   };

//   // ** Cancel Edit
//   const cancelEdit = () => {
//     setEditFormId(null); // ** Clear the edit form state
//     setEditedForm({ entryDate: current, entryType: "", description: "" }); // ** Reset the form
//   };

//   // ** handle delete click
//   const handleDelete = (e, id) => {
//     //console.log(`deleting... entry:`, id);
//     deleteEntry(id);
//     //console.log(e, id);
//   };

//   useEffect(() => {
//     getEntries();
//   }, [entryUpdate]);

//   const loaded = () => {
//     return (
//       <ul
//         style={{
//           listStyleType: "none",
//           display: "flex",
//           flexDirection: "column",
//           margin: "50px",
//         }}
//       >
//         {entries.map((entry, index) => (
//           <li key={index}>
//             {editFormId === entry._id ? (
//               <>
//                 <>
//                   <input
//                     type="date"
//                     name="entryDate"
//                     required
//                     onChange={handleEditChange}
//                     value={editedForm.entryDate}
//                   />
//                   <label>
//                     Choose the Entry Type
//                     <select
//                       name="entryType"
//                       value={editedForm.entryType}
//                       onChange={handleEditChange}
//                     >
//                       <option value="None"> </option>
//                       <option value="ToDo">To Do</option>
//                       <option value="Idea">Idea</option>
//                       <option value="Appt">Appt</option>
//                       <option value="Sched">Sched</option>
//                       <option value="List">List</option>
//                     </select>
//                   </label>
//                   <input
//                     type="text"
//                     name="description"
//                     required
//                     onChange={handleEditChange}
//                     value={editedForm.description}
//                   />
//                   <button onClick={() => editEntry(entry._id)}>Save</button>
//                   <button onClick={cancelEdit}>Cancel</button>
//                 </>
//               </>
//             ) : (
//               <>
//                 {entry.entryDate}: {entry.entryType} : {entry.description}
//                 <button
//                   onClick={() =>
//                     handleEdit(
//                       entry.entryDate,
//                       entry.entryType,
//                       entry.description,
//                       entry._id
//                     )
//                   }
//                 >
//                   Edit
//                 </button>
//               </>
//             )}

//             <button onClick={(e) => handleDelete(e, entry._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     );
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     let newEntry = {};
//     // console.log("in handleSubmit");
//     // ** send the post request to the back end
//     //console.log(formData);
//     newEntry = {
//       entryDate: formData.entryDate,
//       entryType: entryType || "None",
//       description: formData.description,
//     };
//     addEntry(newEntry);
//     //console.log(newEntry);
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // ** This function is called when the user changes any input field (date, type, description)
//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     // ** Update only the field that changed (keeping others intact)
//     setEditedForm((prevForm) => ({
//       ...prevForm, // ** Keep the previous values intact
//       [name]: value, // ** Update the specific field that changed
//     }));
//   };

//   const handleTypeSelect = (e) => {
//     setEntryType(e.target.value);
//   };

//   const loading = () => {
//     return <h3>There dont seem to be any entries</h3>;
//   };

//   return (
//     <>
//       <h1>Brain Dump</h1>

//       <div style={{ display: "flex", margin: "50px" }}>
//         <div>
//           <h3>Add a new entry</h3>
//           <form onSubmit={handleSubmit}>
//             <input
//               type="date"
//               name="entryDate"
//               required
//               onChange={handleChange}
//               value={formData.entryDate}
//             />
//             <label>
//               Choose the entry Type
//               <select value={entryType} onChange={handleTypeSelect}>
//                 <option value="None"></option>
//                 <option value="ToDo">To Do</option>
//                 <option value="Idea">Idea</option>
//                 <option value="Appt">Appt</option>
//                 <option value="Sched">Sched</option>
//                 <option value="List">List</option>
//               </select>
//             </label>
//             <input
//               type="text"
//               name="description"
//               required
//               onChange={handleChange}
//               value={formData.Description}
//             />
//             <input type="submit" value="Add a new entry" />
//           </form>
//           <p>{entryUpdate}</p>
//         </div>
//         <div>{entries.length ? loaded() : loading()}</div>
//       </div>
//     </>
//   );
// }

// export default BrainDumpPage;
