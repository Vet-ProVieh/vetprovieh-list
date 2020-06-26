"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VetproviehList = void 0;
const vetprovieh_shared_1 = require("@tomuench/vetprovieh-shared");
/**
 * List Element for Vet:Provieh
 * Reads Data from Webservice an shows it.
 * @property {boolean} searchable
 * @property {boolean} pageable
 * @property {string} src
 */
class VetproviehList extends vetprovieh_shared_1.VetproviehElement {
    /**
     * Default Constructor
     * accepts a template as parameter
     * @param {HTMLTemplateElement} pListTemplate
     */
    constructor(pListTemplate = undefined) {
        super();
        this._src = '';
        this._pagesize = 0;
        this._searchable = true;
        this._pageable = true;
        this._page = 1;
        this._maxPage = 1;
        this._listTemplate = new DocumentFragment();
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
        if (val !== this.page && val <= this.maxPage) {
            this._page = val;
            this._updatePager();
        }
    }
    /**
     * Getter MaxPage
     * @return {int}
     */
    get maxPage() {
        return this._maxPage;
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
     * @param {Array<any>} data
     * @param {string | undefined} searchValue
     * @param {boolean} clear
     */
    attachData(data, searchValue, clear = false) {
        if (clear) {
            const es = this.getByIdFromShadowRoot('listElements');
            es.innerHTML = '';
        }
        data.forEach((element) => this._attachToList(element, searchValue));
    }
    /**
     * Search for a string
     * @param {string} searchString
     */
    search(searchString) {
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
                const target = event.target;
                this.page = target.page;
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
            const searchField = this.getByIdFromShadowRoot('search');
            searchField.addEventListener('keyup', (event) => {
                const target = event.target;
                if (value != target.value) {
                    clearTimeout(searchTimer);
                    value = target.value;
                    searchTimer = setTimeout(() => {
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
    get _pager() {
        return this.getByIdFromShadowRoot('pager');
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
    _fetchDataFromServer(searchValue = undefined) {
        if (this._readyToFetch) {
            fetch(this.src)
                .then((response) => response.json())
                .then((data) => VetproviehList.search(data, searchValue))
                .then((data) => {
                this._setMaxPage(data.length);
                return data;
            })
                .then((data) => this._filterByPage(data))
                .then((data) => this.attachData(data, searchValue, true));
        }
    }
    /**
     * Set Max-Page by lenth of data
     * @param {number} dataLength
     * @return {boolean}
     */
    _setMaxPage(dataLength) {
        this._maxPage = Math.ceil(dataLength / this.pagesize);
        return true;
    }
    /**
     * Inserts Element to List
     * @param {any} element
     * @param {string | undefined} searchValue
     * @private
     */
    _attachToList(element, searchValue) {
        if (this.shadowRoot) {
            const list = this.getByIdFromShadowRoot('listElements');
            const newListItem = this._generateListItem(element);
            vetprovieh_shared_1.ViewHelper.replacePlaceholders(newListItem, element);
            if (searchValue) {
                vetprovieh_shared_1.ViewHelper.markElement(newListItem, searchValue);
            }
            if (list)
                list.appendChild(newListItem);
        }
    }
    /**
     * Generate new Item for List which is based on the template
     * @param {any} dataItem
     * @return {HTMLDivElement}
     * @private
     */
    _generateListItem(dataItem) {
        const newNode = document.importNode(this._listTemplate, true);
        const div = document.createElement('div');
        div.addEventListener('click', () => {
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
    _filterByPage(data) {
        return data.slice((this.page - 1) * this.pagesize, this.page * this.pagesize);
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
    static search(data, searchValue) {
        if (searchValue) {
            return data.filter((e) => {
                return vetprovieh_shared_1.ObjectHelper.objectToStringDeep(e).indexOf(searchValue) >= 0;
            });
        }
        else {
            return data;
        }
    }
    /**
   * Getting View Template
   * @return {string}
   */
    static get template() {
        return vetprovieh_shared_1.VetproviehElement.template + ` 
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
}
exports.VetproviehList = VetproviehList;
customElements.define('vetprovieh-list', VetproviehList);
