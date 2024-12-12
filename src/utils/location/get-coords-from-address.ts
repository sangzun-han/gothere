/**
 * 주어진 주소를 기반으로 위도와 경도 좌표를 반환합니다.
 *
 * @param address - 변환할 주소 문자열.
 * @returns Promise<{ lat: number; lng: number }> - 변환된 위도(`lat`)와 경도(`lng`)를 포함한 객체를 반환합니다.
 * @throws `KAKAO_MAP_ERROR` - Kakao 지도 객체가 초기화되지 않았거나 사용할 수 없을 경우.
 * @throws `ADDRESS_COORDS_ERROR` - 주소를 좌표로 변환하지 못했을 경우.
 */

export const getCoordsFromAddress = async (address: string): Promise<{ lat: number; lng: number }> => {
  return new Promise((resolve, reject) => {
    if (typeof kakao === "undefined" || !kakao.maps) {
      reject("KAKAO_MAP_ERROR");
      return;
    }

    try {
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, (result, status) => {
        if (status === kakao.maps.services.Status.OK && result[0]) {
          resolve({
            lat: parseFloat(result[0].y),
            lng: parseFloat(result[0].x),
          });
        } else {
          reject("ADDRESS_COORDS_ERROR");
        }
      });
    } catch (error) {
      reject("KAKAO_MAP_ERROR");
    }
  });
};
