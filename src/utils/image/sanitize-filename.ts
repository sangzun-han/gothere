/**
 * 파일 이름에서 특수문자를 제거하고 안전한 이름으로 변환
 * @param filename 원본 파일 이름
 * @returns 정제된 파일 이름
 */
export const sanitizeFilename = (filename: string): string => {
  return filename.replace(/[^a-zA-Z0-9.\-_]/g, "");
};
