import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css"; // some styles overridden in globals.css

import Tome, { KeyValueStore } from "@holium/tome-db";
import { Urbit } from "@urbit/http-api";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import utc from "dayjs/plugin/utc";
import { enableStaticRendering } from "mobx-react-lite";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { createContext, useEffect, useMemo, useState, useContext } from "react";
import {
  setDefaultLanguage,
  setTranslations,
  useTranslation,
} from "react-multi-lang";
import { Bounce, ToastContainer } from "react-toastify";

import { Icon } from "~/components/assets";

import { MainLayout } from "../components/layouts";
import { OgpMeta } from "../components/ogp-meta";
import { MainLayoutMenu } from "../components/types";
import {
  AmplitudeEvent,
  EventName,
  IS_FRONTIER,
  PromotedLBPPoolIds,
} from "../config";
import { GetKeplrProvider } from "../hooks";
import { useAmplitudeAnalytics } from "../hooks/use-amplitude-analytics";
import dayjsLocaleEs from "../localizations/dayjs-locale-es.js";
import dayjsLocaleKo from "../localizations/dayjs-locale-ko.js";
import en from "../localizations/en.json";
import spriteSVGURL from "../public/icons/sprite.svg";
import { StoreProvider } from "../stores";
import { IbcNotifier } from "../stores/ibc-notifier";

dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(updateLocale);
dayjs.updateLocale("es", dayjsLocaleEs);
dayjs.updateLocale("ko", dayjsLocaleKo);
enableStaticRendering(typeof window === "undefined");

const DEFAULT_LANGUAGE = "en";
setTranslations({ en });
setDefaultLanguage(DEFAULT_LANGUAGE);

export const TomeContext = createContext<KeyValueStore | undefined>(undefined);

const api = new Urbit(
  "http://localhost:8080",
  "lidlut-tabwed-pillex-ridrup",
  "osmosis"
);
api.ship = "zod";

function MyApp({ Component, pageProps }: AppProps) {
  const [kv, setKv] = useState<KeyValueStore>();

  const generateKV = async () => {
    console.error(api.ship);
    const db = await Tome.init(api, undefined, {
      agent: "osmosis",
    });
    const _kv = await db.keyvalue();
    console.error(_kv);
    // TODO: setting causes infinite loading and then crash. why?
    // setKv(_kv);
  };

  // useEffect(() => {
  //   // if (typeof kv === "undefined") {
  //     generateKV();
  //   // }
  // }, []);

  const t = useTranslation();
  const menus = useMemo(() => {
    let m: MainLayoutMenu[] = [
      {
        label: t("menu.swap"),
        link: "/",
        icon: "https://app.osmosis.zone/icons/trade-white.svg",
        iconSelected: "https://app.osmosis.zone/icons/trade-white.svg",
        selectionTest: /\/$/,
      },
      {
        label: t("menu.pools"),
        link: "/pools",
        icon: "https://app.osmosis.zone/icons/pool-white.svg",
        iconSelected: "https://app.osmosis.zone/icons/pool-white.svg",
        selectionTest: /\/pools/,
      },
      {
        label: t("menu.assets"),
        link: "/assets",
        icon: "https://app.osmosis.zone/icons/asset-white.svg",
        iconSelected: "https://app.osmosis.zone/icons/asset-white.svg",
        selectionTest: /\/assets/,
      },
    ];

    if (PromotedLBPPoolIds.length > 0) {
      m.push({
        label: "Bootstrap",
        link: "/bootstrap",
        icon: "https://app.osmosis.zone/icons/pool-white.svg",
        selectionTest: /\/bootstrap/,
      });
    }

    m.push(
      {
        label: t("menu.stake"),
        link: "https://wallet.keplr.app/chains/osmosis",
        icon: "https://app.osmosis.zone/icons/ticket-white.svg",
        amplitudeEvent: [EventName.Sidebar.stakeClicked] as AmplitudeEvent,
      },
      {
        label: t("menu.vote"),
        link: "https://wallet.keplr.app/chains/osmosis?tab=governance",
        icon: "https://app.osmosis.zone/icons/vote-white.svg",
        amplitudeEvent: [EventName.Sidebar.voteClicked] as AmplitudeEvent,
      },
      {
        label: t("menu.info"),
        link: "https://info.osmosis.zone",
        icon: "https://app.osmosis.zone/icons/chart-white.svg",
        amplitudeEvent: [EventName.Sidebar.infoClicked] as AmplitudeEvent,
      },
      {
        label: t("menu.help"),
        link: "https://support.osmosis.zone/",
        icon: <Icon id="help-circle" className="h-5 w-5" />,
        amplitudeEvent: [EventName.Sidebar.supportClicked] as AmplitudeEvent,
      }
    );

    return m;
  }, [t]);

  useAmplitudeAnalytics({ init: true });
  return (
    <>
      <Script src="/session.js" />
      <TomeContext.Provider value={kv}>
        <GetKeplrProvider>
          <StoreProvider>
            <Head>
              {/* metamask Osmosis app icon */}
              <link
                rel="shortcut icon"
                href={`${
                  typeof window !== "undefined" ? window.origin : ""
                }/osmosis-logo-wc.png`}
              />
              <link rel="preload" as="image/svg+xml" href={spriteSVGURL} />
            </Head>
            <OgpMeta />
            <IbcNotifier />
            <ToastContainer
              toastStyle={{
                backgroundColor: IS_FRONTIER ? "#2E2C2F" : "#2d2755",
              }}
              transition={Bounce}
            />
            <MainLayout menus={menus}>
              <Component {...pageProps} />
            </MainLayout>
          </StoreProvider>
        </GetKeplrProvider>
      </TomeContext.Provider>
    </>
  );
}

export default MyApp;
