import { useEffect, useRef } from "react";


function ColorFetcher({ colors, setColors }) {
  const lastColorValues = useRef([]);

  function assignFetchColors() {
    return colors.map((color) => color.color.substring(1));
  }

  useEffect(() => {
    const hexColorKeys = assignFetchColors();
    const fetchPromises = hexColorKeys.map((hexColor, index) => {
      if (lastColorValues.current[index] !== hexColor) {
        return fetch(
          `https://www.thecolorapi.com/id?hex=${hexColor}&format=json`
        )
          .then((res) => res.json())
          .then((colorData) => {
            const updatedColors = [...colors];
            updatedColors[index].name = colorData.name.value;
            updatedColors[index].fontColor = colorData.contrast.value;
            setColors(updatedColors, false);
            lastColorValues.current[index] = hexColor;
          });
      }
      return Promise.resolve();
    });

    Promise.all(fetchPromises).then(() => {});
  }, [colors]);

  useEffect(() => {
    return () => {
      lastColorValues.current = [];
    };
  }, []);
}

export default ColorFetcher;
