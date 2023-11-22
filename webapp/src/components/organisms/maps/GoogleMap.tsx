import {
  GoogleMap as GoogleMapComponent,
  InfoWindowF,
  MarkerF,
  Circle,
} from "@react-google-maps/api";
import React, { FC, useEffect, useRef, useState } from "react";
import { useMap } from "../../../hooks/useMap";
import { styleMap } from "../../../styles/GoogleMapStyls";
import mapPin from "../../../config/mapPin.json";
import {
  generateRandomNumberInRange,
  loadFromCache,
  rangePos,
  saveToCache,
} from "../../../api/helper";
import GetModal from "../modals/GetModal";
import { useModal } from "../../../hooks/useModal";
import { Fab } from "@mui/material";
import { Gps } from "../../atoms/Icon";
import CoinValueModal from "../modals/CoinValueModal";
import { useCoinContext } from "../../../provider/CoinProvider";
type Props = {
  defaultPosition: {
    lat: number;
    lng: number;
  };
};

const GoogleMap: FC<Props> = (props) => {
  const noiseListRef = useRef<number[]>(
    [...new Array(10)].map((_, index) => index)
  );
  const [zoom, setZoom] = useState<number>(12);
  const getModal = useModal();
  const coinModal = useModal();
  const [isMaizoIllust, setIsMaizoIllust] = useState<boolean>(false);
  const coinContext = useCoinContext();
  const [chosenPin, setChosenPin] = useState({
    name: "",
    value: 0,
    image: "",
  });
  const [isDrag, setIsDrag] = useState<boolean>(false);
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
    styles: styleMap,
    disableDefaultUI: true,
  };

  const getCoin = () => {
    setIsMaizoIllust(true);
    setTimeout(() => {
      coinModal.openModal();
    }, 2000);
  };
  return (
    <>
      {isLoaded ? (
        <GoogleMapComponent
          options={googleMapOptions}
          mapContainerStyle={containerStyle}
          onLoad={onLoad}
          zoom={zoom}
          center={center}
          onDrag={() => {
            setIsDrag(true);
          }}
        >
          {mapPin.map((pin, index) => {
            return (
              <div key={index}>
                {coinContext.isPrime && (
                  <MarkerF
                    position={{
                      lat: pin.lat,
                      lng: pin.lng,
                    }}
                    icon={{
                      url: "https://firebasestorage.googleapis.com/v0/b/gyly-e2964.appspot.com/o/treasure_point.png?alt=media&token=27b2961d-62d8-4f5b-8605-217b31a5fe86",
                      anchor: new google.maps.Point(12, 12),
                    }}
                  />
                )}
                {rangePos(pin.lat, pin.lng, props.defaultPosition) && (
                  <InfoWindowF
                    options={{
                      pixelOffset: new window.google.maps.Size(0, -10),
                      disableAutoPan: true,
                    }}
                    position={{
                      lat: pin.lat,
                      lng: pin.lng,
                    }}
                  >
                    <div
                      onClick={() => {
                        setChosenPin({
                          name: pin.name,
                          value: pin.value,
                          image: pin.image,
                        });
                        getModal.openModal();
                      }}
                    >
                      <div className="text-white text-center font-bold text-[20px]">
                        {pin.name.split(/\s+/).map((word, index, array) => (
                          <React.Fragment key={index}>
                            {word}
                            {index < array.length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </div>
                      <div className="text-white text-center text-[15px] py-4">
                        獲得コイン：~{pin.value}
                      </div>
                    </div>
                  </InfoWindowF>
                )}
                {!coinContext.isPrime && (
                  <Circle
                    options={{
                      fillColor: "#ffffff",
                      fillOpacity: 0.2,
                      strokeColor: "#ffffff",
                      strokeOpacity: 1,
                      strokeWeight: 1,
                      clickable: true,
                      draggable: false,
                      editable: false,
                      visible: true,
                      zIndex: 1,
                    }}
                    center={{
                      lat: pin.lat * noiseListRef.current[index % 10],
                      lng: pin.lng * noiseListRef.current[index % 10],
                    }}
                    radius={390}
                  />
                )}
              </div>
            );
          })}
          <MarkerF
            position={{
              lat: props.defaultPosition.lat,
              lng: props.defaultPosition.lng,
            }}
            icon={{
              url: "https://firebasestorage.googleapis.com/v0/b/gyly-e2964.appspot.com/o/Group%2010.png?alt=media&token=dba02e0a-fbd5-4a81-8e0b-eca88233e2c4",
              anchor: new google.maps.Point(14, 14),
            }}
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
              setZoom(18);
              setIsDrag(false);
            }}
          >
            <Gps fill={isDrag ? "#fff" : "#6BA6FF"} size="32" />
          </Fab>
        </GoogleMapComponent>
      ) : (
        <div className="w-[100vw] h-[100vh] bg-black" />
      )}
      <GetModal
        open={getModal.isOpen}
        handleClose={getModal.closeModal}
        name={chosenPin.name}
        value={chosenPin.value}
        image={chosenPin.image}
        onClick={() => {
          getModal.closeModal();
          getCoin();
        }}
      />
      {isMaizoIllust && (
        <img
          className="fixed z-100 rotating-image"
          src="image/maizocoin.png"
          alt="maizocoin"
          width={337}
        />
      )}
      <CoinValueModal
        open={coinModal.isOpen}
        name={""}
        value={0}
        image={""}
        handleClose={() => {
          coinContext.setCoin(coinContext.coin + 235);
          coinModal.closeModal();
          setIsMaizoIllust(false);
        }}
      />
    </>
  );
};

export default React.memo(GoogleMap);
