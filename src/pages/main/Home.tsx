import { useLocales } from "@hooks/useLocales";
import { Button, Typography } from "@mui/material";
import { useApp } from "@hooks/useApp";
import { useQuery } from "@tanstack/react-query";
import { dataService } from "@services/dataService";
import { useUser } from "@hooks/useUser";
import { LoadingButton } from "@mui/lab";

export const Home = () => {
  const user = useUser();
  const {changeLocale, currentLocale} = useLocales();
  const {paletteMode, setAppConfig} = useApp();
  const {isFetching, refetch} = useQuery({
    queryKey: ["data"],
    queryFn: dataService.getProducts,
    enabled: false
  });

  return (
      <>
        <Typography variant="h6" component="span"> Theme: </Typography>
        <Button onClick={() => setAppConfig({paletteMode: paletteMode === 'dark' ? 'light' : 'dark'})}>
          {paletteMode}
        </Button>
        <br/>
        <Typography variant="h6" component="span"> Locale: </Typography>
        <Button onClick={() => changeLocale(currentLocale == "faIR" ? "enUS" : "faIR")}>
          {currentLocale}
        </Button>
        <br/>
        <Typography variant="h6" component="span"> Request: </Typography>
        <LoadingButton loading={isFetching} onClick={() => refetch()}>
          Call
        </LoadingButton>
        <br/>
        {
            user && (
                <>
                  <Typography variant="h6" component="span"> Logged In User: </Typography>
                  {user.name} - {user.email}
                  <Button color="error" onClick={() => dataService.logout()}> Logout </Button>
                </>
            )
        }
      </>
  )
}
