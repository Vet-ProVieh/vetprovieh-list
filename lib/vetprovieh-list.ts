import {VetproViehPager} from "@tomuench/vetprovieh-pager";
import {ViewHelper, VetproviehElement, ObjectHelper} from "@tomuench/vetprovieh-shared";

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
    static get template() {
        return VetproviehElement.template + ` 
    <style>
      :host {
        display: block;
      }
      #listElements div{
        cursor: pointer;
      }
      #listElements div:hover {
        background-color: #F0F0F0 !important;
      }
    </style>
  
    <!-- SearchControl on Top -->
    <div id="searchControl" class="control">
      <input id="search" class="input" type="text" 
             placeholder="Bitte Suchbegriff eingeben">
    </div>
  
    <!-- Listing Elements here -->
    <div id="listElements" style="margin-top:20px;">
  
    </div>
    <!-- Pager for Paging through List-->
    <vetprovieh-pager id="pager" page="1" maximum="7">
    </vetprovieh-pager>`;
    }

    /**
     * Getting observed Attributes
     * @return {string[]}
     */
    static get observedAttributes() {
        return ['src', 'pagesize', 'searchable', 'pageable'];
    }

    private _src: string = "";
    private _pagesize: number = 0;
    private _searchable: boolean = true;
    private _pageable: boolean = true;
    private _page: number = 1;
    private _maxPage: number = 1;
    private _listTemplate: DocumentFragment;

    /**
     * Default Constructor
     * accepts a template as parameter
     * @param {HTMLTemplateElement} pListTemplate
     */
    constructor(pListTemplate: HTMLTemplateElement) {
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
     * Getter src
     * @property {string|null} src
     * @return {string}
     */
    get src() {
        return this._src;
    }

    /** *
     * Setter Src
     * @param {string} val
     */
    set src(val) {
        if (val !== this.src) {
            this._src = val;
            this._fetchDataFromServer();
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
            this._fetchDataFromServer();
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
        if (val !== this.page) {
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
        // Lazy creation of shadowRoot.
        if (!this.shadowRoot) {
            super.attachShadow({
                mode: 'open',
            }).innerHTML = VetproviehList.template;
        }

        this._addSearchFieldListener();
        this._fetchDataFromServer();
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
    }

    /**
     * Search for a string
     * @param {string} searchString
     */
    search(searchString: string) {
        this._fetchDataFromServer(searchString);
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
                this.page = event.target.page;
                this._fetchDataFromServer();
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
    get _pager() : VetproViehPager {
        return this.shadowRoot.getElementById('pager');
    }

    /**
     * Can component fetch new data?
     * @private
     */
    get _readyToFetch() {
        return this.pagesize && this.src && this.shadowRoot;
    }

    /**
     * Loading Data from Remote-Server
     * @param {string | undefined} searchValue
     * @private
     */
    _fetchDataFromServer(searchValue: string | undefined = undefined) {
        if (this._readyToFetch) {
            const self = this;

            fetch(this.src)
                .then((response) => response.json())
                .then((data) => VetproviehList.search(data, searchValue))
                .then((data) => {self._setMaxPage(data.length); return data})
                .then((data) => self._filterByPage(data))
                .then((data) => self.attachData(data, searchValue, true));
        }
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
            const newListItem: HTMLElement = this._generateListItem(element);

            ViewHelper.replacePlaceholders(newListItem, element);

            if (searchValue) {
                ViewHelper.markElement(newListItem, searchValue);
            }

            if(list) list.appendChild(newListItem);
        }
    }

    /**
     * Generate new Item for List which is based on the template
     * @param {any} dataItem
     * @return {HTMLDivElement}
     * @private
     */
    _generateListItem(dataItem: any) {
        const newNode = document.importNode(this._listTemplate, true);
        const div = document.createElement('div');
        div.addEventListener('click', (event) => {
            const selectedEvent = new Event('selected');
            selectedEvent['data'] = dataItem;
            this.dispatchEvent(selectedEvent);
        });
        div.appendChild(newNode);
        return div;
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

customElements.define('vetprovieh-list', VetproviehList);
