import './App.css';
import { Navigate, useRoutes } from 'react-router-dom';
import NotPermission from './app/pages/error/NotPermission';
import { indexRouter } from './app/routers/indexRouter'
import NotFound from './app/pages/error/NotFound';
import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import './assets/css/spinner.css';
export const spinner = (
  <div className="progress-spinner text-center">
    <div className="swm-loader"></div>
  </div>
);

export default function App() {
  let router = useRoutes([
    { path: 'not-permission', element: <NotPermission /> }, //403
    { path: '/', element: <Navigate to="/dashboard" replace /> },
    indexRouter,
    { path: '*', element: <NotFound /> }, //404
  ]);
  return (
    <div className="App">
      <ToastContainer></ToastContainer>
      <Suspense fallback={spinner}>{router}</Suspense>
    </div>
  );
}


