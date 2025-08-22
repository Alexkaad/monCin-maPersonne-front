export interface CastMember {

    adult: boolean,
    gender: number,
    id: number,
    known_for_department: string,
    name: string,
    original_name: string,
    popularity: number,
    profile_path: string | null,
    cast_id: number,
    character: string,
    credit_id:string,
    order: number,
    role: string,
}

export interface Casting {
    id: number,
    name: string,
    original_name: string,
    profile_path: string | null,
    cast_id: number,
    character: string,
    order: number,
    role: string,
}

export function mapCasting(casting: Casting[]) {
    return casting.map((item) => ({
        id: item.id,
        name: item.name,
        character: item.character,
        order: item.order,
        poster_path: 'https://image.tmdb.org/t/p/w500' +item.profile_path,
        role: item.role,
    }));
}