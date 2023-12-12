import { useEffect, useState } from "react";
import "./all-palettes.css";
import SavedPalette from "./saved-palette";

function AllPalettes({ ApiBlock, updateColorsWithSavedPalette }) {
  const [savedPalettes, setSavedPalettes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allPalettesSearchFiler, setAllPaletteSearchFilter] = useState("");

  useEffect(() => {
    const searchQueryString =
    allPalettesSearchFiler !== "" ? "?search=" + allPalettesSearchFiler : "";
    fetch(ApiBlock + "/palettes/all" + searchQueryString)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const palettes = data.data.map((palette) => ({
          name: palette.name,
          colors: palette.hex_colors,
          id: palette.id,
          likes: palette.likes,
        }));

        setSavedPalettes(palettes);
        setIsLoading(false);
      });
  }, [allPalettesSearchFiler]);

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
            />
          ))
        ) : (
          <p className="med-copy">No palettes found</p>
        )}
      </div>
    </>
  );
}

export default AllPalettes;
