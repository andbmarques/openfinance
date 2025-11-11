import * as React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "./components/ui/provider.jsx";
import App from "./client/app.jsx";
import { AppContextProvider } from "./client/context/app.context.jsx";
import { DataContextProvider } from "./client/context/data.context.jsx";

const root = createRoot(document.body);
root.render(
  <>
    <Provider>
      <AppContextProvider>
        <DataContextProvider>
          <App />
        </DataContextProvider>
      </AppContextProvider>
    </Provider>
  </>,
);
