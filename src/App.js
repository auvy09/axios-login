import "./App.css";
import Login from "./components/Login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import TableData from "./components/TableData";
import AddUser from "./components/AddUser";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },

    {
      path: "/tabledata",
      element: <TableData />,
    },
    {
      path: "/adduser",
      element: <AddUser />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
