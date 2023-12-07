import * as React from "react";
import { createContext, useContext, useState } from "react";
import { ModeTypes, postTypes } from "../types";
interface CoinProps {
  coin: number;
  isFetch: boolean;
  isPrime: boolean;
  mode: ModeTypes;
  selectPos: postTypes;
  setCoin: React.Dispatch<React.SetStateAction<number>>;
  setIsFetch: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPrime: React.Dispatch<React.SetStateAction<boolean>>;
  setMode: React.Dispatch<React.SetStateAction<ModeTypes>>;
  setSelectPos: React.Dispatch<React.SetStateAction<postTypes>>;
}
const CoinContext = createContext<CoinProps>({
  coin: 0,
  isFetch: false,
  isPrime: false,
  mode: "app",
  selectPos: {
    id: "",
    lat: 0,
    lng: 0,
    image: "",
    name: "",
    value: 0,
  },
  setCoin: () => {},
  setIsFetch: () => {},
  setIsPrime: () => {},
  setMode: () => {},
  setSelectPos: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const useCoinContext = () => {
  return useContext(CoinContext);
};

export const CoinProvider = ({ children }: Props) => {
  const [coin, setCoin] = useState<number>(0);
  const [isLogin, setIsFetch] = useState<boolean>(false);
  const [isPrime, setIsPrime] = useState<boolean>(false);
  const [mode, setMode] = useState<ModeTypes>("app");
  const [position, setPosition] = useState<postTypes>({} as postTypes);

  const value: CoinProps = {
    coin: coin,
    isFetch: isLogin,
    isPrime: isPrime,
    mode: mode,
    selectPos: position,
    setCoin: setCoin,
    setIsFetch: setIsFetch,
    setIsPrime: setIsPrime,
    setMode: setMode,
    setSelectPos: setPosition,
  };

  return <CoinContext.Provider value={value}>{children}</CoinContext.Provider>;
};
