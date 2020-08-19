import { VetproviehList } from "./vetprovieh-list";
import { WebComponent, ViewHelper } from "@tomuench/vetprovieh-shared/lib";


@WebComponent({
    template:"",
    tag:"list-item"
})
export class ListItem extends HTMLElement {

    private _data: any;
    private _list: VetproviehList;

    constructor(list: VetproviehList, data: any) {
        super();
        this._list = list;
        this._data = data;
        this._generate();
    }

    public mark(searchValue: string){
        if (searchValue) {
            ViewHelper.markElement(this, searchValue);
        }
    }

    private _attachEventListener(event:string){
        this.addEventListener(event, (event) => {
            const selectedEvent = new Event('selected');
            selectedEvent['data'] = this._data;
            this._list.dispatchEvent(selectedEvent);
        });
    }

    private _generate() {
        const newNode = document.importNode(this._list.listTemplate, true);
        this._attachEventListener('click');
        this.appendChild(newNode);
        ViewHelper.replacePlaceholders(this, this._data);
    }
}