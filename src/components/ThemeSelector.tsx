import React, { Suspense, useEffect, useState } from "react";
import { EuiProvider, EuiThemeColorMode, EuiThemeProvider } from "@elastic/eui";

const LightTheme = React.lazy(() => import("./Themes/LightTheme"));
const DarkTheme = React.lazy(() => import("./Themes/DarkTheme"));

const ThemeSelector = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<EuiThemeColorMode>("light");
  useEffect(() => {
    const theme = localStorage.getItem("zoom-theme");
    if (theme) {
      setTheme(theme as EuiThemeColorMode);
    } else {
      localStorage.setItem("zoom-theme", "light");
    }
  }, []);
  return (
    <>
      <Suspense fallback={<></>}>
        {theme === "dark" ? <DarkTheme /> : <LightTheme />}
        {children}
      </Suspense>
    </>
  );
};

export default ThemeSelector;
