import { atom } from "recoil";

type LocationType = {
  latitude: number;
  longitude: number;
  si: string;
  gu: string;
  dong: string;
};

export const geoLocationState = atom<LocationType>({
  key: "@geo-location-state",
  default: {
    latitude: 37.579293849225756,
    longitude: 126.97798076343491,
    si: "서울특별시",
    gu: "종로구",
    dong: "청운효자동",
  },
});

export const geoLocationLoadingState = atom<boolean>({
  key: "@geo-location-loading-state",
  default: false,
});

export const geoLocationErrorState = atom<string | null>({
  key: "@geo-location-error-state",
  default: null,
});
