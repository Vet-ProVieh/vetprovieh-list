/**
 * List Element for Vet:Provieh
 * Reads Data from Webservice an shows it.
 * @property {boolean} searchable
 * @property {boolean} pageable
 * @property {string} src
 */
export class VetproviehList extends VetproviehElement {
    /**
     * Getting observed Attributes
     * @return {string[]}
     */
    static get observedAttributes(): string[];
    /**
     * Search by Value in Array
     * @param {Array} data
     * @param {string | undefined} searchValue
     * @return {Array}
     */
    static search(data: any[], searchValue: string | undefined): any[];
    /**
     * Default Constructor
     * accepts a template as parameter
     * @param {HTMLTemplateElement} pListTemplate
     */
    constructor(pListTemplate?: HTMLTemplateElement);
    _src: string;
    _pagesize: number;
    _searchable: boolean;
    _pageable: boolean;
    _page: number;
    _maxPage: number;
    _listTemplate: DocumentFragment;
    /**
     * Setter Searchable
     * @param {boolean} val
     */
    set searchable(arg: boolean);
    /**
     * Getter searchable
     * @property {string|null} searchable
     */
    get searchable(): boolean;
    /**
     * Setter Pageable
     * @param {boolean} val
     */
    set pageable(arg: boolean);
    /**
     * Getter Pageable
     * @property {string|null} pageable
     */
    get pageable(): boolean;
    /** *
     * Setter Src
     * @param {string} val
     */
    set src(arg: string);
    /**
     * Getter src
     * @property {string|null} src
     * @return {string}
     */
    get src(): string;
    /**
     * Setter Pagesize
     * @param {int} val
     */
    set pagesize(arg: any);
    /**
     * Getter pagesize
     * @property {int} pagesize
     * @return {int}
     */
    get pagesize(): any;
    /**
     * Setter CurrentPage
     * @param {int} val
     */
    set page(arg: any);
    /**
     * Getter CurrentPage
     * @property {int} page
     * @return {int}
     */
    get page(): any;
    /**
     * Setter MaxPage
     * @param {int} val
     */
    set maxPage(arg: any);
    /**
     * Getter MaxPage
     * @property {int} maxPage
     * @return {int}
     */
    get maxPage(): any;
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
    attachData(data: any[], searchValue: string, clear?: boolean): void;
    /**
     * Search for a string
     * @param {string} searchString
     */
    search(searchString: string): void;
    /**
     * Adding PageListener
     * @private
     */
    private _addPagerListener;
    /**
     * Input in search has Changed
     * @private
     */
    private _addSearchFieldListener;
    /**
     * Updating Pager
     */
    _updatePager(): void;
    /**
     * GET Pager Element
     * @return {VetproviehPager}
     * @private
     */
    private get _pager();
    /**
     * Can component fetch new data?
     * @private
     */
    private get _readyToFetch();
    /**
     * Loading Data from Remote-Server
     * @param {string | undefined} searchValue
     * @private
     */
    private _fetchDataFromServer;
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
    private _attachToList;
    /**
     * Generate new Item for List which is based on the template
     * @param {any} dataItem
     * @return {HTMLDivElement}
     * @private
     */
    private _generateListItem;
    /**
     * Filter Data by Page
     * @param {Array} data
     * @param {number} currentPage
     * @param {number} pageSize
     * @return {Array}
     * @private
     */
    private _filterByPage;
}
/**
 * BaseClass for view Elements
 */
declare class VetproviehElement extends HTMLElement {
    /**
       * Getting Template
       * @return {string}
       */
    static get template(): string;
    /**
       * Callback Implementation
       * @param {string} name
       * @param {any} old
       * @param {any} value
       */
    attributeChangedCallback(name: string, old: any, value: any): void;
    /**
     * Loading HTML-Element From ShadowRoot
     * @param {string} id
     * @return {HTMLElement | undefined}
     */
    getByIdFromShadowRoot(id: string): HTMLElement | undefined;
    /**
       * Hide Or Show Element
       * @param {string} id
       * @param {boolean} show
       */
    updateVisibility(id: string, show: boolean): void;
}
export {};
