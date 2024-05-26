import { httpService } from "@services/api/httpService";

export const getMovies = () => {
  return httpService.get('/movies');
}

export const getMovie = (id: string) => {
  return httpService.get(`/movies/${id}`);
}

export const addMovie = (movie: any) => {
  return httpService.post('/movies', movie);
}

export const editMovie = (movie: any) => {
  return httpService.put(`/movies/${movie.id}`, movie);
}

export const dataService = {
  getMovies,
  getMovie,
  addMovie,
  editMovie,
}
