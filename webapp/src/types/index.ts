export interface MarkerTypes {
  position: {
    lat: number;
    lng: number;
  };
}

export interface registerModalTypes {
  name: string;
  image: string;
  value: number;
}
export interface postTypes extends registerModalTypes {
  lat: number;
  lng: number;
}

export type ModeTypes = "app" | "register" | "history" ;