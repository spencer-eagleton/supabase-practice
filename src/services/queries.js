import { checkError, client } from './client.js';
export async function getMovies() {
  // return the list of all movies
  const resp = await client.from('movies').select('*');
  return checkError(resp);
}

export async function getMoviesWithDirector() {
  // return the list of all the movies with their director
  const resp = await client.from('movies').select(`director_id, directors(name)`);
  return checkError(resp);
}

export async function getDirectorNames() {
  // return the list of the director's names
  const resp = await client.from('directors').select('name');
  return checkError(resp);
}

export async function getMovieById(id) {
  // return the movie with the given id
  const resp = await client.from('movies').select('*').match({ id }).single();
  return checkError(resp);
}

export async function getMovieByTitle(title) {
  const resp = await client.from('movies').select('*').match({ title }).single();
  return checkError(resp);
  // return the movie with the given title
}

export async function getOldestMovie() {
  // return the oldest movie (assume the database is not sorted)
  const resp = await client.from('movies').select('*').order('year').limit(1).single();
  return checkError(resp);
}

export async function getMoviesAfter(year) {
  const resp = await client.from('movies').select('*').gt('year', year);
  return checkError(resp);
  // return movies made after the year passed in
}

export async function getHighestGrossingMovie() {
  const resp = await client
    .from('movies')
    .select('*')
    .order('box_office', { ascending: false })
    .limit(1)
    .single();
  return checkError(resp);
  // return movie with the highest box office total
}
