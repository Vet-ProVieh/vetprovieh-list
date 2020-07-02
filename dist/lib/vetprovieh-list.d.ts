import { VetproViehPager } from "@tomuench/vetprovieh-pager";
import { VetproviehElement } from "@tomuench/vetprovieh-shared";
/**
 * List Element for Vet:Provieh
 * Reads Data from Webservice an shows it.
 * @property {boolean} searchable
 * @property {boolean} pageable
 * @property {string} src
 */
export default class VetproviehList extends VetproviehElement {
    /**
     * Getting View Template
     * @return {string}
     */
    static get template(): string;
    /**
     * Getting observed Attributes
     * @return {string[]}
     */
    static get observedAttributes(): string[];
    private _src;
    private _pagesize;
    private _searchable;
    private _pageable;
    private _page;
    private _maxPage;
    private _listTemplate;
    /**
     * Default Constructor
     * accepts a template as parameter
     * @param {HTMLTemplateElement} pListTemplate
     */
    constructor(pListTemplate: HTMLTemplateElement);
    /**
     * Getter searchable
     * @property {string|null} searchable
     */
    get searchable(): boolean;
    /**
     * Setter Searchable
     * @param {boolean} val
     */
    set searchable(val: boolean);
    /**
     * Getter Pageable
     * @property {string|null} pageable
     */
    get pageable(): boolean;
    /**
     * Setter Pageable
     * @param {boolean} val
     */
    set pageable(val: boolean);
    /**
     * Getter src
     * @property {string|null} src
     * @return {string}
     */
    get src(): string;
    /** *
     * Setter Src
     * @param {string} val
     */
    set src(val: string);
    /**
     * Getter pagesize
     * @property {int} pagesize
     * @return {int}
     */
    get pagesize(): number;
    /**
     * Setter Pagesize
     * @param {int} val
     */
    set pagesize(val: number);
    /**
     * Getter CurrentPage
     * @property {int} page
     * @return {int}
     */
    get page(): number;
    /**
     * Setter CurrentPage
     * @param {int} val
     */
    set page(val: number);
    /**
     * Getter MaxPage
     * @property {int} maxPage
     * @return {int}
     */
    get maxPage(): number;
    /**
     * Setter MaxPage
     * @param {int} val
     */
    set maxPage(val: number);
    /**
     * Connected Callback
     */
    connectedCallback(): void;
    /**
     * Attach Data to List
     * @param {Array} data
     * @param {string} searchValue
     * @param {boolean} clear
     */
    attachData(data: any, searchValue: any, clear?: boolean): void;
    /**
     * Search for a string
     * @param {string} searchString
     */
    search(searchString: string): void;
    /**
     * Adding PageListener
     * @private
     */
    _addPagerListener(): void;
    /**
     * Input in search has Changed
     * @private
     */
    _addSearchFieldListener(): void;
    /**
     * Updating Pager
     */
    _updatePager(): void;
    /**
     * GET Pager Element
     * @return {VetproviehPager}
     * @private
     */
    get _pager(): VetproViehPager;
    /**
     * Can component fetch new data?
     * @private
     */
    get _readyToFetch(): any;
    /**
     * Loading Data from Remote-Server
     * @param {string | undefined} searchValue
     * @private
     */
    _fetchDataFromServer(searchValue?: string | undefined): void;
    /**
     * Set Max-Page by lenth of data
     * @param {number} dataLength
     * @return {boolean}
     */
    _setMaxPage(dataLength: number): boolean;
    /**
     * Inserts Element to List
     * @param {object} element
     * @param {string} searchValue
     * @private
     */
    _attachToList(element: any, searchValue: any): void;
    /**
     * Generate new Item for List which is based on the template
     * @param {any} dataItem
     * @return {HTMLDivElement}
     * @private
     */
    _generateListItem(dataItem: any): HTMLDivElement;
    /**
     * Filter Data by Page
     * @param {Array} data
     * @param {number} currentPage
     * @param {number} pageSize
     * @return {Array}
     * @private
     */
    _filterByPage(data: Array<any>): any[];
    /**
     * Search by Value in Array
     * @param {Array} data
     * @param {string | undefined} searchValue
     * @return {Array}
     */
    static search(data: Array<any>, searchValue: string | undefined): any[];
}
//# sourceMappingURL=vetprovieh-list.d.ts.map