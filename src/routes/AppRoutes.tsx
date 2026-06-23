import { BrowserRouter, Routes, Route } from "react-router-dom";

import { MainLayout } from "../layouts/MainLayout";

import { Home } from "../pages/Home/Home";
import { GameDetails } from "../pages/GameDetails/GameDetails";
import { Favorites } from "../pages/Favorites/Favorites";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/game/:id" element={<GameDetails />} />
          <Route path="/favorites" element={<Favorites />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}