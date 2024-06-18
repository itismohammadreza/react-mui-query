import { LoadingButton } from "@mui/lab";
import { useMutation } from "@tanstack/react-query";
import { Container, Grid, Typography } from "@mui/material";
import { FormElements } from "@components/forms/FormElements";
import { Link, useNavigate } from "react-router-dom";
import { dataService } from "@services/dataService";
import { User } from "@models/business";
import { globalStateService } from "@services/globalStateService";

export const Login = () => {
  const navigate = useNavigate();

  const {isPending, mutateAsync: login} = useMutation({
    mutationFn: async (value: User) => {
      try {
        const {data} = await dataService.login(value);
        const {data: user} = await dataService.getProfile(data.access_token);
        localStorage.setItem('token', data.access_token);
        globalStateService.set(prev => ({...prev, user}));
        return user;
      } catch {
      }
    }
  });

  const onSubmit = async (value: any) => {
    try {
      await login(value);
      navigate('/');
    } catch {
    }
  }

  return (
      <FormElements.Container onSuccess={onSubmit}>
        <Container component="main" maxWidth="xs" sx={{marginTop: 8}}>
          <Typography component="h1" marginBottom={2} variant="h5" textAlign="center"> Sign in </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormElements.TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  rules={{required: 'Required'}}/>
            </Grid>
            <Grid item xs={12}>
              <FormElements.TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  rules={{required: 'Required'}}/>
              <FormElements.Checkbox name="rememberMe" label="Remember me"/>
            </Grid>
          </Grid>
          <LoadingButton fullWidth sx={{mt: 3, mb: 2}} loading={isPending} type="submit" variant="contained">
            Sign In
          </LoadingButton>
          <Grid container>
            <Grid item xs>
              <Link to="/auth/forget-password"> Forgot password? </Link>
            </Grid>
            <Grid item>
              <Link to="/auth/register"> Don't have an account? Sign Up </Link>
            </Grid>
          </Grid>
        </Container>
      </FormElements.Container>
  )
}
