"use client";

import Image from "next/image";
import {useLanguage} from "@/contexts/LanguageContext";

export default function Home() {
  const {t, setLanguage, language} = useLanguage();

  return (
    <div>
      <title>Translation template</title>
      <h1 className="text-5xl font-bold text-center my-12">{t('home.title')}</h1>
        <div className="flex flex-col items-center justify-center min-h-[30vh]">
            <p className="mb-6 text-green-400 text-center text-3xl font-bold">
                {t('home.info')}
            </p>
            <button
                className="px-8 py-3 bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-black text-xl font-bold rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-green-300 animate-pulse"
                onClick={() => setLanguage(language === 'en' ? 'de' : 'en')}
            >
                {t("home.translateButton")}
            </button>

        </div>

    </div>
  );
}
