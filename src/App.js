import "./App.css";
import Login from "./components/Login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import TableData from "./components/TableData";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";

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
    {
      path: "/edituser",
      element: <EditUser />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
