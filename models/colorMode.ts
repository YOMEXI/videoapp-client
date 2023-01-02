import { Dispatch, SetStateAction } from "react";

export interface MenuType {
  setLightMode: Dispatch<SetStateAction<boolean>>;
  lightMode: boolean;
}
