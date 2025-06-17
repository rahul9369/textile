import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./Components/AppLAyout";
import Hero from "./Components/Hero";
import Signin from "./Components/Signing";
import CreateAccountForm from "./Components/CreateAccountForm";
import TextileDesign from "./Components/TextileDesign/textileDesign";
import TextilePage from "./Components/TextileDesign/Textilepage";
import Contact from "./Components/Contact";
import AccountPage from "./Components/Account";
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

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
