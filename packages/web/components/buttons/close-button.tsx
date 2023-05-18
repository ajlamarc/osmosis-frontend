import classNames from "classnames";
import Image from "next/image";
import { FunctionComponent } from "react";

import { CustomClasses, Disableable } from "../types";
import { ButtonProps } from "./types";

export const CloseButton: FunctionComponent<
  ButtonProps & CustomClasses & Disableable
> = ({ onClick, className, disabled }) => (
  <div
    className={classNames(
      "flex h-6 w-6 items-center justify-center rounded-full bg-wosmongton-200",
      disabled ? "cursor-default opacity-30" : "cursor-pointer",
      className
    )}
    onClick={() => {
      if (!disabled) onClick();
    }}
  >
    <Image
      alt="clear"
      src="https://app.osmosis.zone/icons/close.svg"
      height={22}
      width={18}
    />
  </div>
);
