import { enableFetchMocks } from 'jest-fetch-mock'
import fetch from 'jest-fetch-mock';
enableFetchMocks();

import { VetproviehList } from "../lib/vetprovieh-list";
import { Indexable } from '@vetprovieh/vetprovieh-shared/lib/interfaces/indexable';
import { PersonRepository } from './mockups/personRepository';


// Testtemplate
const template = document.createElement("template");
template.innerHTML = `<div>
              <strong>{{id}}</strong>: <span>{{name}}</span>
            </div>
            <hr/>`;

// Test-Data for the Tests
const data = [
    {
        "id": "1",
        "name": "Paul Panzer"
    },
    {
        "id": "2",
        "name": "Dagobert Duck"

    }];

// Mock Responses
fetch.mockResponse(JSON.stringify(data));


/**
 * Generating Demo-List
 */
const generateList = () => {
    const list = new VetproviehList(template);
    list.repository = new PersonRepository();
    list.pagesize = 20;
    list.connectedCallback();

    return list;
}

describe('constructor', function () {
    test("should init default values", () => {
        const list = new VetproviehList(template);
        list.connectedCallback();
        expect(list.pagesize).toEqual(0);
        expect(list.pageable).toEqual(true);
        expect(list.page).toEqual(1);
        expect(list.maxPage).toEqual(1);
        expect(list["_listTemplate"]).toEqual(template.content);
    })
});

describe('objects',  () => {
    test('should set src',  (done) => {
        let list = generateList();
        list.search("Dagobert");
        setTimeout(() => {
            expect(list.objects).toStrictEqual([data[1]]);
            done();
        },200);
    })
});

describe('content', () => {
    test('should have items', (done) => {
        let list = generateList();
        setTimeout(() => {
            let container = list.shadowRoot.getElementById("listElements");
            done(container.children.length == 0);
        },200); 
    });
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
    test("should fetch data and render", () => {
        const list = generateList();
        const listItems = list.getByIdFromShadowRoot("listElements") as HTMLElement;

        setTimeout(() => {
            data.forEach((element) => {
                let template = "<strong>" + element.id + "</strong>: <span>" + element.name + "</span>";
                expect(listItems.innerHTML).toMatch(template);
            });
        }, 100);
    })
});

describe('search', () => {
    const list = generateList();
    const listItems = list.getByIdFromShadowRoot("listElements") as HTMLElement;
    const search = list.getByIdFromShadowRoot("searchControl") as HTMLElement;
    list.searchable = true;
    list.connectedCallback();
    list.search("Dagobert");

    test("searchControl should be visible", () => {
        expect(search.classList.contains("is-hidden")).toEqual(false);
    });

    test("searchControl should be hidden", () => {
        list.searchable = false;
        expect(list.searchable).toEqual(false);
        expect(search.classList.contains("is-hidden")).toEqual(true);
    });

    test("should mark searched data", () => {
        setTimeout(() => {
            expect(listItems.innerHTML).toMatch("<mark>Dagobert</mark>");
        }, 100);
    });

    test("should show only one item", () => {
        setTimeout(() => {
            expect(listItems.innerHTML).toMatch("Dagobert");
            expect(listItems.innerHTML).not.toMatch("Paul");
        }, 100);
    })

    test("test searchField event", () => {
        const searchField = list.getByIdFromShadowRoot("search") as HTMLInputElement;

        searchField.value = "Paul";
        searchField.dispatchEvent(new KeyboardEvent("keyup"));

        setTimeout(() => {
            expect(listItems.innerHTML).not.toMatch("Dagobert");
            expect(listItems.innerHTML).toMatch("Paul");
        }, 600);
    })
})


describe('page', () => {
    const list = generateList();
    const listItems = list.getByIdFromShadowRoot("listElements") as HTMLElement;
    list.pagesize = 1;

    beforeEach(function () {
        list.page = 1;
    });


    test("should set page", () => {
        expect(list.maxPage).toEqual(2);

        list.page = 2;
        expect(list.page).toEqual(2);
    });

    test("should throw exception if page is greater max", () => {
        list.page = 3
        expect(list.page).toEqual(1);
    });

    test("pageListener should switch page", () => {
        let pager = list.getByIdFromShadowRoot("pager") as any;
        pager.page = 2;
        pager.dispatchEvent(new Event("change"));

        expect(list.page).toEqual(2);

        setTimeout(() => {
            expect(listItems.innerHTML).toMatch("Dagobert");
        }, 300);

    });
})


describe("selectedEvent", () => {
    const list = generateList();
    const listItems = list.getByIdFromShadowRoot("listElements") as HTMLElement;

    test('should have childrne to click', () => {
        expect(listItems.childElementCount).toBeGreaterThan(0);
    });

    test("should fire event", () => {
        let firstItem = listItems.children[0];

        list.addEventListener("selected", (event: Event) => {
            // Second Item because they are sorted
            expect((event as CustomEvent).detail).toEqual(data[1]);
        });

        firstItem.dispatchEvent(new Event("click"));


    })

})