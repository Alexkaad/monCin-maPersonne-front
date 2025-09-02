import {CastMember} from "@/entities/CastMember";
import {CrewMember} from "@/entities/CrewMember";

export interface Credit {

    cast : CastMember[],
    crew : CrewMember[]
}