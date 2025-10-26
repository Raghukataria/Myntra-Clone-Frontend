import  React from 'react'
import {ReactDOM} from 'react-dom/client'
import { createRoot } from 'react-dom/client'
import App from "./routes/App";
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './routes/Home.jsx'
import Bag from './routes/Bag.jsx'
import {createBrowserRouter , RouterProvider} from "react-router-dom"
import myntraStore from './store';
import {Provider} from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home/> },
      {
        path: "/bag",
        element: <Bag/>,
        // action: createPostAction,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={myntraStore}>
    <RouterProvider router= {router}/>
    </Provider>

  </React.StrictMode>,
)
