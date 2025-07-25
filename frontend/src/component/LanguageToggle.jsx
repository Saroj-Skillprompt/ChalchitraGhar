import { useTranslation } from "react-i18next";

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "np" : "en");
  };

  return (
    <button
      onClick={toggleLanguage}
      className="absolute top-4 right-4 bg-white text-black px-3 py-1 rounded shadow hover:bg-gray-200 transition"
    >
      {i18n.language === "en" ? "🇳🇵 नेपाली" : "🇺🇸 English"}
    </button>
  );
};

export default LanguageToggle;
