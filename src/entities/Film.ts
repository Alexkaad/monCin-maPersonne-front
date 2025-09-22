import {Genre} from "@/entities/Genre";
import {CreatedBy} from "@/entities/CreatedBy";
import {Networks} from "@/entities/Networks";

export interface Film {

    adult?: boolean;
    id: number;
    backdrop_path: string | null;
    genres: Genre[]; // tableau d’objets Genre
    original_language: string;
    original_title: string;
    overview: string;
    poster_path: string | null;
    release_date: Date; // ou string si récupéré en JSON
    runtime: string; // ex: "01:45"
    tagline: string;
    title: string;
    first_air_date?: Date;
    name?: string;
    created_by?: CreatedBy [];
    networks?: Networks [];
    original_name? : string;
}