import { NextPage } from "next";
import Image from "next/image";
import { useTranslation } from "react-multi-lang";
import loader from "../loader";

const Custom500: NextPage = () => {
  const t = useTranslation();
  return (
    <div className="flex h-screen items-center justify-center gap-3 bg-osmoverse-900">
      <Image
        loader={loader}
        src="/icons/error-x.svg"
        alt={t("505.title")}
        height={25}
        width={25}
      />
      <h6>{t("505.title")}</h6>
    </div>
  );
};

export default Custom500;
