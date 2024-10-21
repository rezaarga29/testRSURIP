import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import UserLayout from "./components/UserLayout";
import AddKaryawan from "./pages/AddKaryawan";
import UserPage from "./pages/HomePage";
import EditKaryawan from "./pages/EditKaryawan";

const router = createBrowserRouter([
  {
    element: <UserLayout />,
    loader: () => {
      if (!localStorage.access_token) {
        return redirect("/");
      }
      return null;
    },
    children: [
      {
        path: "/add-karyawan",
        element: <AddKaryawan />,
      },
      {
        path: "/homepage",
        element: <UserPage />,
      },
      {
        path: "/employee/edit/:id",
        element: <EditKaryawan />,
      },
    ],
  },
  {
    path: "/",
    element: <LoginPage />,
    loader: () => {
      if (localStorage.access_token) {
        return redirect("/homepage");
      }
      return null;
    },
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
