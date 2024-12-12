export const extractDong = (address: string): string => {
  const dongMatch = address.match(/(\S+동)(?=\s|$)/);
  return dongMatch ? dongMatch[1] : "";
};
