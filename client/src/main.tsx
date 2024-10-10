import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import AuthProvider from "./providers/AuthProvider.tsx";
import { HelmetProvider } from "react-helmet-async";

import { PostHogProvider } from "posthog-js/react";

const options = {
  api_host: "https://us.i.posthog.com",
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PostHogProvider
      apiKey={"phc_yfbWxQQoKcRBqcuN2q3YFCzU81hzyy1IjLk8TMOddnB"}
      options={options}
    >
      <HelmetProvider>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </HelmetProvider>
    </PostHogProvider>
  </React.StrictMode>,
);
