import React, { useEffect } from "react";
import useGeolocation from "../hooks/useGeolocation";
import useContinuousGPS from "../hooks/useContinuousGPS";
import HistoryMap from "../components/organisms/maps/HistoryMap";
import { useCoinContext } from "../provider/CoinProvider";
function History() {
  const locate = useGeolocation();
  const gpsData = useContinuousGPS();
  const coinContext = useCoinContext();
  useEffect(() => {
    coinContext.setMode("history");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {locate.coordinates && (
        <HistoryMap
          defaultPosition={{
            lat: gpsData?.coords.latitude ?? 0,
            lng: gpsData?.coords.longitude ?? 0,
          }}
        />
      )}
    </div>
  );
}

export default History;
