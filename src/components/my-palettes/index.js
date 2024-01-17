import { useEffect, useState } from "react";
import "./my-palettes.css";
import MyPalette from "./my-palette";
import Notification from "../notification";
import LikedPalette from "./liked-palette";
import { useNavigate } from "react-router-dom";

function MyPalettes({
  ApiBlock,
  updateColorsWithSavedPalette,
  token,
  setDisplaylogin,
  setCopySuccess,
  getContrastColor
}) {
  const [mySavedPalettes, setMySavedPalettes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [myPalettesSearchFilter, setMyPaletteSearchFilter] = useState("");
  const [showSavedPalettes, setShowSavedPalettes] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false)
  const [makePublicSuccess, setMakePublicSuccess] = useState(false)
  const [makePrivateSuccess, setMakePrivateSuccess] = useState(false)
  const [unlikePaletteSuccess, setUnlikePaletteSuccess] = useState(false)

  const navigate = useNavigate();
  useEffect(() =>{
    if(!token){
      navigate("/")
    }
  })

  function getAllMyPalettes(showSavedPalettes) {
    const searchQueryString = myPalettesSearchFilter
      ? `?search=${myPalettesSearchFilter}`
      : "";
    const endPoint = showSavedPalettes ? "/palettes/liked" : "/palettes";
    fetch(ApiBlock + `${endPoint}${searchQueryString}`, {
      method: "GET",
      mode: "cors", 
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const palettes = data.data.map((palette) => ({
          name: palette.name,
          colors: palette.hex_colors,
          id: palette.id,
          likes: palette.likes,
          visible_status: palette.public
        }));
        setMySavedPalettes(palettes);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getAllMyPalettes(showSavedPalettes);
  }, [showSavedPalettes, myPalettesSearchFilter]);


  return (
    <>
      <div className="page-heading">
        <h2 className="massive-copy">My Palettes</h2>
        <p className="med-copy grey">
          View and manage your liked and saved palettes.
        </p>
      </div>
      <div className="filter-bar">
        <div className="search-container">
          <input
            className="searchFilter"
            type="text"
            id="search"
            name="search"
            placeholder="Search..."
            value={myPalettesSearchFilter}
            onChange={(e) => setMyPaletteSearchFilter(e.target.value)}
          />
          <div className="search-icon">
            <img src="../../icons/search_black.svg" alt="Search Icon" />
          </div>
        </div>
        <div className="order-bar">
          <label className="small-copy grey" htmlFor="filter">
            Show my:
          </label>
          <select
            name="filter"
            id="filter"
            onChange={() => {
              setShowSavedPalettes(!showSavedPalettes);
            }}
          >
            <option value="newest">Saved palettes</option>
            <option value="most_likes">Liked palettes</option>
          </select>
          <div className="order-icon">
            <img src="../../icons/down_black.svg" alt="Down Arrow" />
          </div>
        </div>
      </div>
      <div className="display-palettes-section">
        {isLoading ? (
          <p className="med-copy">Loading...</p>
        ) : mySavedPalettes.length > 0 ? (
          mySavedPalettes.map((palette, index) =>
            showSavedPalettes ? (
              <LikedPalette
                index={index}
                key={palette.id}
                name={palette.name}
                colors={palette.colors}
                id={palette.id}
                likes={palette.likes}
                updateColorsWithSavedPalette={updateColorsWithSavedPalette}
                ApiBlock={ApiBlock}
                token={token}
                setDisplaylogin={setDisplaylogin}
                setCopySuccess={setCopySuccess}
                publicStatus={palette.visible_status}
                showSavedPalettes={showSavedPalettes}
                getAllMyPalettes={getAllMyPalettes}
                setUnlikePaletteSuccess={setUnlikePaletteSuccess}
                getContrastColor={getContrastColor}
              />
            ) : (
              <MyPalette
                index={index}
                key={palette.id}
                name={palette.name}
                colors={palette.colors}
                id={palette.id}
                likes={palette.likes}
                updateColorsWithSavedPalette={updateColorsWithSavedPalette}
                ApiBlock={ApiBlock}
                token={token}
                setDisplaylogin={setDisplaylogin}
                setCopySuccess={setCopySuccess}
                publicStatus={palette.visible_status}
                setDeleteSuccess={setDeleteSuccess}
                showSavedPalettes={showSavedPalettes}
                getAllMyPalettes={getAllMyPalettes}
                setMakePublicSuccess={setMakePublicSuccess}
                setMakePrivateSuccess={setMakePrivateSuccess}
                getContrastColor={getContrastColor}
              />
            )
          )
        ) : (
          <p className="med-copy">No palettes found</p>
        )}
      </div>
      {deleteSuccess && (
          <Notification
            noteIconSrc={"../../icons/tick_white.svg"}
            noteCopy={"Palette deleted"}
            noteIconSrcCopy={"tick icon"}
          />
        )}
        {makePublicSuccess && (
          <Notification
            noteIconSrc={"../../icons/tick_white.svg"}
            noteCopy={"Palette made public"}
            noteIconSrcCopy={"tick icon"}
          />
        )}
        {makePrivateSuccess && (
          <Notification
            noteIconSrc={"../../icons/tick_white.svg"}
            noteCopy={"Palette made private"}
            noteIconSrcCopy={"tick icon"}
          />
        )}
        {unlikePaletteSuccess && (
          <Notification
            noteIconSrc={"../../icons/tick_white.svg"}
            noteCopy={"Palette unliked"}
            noteIconSrcCopy={"tick icon"}
          />
        )}
    </>
  );
}

export default MyPalettes;
