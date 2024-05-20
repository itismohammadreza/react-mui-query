import { useLocales } from "@hooks/useLocales";
import { Button } from "@mui/material";
import { useApp } from "@hooks/useApp";
import { useQuery } from "@tanstack/react-query";
import { getMovies } from "@services/dataService";

export const Home = () => {
  const {t, changeLocale, currentLocale} = useLocales();
  const {paletteMode, setAppConfig} = useApp();
  const {data, isLoading, refetch} = useQuery({
    queryKey: ["data"],
    queryFn: getMovies,
    enabled: false
  });

  const changeThemeClick = async () => {
    await refetch();
    setAppConfig({paletteMode: paletteMode === 'dark' ? 'light' : 'dark'});
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
