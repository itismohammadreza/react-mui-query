import Button from '@mui/material/Button';
import { useApp } from "@hooks/useApp";
import { useLocales } from "@hooks/useLocales";
import { Link } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { dataService } from "@services/dataService";

export const Home = () => {
  const {t, changeLocale, currentLocale} = useLocales();
  const {paletteMode, setAppConfig} = useApp();
  const {data, isLoading, refetch} = useQuery({
    queryKey: ["data"],
    queryFn: dataService.getMovies,
    enabled: false
  });

  const changeThemeClick = async () => {
    await refetch();
    setAppConfig({paletteMode: paletteMode === 'dark' ? 'light' : 'dark'});
  }

  return (
      <>
        <h2>About Page</h2>
        <Link to="/">Home</Link>
        <Button variant="contained"
                onClick={() => changeLocale(currentLocale == "faIR" ? "enUS" : "faIR")}>
          {currentLocale}
        </Button>
        <h2>{t('title')}</h2>
      </>
  )
}
