import React, { useEffect } from "react";
import GoogleMap from "../components/organisms/maps/GoogleMap";
import useGeolocation from "../hooks/useGeolocation";
import useContinuousGPS from "../hooks/useContinuousGPS";
import { useCoinContext } from "../provider/CoinProvider";
import AuthProvider from "../provider/AuthProvider";
function App() {
  const locate = useGeolocation();
  const gpsData = useContinuousGPS();
  const coinContext = useCoinContext();
  useEffect(() => {
    coinContext.setMode("app");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AuthProvider>
      {locate.coordinates && (
        <GoogleMap
          defaultPosition={{
            lat: gpsData?.coords.latitude ?? 0,
            lng: gpsData?.coords.longitude ?? 0,
          }}
        />
      )}
    </AuthProvider>
  );
}

export default App;
