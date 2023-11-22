import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../pages/App";
import History from "../pages/History";
import { ScrollToTop } from "../api/ScrollToTop";
import RegisterPinMap from "../pages/RegisterPinMap";
import SwipeableEdgeDrawer from "../components/organisms/SwipeableEdgeDrawer";
import { useModal } from "../hooks/useModal";
import { MenuIcon, PrevIcon } from "../assets";
import { useCoinContext } from "../provider/CoinProvider";
import { useEffect } from "react";
import { Contract } from "../api/contract";
import { MaizoStatus } from "../components/molecules/MaizoStatus";

export const Router = () => {
  const menuModal = useModal();
  const { coin, isFetch, setCoin, setIsFetch, mode, setMode } =
    useCoinContext();
  useEffect(() => {
    Contract().then(() => console.log("contract"));
    setCoin(2000);
    setIsFetch(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="bg-black">
      <div className="h-[1000px] w-full md:w-[500px] lg:w-[500px] m-auto bg-white absolute -z-10" />
      {isFetch && <MaizoStatus coin={coin} />}
      {mode !== "history" ? (
        <MenuIcon
          className="fixed top-5 left-5 z-50"
          onClick={() => {
            menuModal.openModal();
          }}
        />
      ) : (
        <PrevIcon
          className="fixed top-5 left-5 z-50"
          onClick={() => {
            setMode("app");
            window.location.href = "/";
          }}
        />
      )}
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/register" element={<RegisterPinMap />} />
          <Route path="/history" element={<History />} />
          {/* Not Found */}
          <Route path="*" element={<div>404 NotFound</div>} />
        </Routes>
        <SwipeableEdgeDrawer
          open={menuModal.isOpen}
          setOpen={menuModal.openModal}
          setClose={menuModal.closeModal}
        />
      </BrowserRouter>
    </div>
  );
};

export default Router;
