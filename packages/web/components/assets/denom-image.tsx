import { AppCurrency, Currency } from "@keplr-wallet/types";
import Image from "next/image";
import { FunctionComponent } from "react";
import loader from "../../loader";

export const DenomImage: FunctionComponent<{
  denom: AppCurrency | Currency;
  /** Size in px */
  size?: number;
}> = ({ denom, size = 24 }) => (
  <>
    {denom.coinImageUrl ? (
      <Image
        loader={loader}
        src={denom.coinImageUrl}
        alt="token icon"
        width={size}
        height={size}
      />
    ) : (
      <div
        style={{ width: size, height: size }}
        className="flex items-center justify-center rounded-full bg-osmoverse-700"
      >
        {denom.coinDenom[0].toUpperCase()}
      </div>
    )}
  </>
);
