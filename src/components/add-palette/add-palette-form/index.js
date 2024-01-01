import { useState } from "react";
import "./add-palette-form.css";

function AddPaletteForm({
  colors,
  token,
  setAddPaletteSuccess,
  ApiBlock,
  userId,
  setDisplayAddPalette,
}) {
  const [addPaletteErrorMsg, setAddPaletteErrorMsg] = useState("");
  const [newPaletteName, setNewPaletteName] = useState("");
  const [isPrivate, setIsPrivate] = useState(true);

  function handleAddPalette(e) {
    e.preventDefault();
    let newHexColors = colors.map((color) => color.color);

    fetch(ApiBlock + "/palettes/add", {
      method: "POST",
      mode: "cors",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: newPaletteName,
        hex_colors: newHexColors,
        public: isPrivate,
        user_id: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message == "Palette added") {
          setAddPaletteSuccess(true);
          setDisplayAddPalette(false)
          setTimeout(() => {
            setAddPaletteSuccess(false);
          }, 1500);
        } else {
          setAddPaletteErrorMsg(data.message);
        }
      });
  }

  function handleChange(e) {
    const inputValue = e.target.value;
    if (inputValue.length <= 14) {
      setNewPaletteName(inputValue);
      setAddPaletteErrorMsg("");
    } else {
      setAddPaletteErrorMsg("Palette name must be 14 characters or less");
    }
  }

  function handleCheckboxChange() {
    setIsPrivate(!isPrivate);
  }

  return (
    <>
      <form onSubmit={handleAddPalette} className="add-palette-form small-copy">
        <div className="form-seg-vert">
          <label htmlFor="paletteName">Palette name</label>
          <input
            type="text"
            id="paletteName"
            name="paletteName"
            value={newPaletteName}
            onChange={handleChange}
            required
          />
        </div>
        <p
          className={`tiny-print form-info2 ${
            addPaletteErrorMsg ? "red" : "grey"
          }`}
        >
          between 1 and 14 characters*
        </p>
        <div className="form-seg-checkbox">
          <label className="tiny-print" htmlFor="privateCheckbox">
            Make Palette Private
          </label>
          <input
            type="checkbox"
            id="privateCheckbox"
            name="privateCheckbox"
            checked={isPrivate}
            onChange={handleCheckboxChange}
          />
        </div>
        <div className="btn-container">
          <input className="small-copy" type="submit" value="Submit" />
        </div>
      </form>
    </>
  );
}

export default AddPaletteForm;
