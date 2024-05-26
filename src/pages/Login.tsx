import { LoadingButton } from "@mui/lab";
import TextFieldElement from "@components/forms/TextFieldElement";
import { FormContainer } from "@components/forms/FormContainer";
import CheckboxElement from "@components/forms/CheckboxElement";
import { useQuery } from "@tanstack/react-query";
import { dataService } from "@services/dataService";

export const Login = () => {
  const {data, refetch, isFetching} = useQuery({
    queryKey: ["Unique Key"],
    queryFn: () => dataService.getMovies(),
    enabled: false
  });

  const login = async (value: any) => {
    await refetch()
    console.log(value)
  }
  const onError = (error: any) => {
    console.log(error)
  }


  return (
      <div>
        Login
        <FormContainer>
          <TextFieldElement
              label="Error"
              name="ali"
              onChange={v => console.log(v)}/>
        </FormContainer>
        <FormContainer defaultValues={{firstName: 'sss'}} onError={onError} onSuccess={login}>
          <>
            <TextFieldElement
                label="Error"
                name="firstName"
                parseError={(x) => <span>{x.message + '2'}</span>}
                rules={{required: 'is required', minLength: {value: 3, message: 'min length'}}}/>
            <CheckboxElement
                label="Error"
                name="lastName"
                rules={{required: 'is required'}}/>
            <LoadingButton loading={isFetching} type="submit" variant="outlined">
              Submit
            </LoadingButton>
          </>
        </FormContainer>
      </div>
  )
}
