export const findDongCooridnates = async (neighborhoodName: string) => {
  const response = await fetch("../dong.json");
  const data = await response.json();

  const matchingFeatures = [];
  for (const feature of data.features) {
    if (feature.properties.EMD_KOR_NM === neighborhoodName) {
      matchingFeatures.push(feature);
    }
  }

  const coordinatesList = [];
  for (const feature of matchingFeatures) {
    coordinatesList.push(feature.geometry.coordinates);
  }

  return coordinatesList.length > 0 ? coordinatesList : false;
};
