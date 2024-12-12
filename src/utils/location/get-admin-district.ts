type AdminDistrict = {
  si: string;
  gu: string;
  dong: string;
  addressName: string; // 전체 주소
};

/**
 * 주어진 위도와 경도를 기반으로 행정구역 정보를 가져옵니다. (시/군/구/동)
 *
 * @param latitude - 위도 (latitude).
 * @param longitude - 경도 (longitude).
 * @returns Promise<AdminDistrict> - 시(`si`), 군/구(`gu`), 동(`dong`) 정보를 포함한 객체를 반환합니다.
 * @throws `KAKAO_MAP_ERROR` - Kakao 지도 객체가 초기화되지 않았거나 사용할 수 없을 경우.
 * @throws `ADMIN_DISTRICT_ERROR` - 행정구역 정보를 가져오지 못했을 경우.
 */

export const getAdminDistrict = async (latitude: number, longitude: number): Promise<AdminDistrict> => {
  return new Promise((resolve, reject) => {
    if (typeof kakao === "undefined" || !kakao.maps) {
      reject("KAKAO_MAP_ERROR");
      return;
    }

    try {
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.coord2Address(longitude, latitude, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const address = result[0]?.address;
          if (address) {
            resolve({
              addressName: address.address_name,
              si: address.region_1depth_name,
              gu: address.region_2depth_name,
              dong: address.region_3depth_name,
            });
          } else {
            reject("ADMIN_DISTRICT_ERROR");
          }
        } else {
          reject("ADMIN_DISTRICT_ERROR");
        }
      });
    } catch (error) {
      reject("KAKAO_MAP_ERROR");
    }
  });
};
