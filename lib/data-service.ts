import { ObjectHelper } from "@tomuench/vetprovieh-shared/lib";


export class DataService{


    all(src: string, searchValue: string = null) : Promise<any> {
        return fetch(src)
        .then((response) => response.json())
        .then((data) => DataService.search(data, searchValue))
    }

   /**
     * Search by Value in Array
     * @param {Array} data
     * @param {string | undefined} searchValue
     * @return {Array}
     */
    static search(data: Array<any>, searchValue: string | undefined) {
        if (searchValue) {
            return data.filter((e) => {
                return ObjectHelper.objectToStringDeep(e).indexOf(searchValue) >= 0;
            });
        } else {
            return data;
        }
    }
}