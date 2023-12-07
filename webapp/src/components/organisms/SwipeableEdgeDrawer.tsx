import * as React from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Divider } from "@mui/material";
import { FabIcon } from "../molecules/FabIcon";
import { useNavigate } from "react-router-dom";
import { HistoryContent } from "../molecules/HisotoryContent";
import { useCoinContext } from "../../provider/CoinProvider";
import { useEffect, useState } from "react";
import PremiumModal from "./modals/PremiumModal";
import { useModal } from "../../hooks/useModal";
import { postTypes } from "../../types";
import { getLoacationMaizo, transferFromMaizo } from "../../api/contract";
import { useAuthContext } from "../../provider/AuthProvider";

const drawerBleeding = 56;

interface Props {
  open: boolean;
  setOpen: () => void;
  setClose: () => void;
  window?: () => Window;
}

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor: "#000",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#000",
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: "#212121",
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

export default function SwipeableEdgeDrawer(props: Props) {
  const { authUser } = useAuthContext();
  const { window } = props;
  const navigate = useNavigate();
  const coinContext = useCoinContext();
  const premiumModal = useModal();
  const [primeDeadline, setPrimeDeadline] = useState<Date | null>(null);
  const [mapPin, setMapPin] = useState<postTypes[]>([]);

  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined;

  useEffect(() => {
    (async () => {
      const now = new Date();
      const deadline = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 7
      );
      setPrimeDeadline(deadline);
      setMapPin((await getLoacationMaizo()) as unknown as postTypes[]);
    })();
  }, []);

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />

      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={props.open}
        onClose={props.setClose}
        onOpen={props.setOpen}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: {
            backgroundColor: "#000",
            color: "#fff",
          },
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Typography
            sx={{ p: 2, color: "text.secondary" }}
            className={
              coinContext.isPrime
                ? "text-center mt-3 nicomoji font-bold gradationColor2"
                : "text-center mt-3 nicomoji font-bold"
            }
            style={{
              fontFamily: "nicomoji",
            }}
          >
            MAIZO
          </Typography>
          <Divider />
        </StyledBox>
        <div className="bg-black overflow-y-scroll">
          <div>
            {coinContext.mode !== "history" ? (
              <div>
                <div
                  onClick={() => {
                    if (coinContext.mode === "app") {
                      coinContext.setMode("register");
                      navigate("/register");
                      props.setClose();
                    } else {
                      coinContext.setMode("app");
                      navigate("/");
                      props.setClose();
                    }
                  }}
                  className="bg-[#212121] mt-5 w-[380px] h-[94px] mx-auto rounded-[6px] relative text-[18px] cursor-pointer transition-transform duration-200 ease-in-out hover:scale-105"
                >
                  <div className="flex items-center gap-3 absolute top-1/2 left-4 transform -translate-y-1/2">
                    {coinContext.mode === "app" ? (
                      <>
                        <FabIcon name={"Shovel"} />
                        <div>コインを埋める</div>
                      </>
                    ) : (
                      <>
                        <FabIcon name={"Car"} />
                        <div>探索モード</div>
                      </>
                    )}
                  </div>
                </div>
                <div
                  onClick={() => {
                    navigate("/history");
                    coinContext.setMode("history");
                  }}
                  className="bg-[#212121] mt-2 w-[380px] h-[94px] mx-auto rounded-[6px] relative text-[18px] cursor-pointer transition-transform duration-200 ease-in-out hover:scale-105"
                >
                  <div className="flex items-center gap-3 absolute top-1/2 left-4 transform -translate-y-1/2">
                    <FabIcon name={"Treasure"} />
                    <div>獲得履歴を見る</div>
                  </div>
                </div>
                <div
                  onClick={() => {
                    if (coinContext.isPrime) {
                      coinContext.setIsPrime(false);
                    } else {
                      premiumModal.openModal();
                    }
                  }}
                  className={
                    coinContext.isPrime ? "primeVipIcon" : "noPrimeVipIcon"
                  }
                >
                  <div className="flex items-center gap-3 absolute top-1/2 left-4 transform -translate-y-1/2">
                    <FabIcon name={"Vip"} size={"39"} />
                    <div>
                      {coinContext.isPrime
                        ? `Premium期限: あと${
                            primeDeadline
                              ? primeDeadline.getDate() - new Date().getDate()
                              : 0
                          }日`
                        : "Premiumに登録"}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              mapPin.map((e, index) => (
                <HistoryContent
                  key={index}
                  name={e.name}
                  thumbnail={e.image}
                  value={e.value}
                  onClick={() => {
                    coinContext.setSelectPos({
                      id: e.id,
                      name: e.name,
                      value: e.value,
                      image: e.image,
                      lat: e.lat,
                      lng: e.lng,
                    });
                    props.setClose();
                  }}
                />
              ))
            )}
          </div>
        </div>
        <PremiumModal
          open={premiumModal.isOpen}
          handleClose={premiumModal.closeModal}
          onClick={async () => {
            if (coinContext.coin < 700) {
              alert("コインが足りません");
              return;
            }
            const newCoinValue = await transferFromMaizo(
              700,
              "premium",
              authUser
            );
            coinContext.setCoin(newCoinValue);
            coinContext.setIsPrime(true);
            premiumModal.closeModal();
          }}
        />
      </SwipeableDrawer>
    </Root>
  );
}
