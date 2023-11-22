import { useEffect, useState } from 'react';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface LocationState {
  coordinates: Coordinates | null;
  error: string | null;
}

const useGeolocation = (): LocationState => {
  const [location, setLocation] = useState<LocationState>({
    coordinates: null,
    error: null,
  });

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            coordinates: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
            error: null,
          });
        },
        (error) => {
          setLocation({
            coordinates: null,
            error: error.message,
          });
        }
      );
    } else {
      setLocation({
        coordinates: null,
        error: 'Geolocation is not supported in this browser.',
      });
    }
  }, []);

  return location;
};

export default useGeolocation;
