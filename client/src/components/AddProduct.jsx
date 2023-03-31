import {useState} from "react";
import axios from "axios";

export default function AddProduct({refreshList, setRefreshList, setShowAdd}) {
  const [form, setForm] = useState({});
  const [postError, setPostError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentDeveloper, setCurrentDeveloper] = useState("");

  //when save button is pressed. post request to db, refreshes table. display error message with concerned fields
  async function handleSave(e) {
    e.preventDefault();
    axios
      .post("/api/add-product", form)
      .then(function (response) {
        setForm({});
        setCurrentDeveloper("");
        setShowAdd(false);
        e.target.reset();
        setPostError(false);
        setRefreshList(!refreshList);
      })
      .catch(function (error) {
        const data = error.response.data;
        if (data) {
          setErrorMessage(`${data.message}: ${data.fields.join(", ")}`);
        }
        setPostError(true);
      });
  }

  //clears form and error message
  function handleCancel() {
    setForm({});
    setCurrentDeveloper("");
    setShowAdd(false);
    setPostError(false);
  }

  //add current developer entry to array of developers
  function handleDeveloper() {
    setForm({
      ...form,
      Developers: form.Developers
        ? [...form.Developers, currentDeveloper]
        : [currentDeveloper],
    });
  }
  //remove developer from list of developers
  function removeDeveloper(index) {
    const devList = form.Developers;
    const newList = devList
      .map((dev, i) => {
        if (i !== index) return dev;
      })
      .filter(Boolean);
    setForm({...form, Developers: newList});
  }
  //add current field value to form state. change date format to xxxx-xx-xx => xxxx/xx/xx
  function handleChange(fieldName, event) {
    let value = event.target.value;
    if (fieldName === "startDate") {
      value = value.split("-").join("/");
    }
    setForm({...form, [fieldName]: value});
  }
  return (
    <>
      <form className="form-content" onSubmit={(e) => handleSave(e)}>
        <div className="form-field">
          <label>Product Name:</label>
          <input
            type="text"
            required
            onChange={(e) => handleChange("productName", e)}
          />
        </div>
        <div className="form-field">
          <label>Scrum Master:</label>
          <input
            type="text"
            required
            onChange={(e) => handleChange("scrumMasterName", e)}
          />
        </div>
        <div className="form-field">
          <label>Product Owner:</label>
          <input
            type="text"
            required
            onChange={(e) => handleChange("productOwnerName", e)}
          />
        </div>
        <div className="form-field">
          <label>Developers:</label>
          <input
            type="text"
            onChange={(e) => setCurrentDeveloper(e.target.value)}
          />
          <button
            type="button"
            disabled={form?.Developers?.length === 5 ? true : false}
            onClick={handleDeveloper}
          >
            Add Developer
          </button>
          <ul className="form-developers-ul">
            {form?.Developers?.length
              ? form.Developers.map((developer, i) => (
                  <li key={developer + i}>
                    <ul>
                      <li>{developer}</li>
                      <button type="button" onClick={() => removeDeveloper(i)}>
                        X
                      </button>
                    </ul>
                  </li>
                ))
              : null}
          </ul>
        </div>
        <div className="form-field">
          <label htmlFor="methodology">Methodology:</label>

          <select
            name="methodology"
            id="methodology"
            defaultValue={""}
            onChange={(e) => handleChange("methodology", e)}
          >
            <option hidden value="">
              Select Methodology
            </option>
            <option value="Agile">Agile</option>
            <option value="Waterfall">Waterfall</option>
          </select>
        </div>
        <div className="form-field">
          <label>Start Date:</label>
          <input type="date" onChange={(e) => handleChange("startDate", e)} />
        </div>
        <p style={{display: postError ? "" : "none"}}>
          {errorMessage ? errorMessage : "An error occured. Please try again."}
        </p>
        <div className="form-buttons">
          <button type="submit">Save</button>
          <button type="reset" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
