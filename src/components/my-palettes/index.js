import { useEffect, useState } from "react";
import "./my-palettes.css";
import MyPalette from "./my-palette";

function MyPalettes({ 
    ApiBlock,
    updateColorsWithSavedPalette,
    token,
    setDisplaylogin,
    setCopySuccess
}) {
  const [mySavedPalettes, setMySavedPalettes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [myPalettesSearchFiler, setMyPaletteSearchFilter] = useState("");


    function getAllMyPalettes() {
    }

    useEffect(() => {
    }, []);

  return (
    <>
      <div className="page-heading">
        <h2 className="massive-copy">All Palettes</h2>
        <p className="med-copy grey">
          Get inspired by other users beautiful color schemes.
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
            value={myPalettesSearchFiler}
            onChange={(e) => setMyPaletteSearchFilter(e)}
          />
          <div className="search-icon">
            <img src="../../icons/search_black.svg" alt="Search Icon" />
          </div>
        </div>
        <div className="order-bar">
          <label className="small-copy grey" htmlFor="sort">
            Order By:
          </label>
          <select
            name="sort"
            id="sort"
          >
            <option value="newest">Newest</option>
            <option value="most_likes">Most Popular</option>
          </select>
        </div>
      </div>
      <div className="display-palettes-section">
        {isLoading ? (
          <p className="med-copy">Loading...</p>
        ) : mySavedPalettes.length > 0 ? (
          mySavedPalettes.map((palette, index) => (
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
            />
          ))
        ) : (
          <p className="med-copy">No palettes found</p>
        )}
      </div>
    </>
  );
}

export default MyPalettes;
