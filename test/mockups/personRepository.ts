
import { Person } from "./person";
import { BaseRepository } from "@vetprovieh/vetprovieh-shared";

export class PersonRepository extends BaseRepository<Person> {

    constructor(){
        super(Person.endpoint);
    }

    /**
     * Mocking search
     * @param params 
     */
    whereByParams(params: { [Identifier: string]: string; }): Promise<Person[]> {
        return new Promise((resolve, reject) =>{
            resolve([
                demoPerson1,
                new Person()
            ])
        });
    }
}


const demoPerson1 = new Person();
demoPerson1.id = 1;
demoPerson1.name = "muster";
