import { getAdminDistrict } from "./get-admin-district";

export const getCurrentLocation = async (): Promise<{ addressName: string }> => {
  try {
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const { latitude, longitude } = position.coords;
    const adminDistrict = await getAdminDistrict(latitude, longitude);
    return { addressName: adminDistrict.addressName };
  } catch (error) {
    console.log(error);
    return {
      addressName: "알 수 없는 위치",
    };
  }
};
