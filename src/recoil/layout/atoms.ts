import { atom } from "recoil";

export const menuHeightAtom = atom<number>({
  key: "@menu-height-atom",
  default: 0,
});
