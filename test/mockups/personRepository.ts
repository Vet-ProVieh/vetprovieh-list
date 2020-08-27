
import { Person } from "./person";
import { BaseRepository } from "@tomuench/vetprovieh-shared/lib";

export class PersonRepository extends BaseRepository<Person> {

    constructor(){
        super(Person.endpoint);
    }
}