# Next.js Translation Template

A lightweight multilingual website starter built with **Next.js**.  
Features a simple, React Context–based translation system — **no external i18n libraries required**.
----------------

[![Source Code](https://img.shields.io/badge/source-github-blue)](https://github.com/lpj-app/nextjs-translation-template)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[![Made with Next.js](https://img.shields.io/badge/Made%20with-Next.js-black?logo=next.js)](https://nextjs.org/) [![React](https://img.shields.io/badge/React-blue?logo=react)](https://reactjs.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript)](https://www.typescriptlang.org/)
---
# Contents
- [Demo](#demo)
- [Features](#features)
- [Code-Behind](#code-behind)
    - [Wrap Your App with the Language Provider](#1-wrap-your-app-with-the-language-provider)
    - [Use the Translation Hook](#2-use-the-translation-hook)
    - [Add a Translation File](#3-add-a-translation-file)
    - [Language Context Implementation](#4-language-context-implementation)
- [Usage Guide](#usage-guide)
    - [Add Translations](#add-translations)
    - [Use Keys in Components](#use-keys-in-components)
    - [Switch Languages](#switch-languages)
- [Notes](#-notes)
## Demo
[![Test it here](https://img.shields.io/badge/demo-online-brightgreen)](https://nextjs-language-template.lpj.app)

## Features
- No external i18n dependencies
- Context-driven language switching
- Easy to add new languages and translation keys

---
## Demo

---

## Code-Behind

### 1. Wrap Your App with the Language Provider
In `src/app/layout.tsx`, your app is wrapped with the `LanguageProvider` so translations are available everywhere:

```tsx
import { LanguageProvider } from "@/contexts/LanguageContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
```

---

### 2. Use the Translation Hook
Access translations in any page or component with the `useLanguage` hook:

```tsx
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { t, setLanguage, language } = useLanguage();

  return (
    <div>
      <h1>{t("home.title")}</h1>
      <button onClick={() => setLanguage(language === "en" ? "de" : "en")}>
        {t("home.translateButton")}
      </button>
    </div>
  );
}
```
When translation only is required, use the `t` function to get the translated string by key. `language` and `setLanguage` are optional for language switching.

---

### 3. Add a Translation File
Translations are stored as plain TypeScript objects. Example:

```ts
// src/contexts/HomeTranslation.ts
const HomeTranslation = {
  de: {
    "home.title": "Startseite",
    "home.translateButton": "Übersetzen",
  },
  en: {
    "home.title": "Home",
    "home.translateButton": "Translate",
  },
};

export default HomeTranslation;
```

---

### 4. Language Context Implementation
When multiple translation files exist, they are merged in the `LanguageContext`:

```tsx
// src/contexts/LanguageContext.tsx
import React, { createContext, useContext, useState } from "react";
import PageLayoutTranslation from "./PageLayoutTranslation";
import HomeTranslation from "./HomeTranslation";

const translations = {
  de: { 
      ...PageLayoutTranslation.de, 
      ...HomeTranslation.de 
  },
  en: { 
      ...PageLayoutTranslation.en, 
      ...HomeTranslation.en 
  },
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");
  const t = (key: string) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
```

---

## Usage Guide

### Add Translations
1. Open or create a file in `src/contexts/` (e.g., `AboutTranslation.ts`).
2. Define keys and translations for each language:
   ```ts
   "about.title": "About Us" (English)  
   "about.title": "Über uns" (German)  
   ```
3. Import and merge the new translation file in `LanguageContext.tsx`.

### Use Keys in Components
- Call the translation function:
  ```tsx
  <h2>{t("about.title")}</h2>
  ```  
- Text updates automatically when the language changes.

### Switch Languages
Use the `setLanguage` function (e.g., from a button) to toggle:
```tsx
<button onClick={() => setLanguage("de")}>DE</button>
<button onClick={() => setLanguage("en")}>EN</button>
```

---

## 📝 Notes
- Every translation key must exist in all languages for consistent behavior.
- Organize keys by page or component (e.g., `"home.title"`, `"profile.button"`).
- No external libraries required — just plain React Context.
- Keep it simple: define keys, add values, and use `t(key)` anywhere in your app.  
