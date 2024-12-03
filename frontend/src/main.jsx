import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import reducer from "./reducer/reducer.js";
import "./index.css";
import App from "./App.jsx";
import ToDoContainer from "./components/ToDoContainer/ToDoContainer.jsx";
import AddToDo from "./components/AddToDo/AddToDo.jsx";
import Account from "./components/Account/Account.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <ToDoContainer />,
      },
      {
        path: "/add",
        element: <AddToDo />,
      },
      {
        path: "/account",
        element: <Account />,
      },
    ],
  },
]);

const store = configureStore({ reducer });

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
