import {
  GoogleMap as GoogleMapComponent,
  InfoWindowF,
  MarkerF,
} from "@react-google-maps/api";
import React, { FC, useEffect, useRef, useState } from "react";
import { useMap } from "../../../hooks/useMap";
import { styleMap } from "../../../styles/GoogleMapStyls";
import {
  generateRandomNumberInRange,
  loadFromCache,
  saveToCache,
} from "../../../api/helper";
import { useModal } from "../../../hooks/useModal";
import CoinValueModal from "../modals/CoinValueModal";
import { useCoinContext } from "../../../provider/CoinProvider";
type Props = {
  defaultPosition: {
    lat: number;
    lng: number;
  };
};

const HistoryMap: FC<Props> = (props) => {
  const noiseListRef = useRef<number[]>(
    [...new Array(10)].map((_, index) => index)
  );
  const [zoom, setZoom] = useState<number>(12);
  const coinModal = useModal();
  const [isMaizoIllust, setIsMaizoIllust] = useState<boolean>(false);
  const coinContext = useCoinContext();

  const [center, setCenter] = useState({
    lat: props.defaultPosition.lat,
    lng: props.defaultPosition.lng,
  });

  useEffect(() => {
    setTimeout(() => {
      setZoom(18);
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

  useEffect(() => {
    setCenter({
      lat: coinContext.selectPos.lat,
      lng: coinContext.selectPos.lng,
    });
  }, [coinContext.selectPos]);

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

  return (
    <>
      {isLoaded ? (
        <GoogleMapComponent
          options={googleMapOptions}
          mapContainerStyle={containerStyle}
          onLoad={onLoad}
          zoom={zoom}
          center={center}
        >
          {coinContext.selectPos.lat && (
            <div>
              <MarkerF
                position={{
                  lat: coinContext.selectPos.lat,
                  lng: coinContext.selectPos.lng,
                }}
                icon={{
                  url: "https://firebasestorage.googleapis.com/v0/b/gyly-e2964.appspot.com/o/treasure_point.png?alt=media&token=27b2961d-62d8-4f5b-8605-217b31a5fe86",
                  anchor: new google.maps.Point(12, 12),
                }}
              />
              <InfoWindowF
                options={{
                  pixelOffset: new window.google.maps.Size(0, -10),
                  disableAutoPan: true,
                }}
                position={{
                  lat: coinContext.selectPos.lat,
                  lng: coinContext.selectPos.lng,
                }}
              >
                <div>
                  <div className="text-white text-center font-bold text-[30px] my-3">
                    {coinContext.selectPos.name
                      .split(/\s+/)
                      .map((word, index, array) => (
                        <div className="text-center" key={index}>
                            {word}
                        </div>
                      ))}
                  </div>
                  <img
                    src={coinContext.selectPos.image}
                    alt="thumbnail"
                    className="w-[97%] rounded-lg text-center mx-auto"
                  />
                  <div className="flex gap-3 items-center text-center my-2 justify-center">
                    <div>
                      <img
                        src="image/maizocoin.png"
                        alt="maizocoin"
                        width={30}
                      />
                    </div>
                    <div className="text-white text-center my-3 text-[30px] font-bold gradationColor">
                      {coinContext.selectPos.value}
                    </div>
                  </div>
                </div>
              </InfoWindowF>
            </div>
          )}
        </GoogleMapComponent>
      ) : (
        "loading"
      )}
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

export default React.memo(HistoryMap);
