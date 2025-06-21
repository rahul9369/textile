import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./Components/AppLAyout";
import Hero from "./Components/Hero";
import Signin from "./Components/Signing";
import CreateAccountForm from "./Components/CreateAccountForm";
import TextileDesign from "./Components/TextileDesign/textileDesign";
import TextilePage from "./Components/TextileDesign/Textilepage";
import Contact from "./Components/Contact";
import AccountPage from "./Components/Account";
import { store } from "./store";
import { Provider, useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadUserFromStorage } from "./features/auth/authSlice";
import { fetchPurchasedPlan } from "./features/plan/planSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Hero />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/get",
        element: <CreateAccountForm />,
      },
      {
        path: "/textile",
        element: <TextileDesign />,
      },
      {
        path: "/textileai",
        element: <TextilePage />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/account",
        element: <AccountPage />,
      },
    ],
  },
]);

function AppInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromStorage());
    dispatch(fetchPurchasedPlan());
  }, [dispatch]);

  return <RouterProvider router={appRouter} />;
}

function App() {
  return (
    <Provider store={store}>
      <ToastContainer position="top-right" autoClose={3000} />
      <AppInitializer />
    </Provider>
  );
}

export default App;
