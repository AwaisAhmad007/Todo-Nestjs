import { Timestamp } from "typeorm";

export interface Todo{

    id          : string;
    User        : string;
    Title       : string;
    Narration   : string;
    Author?     : string;
    StartDate   : Date;
    EndDate     : Date;
    User_Id     : number;
    State       : Boolean;
}