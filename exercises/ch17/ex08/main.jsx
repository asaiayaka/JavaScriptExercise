import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";

// index.htmlの<div id="root">を取得
const container = document.getElementById("root");

// Reactアプリを描画
createRoot(container).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);