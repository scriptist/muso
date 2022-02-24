import React from "react";
import { useLayoutEffect } from "react";
import ReactDOM from "react-dom";
import { useLocation } from "react-router";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import HomePage from "./components/HomePage";
import SongPage from "./components/SongPage";
import songs from "./songs";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {Array.from(songs.entries()).map(([slug, song]) => (
          <Route
            key={slug}
            path={`/${slug}`}
            element={<SongPage song={song} />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

function ScrollToTop() {
  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}
