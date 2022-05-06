import { DataHelper } from "../../lib/helpers/dataHelper";
import { PersonRepository } from "../mockups/personRepository";


describe('search', () => {
    let helper = new DataHelper();
    helper.repository = new PersonRepository();

    describe('should search remote', () => {
        it('should return data', async () => {
            let result = await helper.search(
                {name: "muster"}, 
                "muster")
                expect(result.length).toEqual(1);
        });
    });
    
    describe('no repository', () => {
        let helper = new DataHelper();
        helper.repository = undefined;
        it('should throw an error', async () => {
              await expect(helper.search({name: "muster"},"")).rejects.toEqual(
                Error('No Repository is set')
              );
        });
    });
    
});