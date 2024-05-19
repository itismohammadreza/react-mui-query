import Button from '@mui/material/Button';
import { useDispatch } from "react-redux";
import { useApp } from "@hooks/useApp";
import { changePalette } from "@redux/slices/appSlice";
import { useLocales } from "@hooks/useLocales";

export const Home = () => {
  const {t, changeLocale, currentLocale} = useLocales();
  const dispatch = useDispatch();
  const {paletteMode} = useApp();

  const changeThemeClick = () => {
    dispatch(changePalette(paletteMode == "light" ? "dark" : "light"));
  }

  return (
      <>
        <Button variant="contained" onClick={changeThemeClick}>
          {paletteMode}
        </Button>
        <Button variant="contained"
                onClick={() => changeLocale(currentLocale == "faIR" ? "enUS" : "faIR")}>
          {currentLocale}
        </Button>
        <h2>{t('demo.title')}</h2>
        تست فارسی 123
      </>
  )
}
