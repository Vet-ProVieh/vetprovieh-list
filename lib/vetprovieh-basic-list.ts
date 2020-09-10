import { VetproviehPager } from "@tomuench/vetprovieh-pager/lib";
import { VetproviehElement, IRepository } from "@tomuench/vetprovieh-shared/lib/index";
import { ListItem } from "./list-item";

/**
 * List Element for Vet:Provieh
 * Reads Data from Webservice an shows it.
 * @property {boolean} searchable
 * @property {boolean} pageable
 * @property {string} src
 */
export class VetproviehBasicList extends VetproviehElement {

    /**
     * Getting observed Attributes
     * @return {string[]}
     */
    static get observedAttributes() {
        return ['pagesize', 'searchable', 'pageable'];
    }

    private _pagesize: number = 0;
    private _searchable: boolean = true;
    private _pageable: boolean = true;
    private _page: number = 1;
    private _maxPage: number = 1;
    private _listTemplate: DocumentFragment;

    private _objects: any[] = [];
    private _repository: IRepository<any> | undefined;

    public get repository(){
        return this._repository;
    }

    public set repository(val) {
        if(this._repository != val){
            this._repository = val;
            this._filterObjects();
        }
    }

    public get objects() {
        return this._objects;
    }

    /**
     * Default Constructor
     * accepts a template as parameter
     * @param {HTMLTemplateElement} pListTemplate
     */
    constructor(pListTemplate: HTMLTemplateElement | undefined = undefined) {
        super();

        const listTemplate = pListTemplate || this.querySelector('template');
        if (listTemplate) {
            this._listTemplate = listTemplate.content;
        }
    }

    /**
     * Getter searchable
     * @property {string|null} searchable
     */
    get searchable() {
        return this._searchable;
    }

    get listTemplate() {
        return this._listTemplate;
    }

    /**
     * Setter Searchable
     * @param {boolean} val
     */
    set searchable(val) {
        if (val !== this.searchable) {
            this._searchable = val;
            super.updateVisibility('searchControl', this.searchable);
        }
    }

    /**
     * Getter Pageable
     * @property {string|null} pageable
     */
    get pageable() {
        return this._pageable;
    }

    /**
     * Setter Pageable
     * @param {boolean} val
     */
    set pageable(val) {
        if (val !== this.pageable) {
            this._pageable = val;
            this._updatePager();
        }
    }

    /**
     * Getter pagesize
     * @property {int} pagesize
     * @return {int}
     */
    get pagesize() {
        return this._pagesize;
    }


    /**
     * Setter Pagesize
     * @param {int} val
     */
    set pagesize(val) {
        if (val !== this.pagesize) {
            this._pagesize = val;
            this._setMaxPage(this._objects.length);
        }
    }

    /**
     * Getter CurrentPage
     * @property {int} page
     * @return {int}
     */
    get page() {
        return this._page;
    }

    /**
     * Setter CurrentPage
     * @param {int} val
     */
    set page(val) {
        if (val !== this.page && val <= this.maxPage) {
            this._page = val;
            this._updatePager();
        }
    }

    /**
     * Getter MaxPage
     * @property {int} maxPage
     * @return {int}
     */
    get maxPage() {
        return this._maxPage;
    }


    /**
     * Setter MaxPage
     * @param {int} val
     */
    set maxPage(val) {
        if (val !== this.maxPage) {
            this._maxPage = val;
            this._updatePager();
        }
    }

    /**
     * Connected Callback
     */
    connectedCallback() {
        super.connectedCallback();
        this._addSearchFieldListener();
        this._filterObjects();
        this._updatePager();
        this._addPagerListener();
    }

    /**
     * Attach Data to List
     * @param {Array} data
     * @param {string} searchValue
     * @param {boolean} clear
     */
    attachData(data, searchValue, clear = false) {
        if (clear) {
            this.shadowRoot.getElementById('listElements').innerHTML = '';
        }
        data.forEach((element) => this._attachToList(element, searchValue));
        this._objects = data;
    }

    /**
     * Search for a string
     * @param {string} searchString
     */
    search(searchString: string) {
        this._filterObjects(searchString);
    }

    // -----------------
    // PRIVATE METHODS
    // -----------------

    /**
     * Adding PageListener
     * @private
     */
    _addPagerListener() {
        if (this._pager) {
            this._pager.addEventListener('change', (event) => {
                this.page = (event.target as VetproviehPager).page;
                this._filterObjects();
            });
        }
    }

    /**
     * Input in search has Changed
     * @private
     */
    _addSearchFieldListener() {
        if (this.shadowRoot) {
            let searchTimer;
            let value = null;
            const searchField = this.shadowRoot.querySelector('#search');
            searchField.addEventListener('keyup', (event) => {
                let target = event.target as HTMLInputElement
                if (value != target.value) {
                    clearTimeout(searchTimer);
                    value = target.value;
                    searchTimer = setTimeout((_) => {
                        this.search(value);
                    }, 300);
                }
            });
            this.updateVisibility('searchControl', this.searchable);
        }
    }

    /**
     * Updating Pager
     */
    _updatePager() {
        if (this.shadowRoot) {
            this.updateVisibility(this._pager.id, this.pageable);
            this._pager.page = this.page;
            this._pager.maximum = this.maxPage;
        }
    }

    /**
     * GET Pager Element
     * @return {VetproviehPager}
     * @private
     */
    get _pager(): VetproviehPager {
        return this.shadowRoot.getElementById('pager') as VetproviehPager;
    }

    /**
     * Can component fetch new data?
     * @private
     */
    get _readyToFetch() {
        return this.pagesize && this.repository && this.shadowRoot;
    }

    /**
     * Loading Data from Remote-Server
     * @param {string | undefined} searchValue
     * @private
     */
    _filterObjects(searchValue: string | undefined = undefined) {
        if (this._readyToFetch) {
            const self = this;


            this.repository.where(searchValue)
                .then((data) => this._sort(data))
                .then((data) => { self._setMaxPage(data.length); return data })
                .then((data) => self._filterByPage(data))
                .then((data) => self.attachData(data, searchValue, true));
        }
    }

    /**
     * Sorting Data. can be overwritten
     * @param data 
     */
    protected _sort(data) {
        return data;
    }

    /**
     * Set Max-Page by lenth of data
     * @param {number} dataLength
     * @return {boolean}
     */
    _setMaxPage(dataLength: number) {
        this.maxPage = Math.ceil(dataLength / this.pagesize);
        return true;
    }

    /**
     * Inserts Element to List
     * @param {object} element
     * @param {string} searchValue
     * @private
     */
    _attachToList(element, searchValue) {
        if (this.shadowRoot) {
            const list: HTMLElement | null = this.shadowRoot.getElementById('listElements');
            if (list) {
                const newListItem: ListItem = new ListItem(this, element);
                newListItem.mark(searchValue);
                list.appendChild(newListItem);
            }
        }
    }



    /**
     * Filter Data by Page
     * @param {Array} data
     * @param {number} currentPage
     * @param {number} pageSize
     * @return {Array}
     * @private
     */
    _filterByPage(data: Array<any>) {
        return data.slice(
            (this.page - 1) * this.pagesize,
            this.page * this.pagesize,
        );
    }

    // -----------------
    // CLASS METHODS
    // -----------------



}