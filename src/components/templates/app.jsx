import { Outlet } from "react-router-dom";
import MainHeader from "../organisms/MainHeader";
import React from 'react';

const App = () => {
  return (
    <div>
      <MainHeader />
      <Outlet />
    </div>
  );
}

export default App;
