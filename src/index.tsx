import React from "react";
import ReactDOM from "react-dom/client";
import {
  CssVarsProvider,
  StyledEngineProvider,
  extendTheme,
} from "@mui/joy/styles";

import App from "./App";
import { CssBaseline } from "@mui/joy";

const uiTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        background: {
          body: "var(--joy-palette-neutral-50)",
        },
      },
    },
    dark: {
      palette: {
        background: {
          body: "var(--joy-palette-common-black)",
          surface: "var(--joy-palette-neutral-900)",
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <CssVarsProvider
        disableTransitionOnChange
        theme={uiTheme}
        defaultMode="light"
        modeStorageKey="app-apperance-mode"
      >
        <CssBaseline />
        <App />
      </CssVarsProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
