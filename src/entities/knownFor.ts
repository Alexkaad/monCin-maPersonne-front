import {CastMember} from "@/entities/CastMember";
import {CrewMember} from "@/entities/CrewMember";

export interface KnownFor {

    castMember : CastMember[],
    crewMember : CrewMember[],
}