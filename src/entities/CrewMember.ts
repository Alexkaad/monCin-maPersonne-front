export interface CrewMember {

    adult: boolean;
    gender: number;
    id:number;
    known_for_department: string;
    name:string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    credit_id: string;
    department: string;
    job: string,
    backdrop_path?: string | null;
    title?: string;
    release_date?: Date | string;
}


