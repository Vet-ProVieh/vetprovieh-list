import { VetproviehList } from "../lib/vetprovieh-list";
import { enableFetchMocks } from 'jest-fetch-mock'
import fetch from 'node-fetch';


enableFetchMocks();

const template = document.createElement("template");
template.innerHTML = `<div>
              <strong>{{id}}</strong>: <span>{{name}}</span>
            </div>
            <hr/>`;

describe('constructor', function () {
    test("should init default values", () => {
        const list = new VetproviehList(template);

        expect(list.src).toEqual("");
        expect(list.pagesize).toEqual(0);
        expect(list.pageable).toEqual(true);
        expect(list.page).toEqual(1);
        expect(list.maxPage).toEqual(1);
        expect(list["_listTemplate"]).toEqual(template.content);
    })
});

describe('src', function () {
    test('should set src', () => {
        let list = new VetproviehList(template);
        list.src = "test";
        list.src = "test";
        expect(list.src).toBe("test");
    })
});

describe('pageable', function () {
    test('should set pageable', () => {
        let list = new VetproviehList(template);

        list.pageable = false;
        expect(list.pageable).toBe(false);

        list.pageable = true;
        expect(list.pageable).toBe(true);
    })
});

describe('pagesize', function () {
    test('should set pagesize', () => {
        let list = new VetproviehList(template);

        list.pagesize = 10;
        expect(list.pagesize).toBe(10);
    });
});

describe('connectedCallback', function () {
    const pager = new VetproviehList(template);
    pager.src = "fixtues/names/index.json";
    pager.pagesize = 20;

   /* fetch.mockResponse(() =>
        [
            {
                "id": "1",
                "name": "Paul Panzer"
            },
        {
            "id": "2",
            "name": "Dagobert Duck"

        }])
*/
    test("should fetch data", () => {
        pager.connectedCallback();
    })
});