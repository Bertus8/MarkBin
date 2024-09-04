import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../../client/components/header";
import BinsMain from "../../client/components/bins/bins_main";
import BinList from "../../client/components/bins/bin_list";

export const App = (props) => (
  <Router>
    <Header />
    {props.children}
    <Routes>
      <Route path="/" />
      <Route index element={<BinList />} />
      <Route path="/bins/:id" element={<BinsMain />} />
    </Routes>
  </Router>
);
