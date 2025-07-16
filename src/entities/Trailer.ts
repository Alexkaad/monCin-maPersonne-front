export interface Trailer
{
    name: string,
    key: string,
    site: string,
    size: number,
    type: string,
    official: boolean,
    published_at: string,
    id: string,
    iso_639_1: string,
    iso_3166_1: string,

}

export interface SortedTrailers {
    mainTrailer: Trailer | undefined;
    otherVideos: Trailer[];
}
