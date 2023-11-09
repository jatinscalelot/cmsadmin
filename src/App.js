import React from "react";
import AllRoutes from "./routes/AllRoutes";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ToastContainer } from "react-toastify";
import { history } from "./components/_utils";
import CardHolderAddCard from "./components/Cardholder/CardHolderAddCard";
import { Toaster } from "sonner";
// import { socket } from "./Socket";

function App() {
  history.navigate = useNavigate();

  return (

    <>
      <div className="main min-h-screen w-full">
        <Toaster position="top-center"
          richColors={true}
          theme="light" />
        <AllRoutes />
        {/* <CardHolderAddCard /> */}
      </div>
    </>

  );
}

export default App;
