import {useEffect, useState} from "react";
import axios from "axios";

export default function EditProduct({
  refreshList,
  setRefreshList,
  setShowEdit,
  showEdit,
  product,
}) {
  const [form, setForm] = useState({});
  const [postError, setPostError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  //state for current developer
  const [currentDeveloper, setCurrentDeveloper] = useState("");

  useEffect(() => {
    setForm(product);
  }, [product]);

  async function handleSave(e) {
    e.preventDefault();
    axios
      .patch("/api/edit-product", form)
      .then(function (response) {
        setForm({});
        setCurrentDeveloper("");
        setShowEdit(false);
        e.target.reset();
        setPostError(false);
        setRefreshList(!refreshList);
      })
      .catch(function (error) {
        const data = error.response.data;
        if (data) {
          setErrorMessage(`${data.message}: ${data.fields.join(",")}`);
        }
        setPostError(true);
      });
  }

  function handleCancel() {
    setForm({});
    setCurrentDeveloper("");
    setShowEdit(false);
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
    <form
      style={{display: showEdit ? "" : "none"}}
      onSubmit={(e) => handleSave(e)}
    >
      <label>
        Product Name:
        <input
          type="text"
          value={form?.productName || ""}
          required
          onChange={(e) => handleChange("productName", e)}
        />
      </label>
      <label>
        Scrum Master:
        <input
          type="text"
          value={form?.scrumMasterName || ""}
          required
          onChange={(e) => handleChange("scrumMasterName", e)}
        />
      </label>
      <label>
        Product Owner:
        <input
          type="text"
          value={form?.productOwnerName || ""}
          required
          onChange={(e) => handleChange("productOwnerName", e)}
        />
      </label>
      <label>
        Developers:
        <input
          type="text"
          onChange={(e) => setCurrentDeveloper(e.target.value)}
        />
        <button
          //button disables once 5 developers have been added
          type="button"
          disabled={form?.Developers?.length === 5 ? true : false}
          onClick={handleDeveloper}
        >
          Add Developer
        </button>
        <ul>
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
      </label>
      <label htmlFor="methodology">Methodology:</label>

      <select
        name="methodology"
        id="methodology"
        defaultValue={form?.methodology || ""}
        onChange={(e) => handleChange("methodology", e)}
      >
        <option hidden value="">
          {form?.methodology}
        </option>
        <option value="Agile">Agile</option>
        <option value="Waterfall">Waterfall</option>
      </select>
      <p style={{display: postError ? "" : "none"}}>
        {errorMessage ? errorMessage : "An error occured. Please try again."}
      </p>
      <button type="submit">Save</button>
      <button type="reset" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
}
