import {
  GoogleMap as GoogleMapComponent,
  MarkerF,
  Circle,
} from "@react-google-maps/api";
import React, { FC, useEffect, useRef, useState } from "react";
import { useMap } from "../../../hooks/useMap";
import { registerMap } from "../../../styles/GoogleMapStyls";
import {
  RandomID,
  generateRandomNumberInRange,
  loadFromCache,
  saveToCache,
} from "../../../api/helper";
import { Fab } from "@mui/material";
import { Gps } from "../../atoms/Icon";
import { MarkerTypes, postTypes } from "../../../types";
import RegisterModal from "../modals/RegisterModal";
import { useModal } from "../../../hooks/useModal";
import { useCoinContext } from "../../../provider/CoinProvider";
import { postLocation } from "../../../api/contract";
// import { useNavigate } from "react-router-dom";
type Props = {
  defaultPosition: {
    lat: number;
    lng: number;
  };
};

const RegisterMap: FC<Props> = (props) => {
  const noiseListRef = useRef<number[]>(
    [...new Array(10)].map((_, index) => index)
  );
  const [zoom, setZoom] = useState<number>(12);
  const [marker, setMarker] = useState<MarkerTypes>({} as MarkerTypes);
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const registerModal = useModal();
  const { coin, setCoin } = useCoinContext();
  // const navigate = useNavigate();
  const [center, setCenter] = useState({
    lat: props.defaultPosition.lat,
    lng: props.defaultPosition.lng,
  });

  const moveToNewLocation = (newLat: number, newLng: number) => {
    setCenter({ lat: newLat, lng: newLng });
  };
  useEffect(() => {
    setTimeout(() => {
      setZoom(17);
    }, 1000);
    const loadNoiseList = loadFromCache("noizeList");
    if (loadNoiseList === null) {
      const noiseList = [...new Array(10)].map((_) =>
        generateRandomNumberInRange()
      );
      saveToCache("noizeList", noiseList);
      noiseListRef.current = noiseList;
    } else {
      noiseListRef.current = loadNoiseList;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { isLoaded, onLoad } = useMap({
    defaultPosition: props.defaultPosition,
  });

  const containerStyle = {
    width: "100vw",
    height: "100vh",
  };
  const googleMapOptions = {
    styles: registerMap,
    disableDefaultUI: true,
  };

  return (
    <>
      {isLoaded ? (
        <GoogleMapComponent
          options={googleMapOptions}
          mapContainerStyle={containerStyle}
          onLoad={onLoad}
          center={center}
          zoom={zoom}
          onDrag={() => {
            setIsDrag(true);
          }}
          onClick={(event) => {
            const lat = event?.latLng?.lat() ?? 0;
            const lng = event?.latLng?.lng() ?? 0;
            const newMarker: MarkerTypes = {
              position: {
                lat: lat,
                lng: lng,
              },
            };
            setMarker(newMarker);
            registerModal.openModal();
          }}
        >
          <MarkerF position={marker.position} />
          <Circle
            options={{
              fillColor: "#fff",
              fillOpacity: 1,
              strokeColor: "#fff",
              strokeOpacity: 1,
              strokeWeight: 1,
              clickable: true,
              draggable: false,
              editable: false,
              visible: true,
              zIndex: 1,
            }}
            center={{
              lat: props.defaultPosition.lat,
              lng: props.defaultPosition.lng,
            }}
            radius={10}
          />
          <Circle
            options={{
              fillColor: "#0066FF",
              fillOpacity: 1,
              strokeColor: "#0066FF",
              strokeOpacity: 1,
              strokeWeight: 1,
              clickable: true,
              draggable: false,
              editable: false,
              visible: true,
              zIndex: 1,
            }}
            center={{
              lat: props.defaultPosition.lat,
              lng: props.defaultPosition.lng,
            }}
            radius={5}
          />
          <Circle
            options={{
              fillColor: "#0066FF",
              fillOpacity: 0.2,
              strokeColor: "#0066FF",
              strokeOpacity: 1,
              strokeWeight: 1,
              clickable: true,
              draggable: false,
              editable: false,
              visible: true,
              zIndex: 1,
            }}
            center={{
              lat: props.defaultPosition.lat,
              lng: props.defaultPosition.lng,
            }}
            radius={35}
          />
          <Fab
            className="fixed bottom-[140px] right-5 w-[65px] h-[65px] bg-black bg-opacity-50"
            onClick={() => {
              moveToNewLocation(
                props.defaultPosition.lat,
                props.defaultPosition.lng
              );
              setZoom(17);
              setIsDrag(false);
            }}
          >
            <Gps fill={isDrag ? "#fff" : "#6BA6FF"} size="32" />
          </Fab>
        </GoogleMapComponent>
      ) : (
        "loading"
      )}

      <RegisterModal
        open={registerModal.isOpen}
        handleClose={registerModal.closeModal}
        name={"chosenPin.name"}
        value={120}
        image={"chosenPin.image"}
        onClick={(e) => {
          if (coin - e.value < 0) {
            alert("コインが不足しています");
            return;
          }
          const postData: postTypes = {
            id: RandomID(),
            name: e.name,
            value: e.value,
            image: e.image,
            lat: marker.position.lat,
            lng: marker.position.lng,
          };
          postLocation(postData);
          console.log(postData);
          registerModal.closeModal();
          setCoin(coin - e.value);
          // navigate("/");
        }}
      />
    </>
  );
};

export default React.memo(RegisterMap);
