import { useEffect, useState } from "react";

// GPSデータを連続的に取得するHooksを定義します。
function useContinuousGPS(): GeolocationPosition | null {
  const [gpsData, setGPSData] = useState<GeolocationPosition | null>(null);

  useEffect(() => {
    let watchId: number | null = null;

    const handleGPSChange = (position: GeolocationPosition) => {
      setGPSData(position);
    };

    const handleError = (error: GeolocationPositionError) => {
      console.error("GPSデータの取得に失敗しました。", error);
    };

    // GPSデータの変更を監視し、変更があるたびにコールバック関数を呼び出します。
    watchId = navigator.geolocation.watchPosition(handleGPSChange, handleError);

    return () => {
      // コンポーネントがアンマウントされるときに監視を停止します。
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  return gpsData;
}

export default useContinuousGPS;
