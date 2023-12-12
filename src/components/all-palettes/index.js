import { useEffect, useState } from "react";
import "./all-palettes.css";
import SavedPalette from "./saved-palette";
import Notification from "../notification";

function AllPalettes({ 
    ApiBlock,
    updateColorsWithSavedPalette,
    token,
    setDisplaylogin,
    setCopySuccess
}) {
  const [savedPalettes, setSavedPalettes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allPalettesSearchFiler, setAllPaletteSearchFilter] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [isLiked, setIsLiked] = useState(false);

    function getAllPalettes() {
    const searchQueryString = allPalettesSearchFiler ? `&search=${allPalettesSearchFiler}` : "";
    const orderQueryString = orderBy ? `&order_by=${orderBy}` : "";
    fetch(ApiBlock + `/palettes/all?${searchQueryString}${orderQueryString}`)
      .then((response) => response.json())
      .then((data) => {
        const palettes = data.data.map((palette) => ({
          name: palette.name,
          colors: palette.hex_colors,
          id: palette.id,
          likes: palette.likes,
        }));

        setSavedPalettes(palettes);
        setIsLoading(false);
      });
    }

    useEffect(() => {
        getAllPalettes()
    }, [allPalettesSearchFiler, orderBy]);

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
            value={allPalettesSearchFiler}
            onChange={(e) => setAllPaletteSearchFilter(e.target.value)}
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
            value={orderBy}
            onChange={(e) => setOrderBy(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="most_likes">Most Popular</option>
          </select>
        </div>
      </div>
      <div className="display-palettes-section">
        {isLoading ? (
          <p className="med-copy">Loading...</p>
        ) : savedPalettes.length > 0 ? (
          savedPalettes.map((palette, index) => (
            <SavedPalette
              index={index}
              key={palette.id}
              name={palette.name}
              colors={palette.colors}
              id={palette.id}
              likes={palette.likes}
              updateColorsWithSavedPalette={updateColorsWithSavedPalette}
              ApiBlock={ApiBlock}
              token={token}
              setIsLiked={setIsLiked}
              getAllPalettes={getAllPalettes}
              setDisplaylogin={setDisplaylogin}
              setCopySuccess={setCopySuccess}
            />
          ))
        ) : (
          <p className="med-copy">No palettes found</p>
        )}
      </div>
      {isLiked && (
          <Notification
            noteIconSrc={"../../icons/like_white.svg"}
            noteCopy={"Palette liked!"}
            noteIconSrcCopy={"heart icon"}
          />
        )}
    </>
  );
}

export default AllPalettes;
