import {useEffect, useState} from "react";

export default function AddProduct() {
  const [form, setForm] = useState({});
  const [currentDeveloper, setCurrentDeveloper] = useState("");
  useEffect(() => {
    console.log(form);
  }, [form]);
  function handleDeveloper() {
    setForm({
      ...form,
      Developers: form.Developers
        ? [...form.Developers, currentDeveloper]
        : [currentDeveloper],
    });
  }
  function removeDeveloper(index) {
    const devList = form.Developers;
    const newList = devList
      .map((dev, i) => {
        if (i !== index) return dev;
      })
      .filter(Boolean);
    setForm({...form, Developers: newList});
  }
  function handleChange(fieldName, event) {
    let value = event.target.value;
    if (fieldName === "startDate") {
      value = value.split("-").join("/");
    }
    setForm({...form, [fieldName]: value});
  }
  return (
    <form>
      <label>
        Product Name:
        <input
          type="text"
          required
          onChange={(e) => handleChange("productName", e)}
        />
      </label>
      <label>
        Scrum Master:
        <input
          type="text"
          required
          onChange={(e) => handleChange("scrumMasterName", e)}
        />
      </label>
      <label>
        Product Owner:
        <input
          type="text"
          required
          onChange={(e) => handleChange("productOwnerName", e)}
        />
      </label>
      <label>
        Developers:
        <input
          type="text"
          required
          onChange={(e) => setCurrentDeveloper(e.target.value)}
        />
        <button
          type="button"
          disabled={form?.Developers?.length === 5 ? true : false}
          onClick={handleDeveloper}
        >
          Add Developer
        </button>
        <ul>
          {form?.Developers?.length
            ? form.Developers.map((developer, i) => (
                <li>
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
      <label onChange={(e) => handleChange("methodology", e)}>
        Methodology:
        <input type="radio" id="Agile" name="methodology" value="Agile" />
        <label for="Agile">Agile</label>
        <input
          type="radio"
          id="Waterfall"
          name="methodology"
          value="Waterfall"
        />
        <label for="Waterfall">Waterfall</label>
      </label>
      <label>
        Start Date:
        <input type="date" onChange={(e) => handleChange("startDate", e)} />
      </label>
    </form>
  );
}
