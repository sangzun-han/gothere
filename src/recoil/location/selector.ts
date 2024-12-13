import { initializeLocation } from "@/utils/location/initialize-location";
import { selector } from "recoil";

export const locationSelector = selector({
  key: "@get/location-selector",
  get: async () => {
    try {
      const location = await initializeLocation();
      return location;
    } catch (error) {
      return {
        latitude: 37.579293849225756,
        longitude: 126.97798076343491,
        si: "서울특별시",
        gu: "종로구",
        dong: "세종로",
        addressName: "서울특별시 종로구 세종로 1-1",
      };
    }
  },
});
