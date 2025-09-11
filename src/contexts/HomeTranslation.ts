type Translation = {
    de: Record<string, string>;
    en: Record<string, string>;
};

const HomeTranslation: Translation = {
    de: {
        'home.title': 'Hauptseite',
        'home.info': 'Teste die Übersetzungsfunktion! Klicke auf den Button unten oder in der Navigationsleiste, um die Seite zu übersetzen.',
        'home.translateButton': 'Übersetzen',
    },
    en: {
        'home.title': 'Landing page',
        'home.info': 'Test the translation function! Click the button below or in Navbar to translate the page.',
        'home.translateButton': 'Translate',
    },
};

export default HomeTranslation;