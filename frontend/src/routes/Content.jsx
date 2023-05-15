import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Main from '../pages/Main/Main';

function Content() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/main" />} />
      <Route path="/main" element={<Main />} />
    </Routes>
  );
}

export default Content;
