import React, { useEffect } from "react";
import useGeolocation from "../hooks/useGeolocation";
import useContinuousGPS from "../hooks/useContinuousGPS";
import RegisterMap from "../components/organisms/maps/RegisterMap";
import { DisplayText } from "../components/atoms/DisplayText";
import { useCoinContext } from "../provider/CoinProvider";
function App() {
  const locate = useGeolocation();
  const gpsData = useContinuousGPS();
  const coinContext = useCoinContext();
  useEffect(() => {
    coinContext.setMode("register");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <DisplayText text={"選択してください"} className={"top-[15%] left-1/2"} />
      {locate.coordinates && (
        <RegisterMap
          defaultPosition={{
            lat: gpsData?.coords.latitude ?? 0,
            lng: gpsData?.coords.longitude ?? 0,
          }}
        />
      )}
    </div>
  );
}

export default App;
