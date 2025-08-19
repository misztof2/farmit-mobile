import React, { createContext, useContext, useMemo, useState } from "react";

const ThemeContext = createContext(null);
export const ThemeProvider = ({ children }) => {
  const [accent] = useState("#39b54a");
  const theme = useMemo(
    () => ({
      colors: {
        bg: "#0b1220",
        card: "#111a2b",
        text: "#e6f0ff",
        subtext: "#a2b3d1",
        border: "#1e2a44",
        muted: "#7b8794",
        accent,
      },
    }),
    [accent]
  );
  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
};
export const useTheme = () => useContext(ThemeContext);
