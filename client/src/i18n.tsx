import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ChainedBackend from "i18next-chained-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";
import resourcesToBackend from "i18next-resources-to-backend";

i18n
  .use(ChainedBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "ru",
    debug: false,
    detection: {
      order: ["localStorage"],
      caches: ["localStorage"],
    },

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    backend: {
      backends: [
        HttpBackend,
        resourcesToBackend((lng, ns, clb) => {
          import(`../public/locales/${lng}/${ns}.json`)
            .then((resources) => {
              clb(null, resources);
            })
            .catch((error) => {
              clb(error, null);
            });
        }),
      ],
      backendOptions: [
        {
          loadPath: "../public/locales/{{lng}}/{{ns}}.json",
        },
      ],
    },
  });
export default i18n;
