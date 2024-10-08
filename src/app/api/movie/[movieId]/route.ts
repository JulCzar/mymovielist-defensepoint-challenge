import type { MovieDetails } from '~/business/models/movies';
import { omdb } from '~/business/services';

interface DynamicSegment {
  params: {
    movieId: string;
  };
}

export const GET = async (_: Request, { params }: DynamicSegment) => {
  try {
    const { data } = await omdb.get<MovieDetails>(`/`, {
      params: {
        i: params.movieId,
      },
    });

    return Response.json(data);
  } catch (e) {
    console.trace(e);
    return Response.json({ status: 'Error' }, { status: 400 });
  }
};
