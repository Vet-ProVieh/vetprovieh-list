import {VetproviehPager} from "@tomuench/vetprovieh-pager";
import {ObjectHelper, ViewHelper, VetproviehElement} from "@tomuench/vetprovieh-shared";

export class VetproviehList extends VetproviehElement {

    static get template() {
        return super.template + ` 
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
          <input id="search" class="input" type="text" placeholder="Bitte Suchbegriff eingeben">
        </div>
      
        <!-- Listing Elements here -->
        <div id="listElements" style="margin-top:20px;">
      
        </div>
        <!-- Pager for Paging through List-->
        <vetprovieh-pager id="pager" page="1" maximum="7">
        </vetprovieh-pager>`;
    }


    static get observedAttributes() {
        return ['src', 'pagesize', 'searchable', 'pageable'];
    }

    constructor(pListTemplate) {
        super();

        /**
         * @type {!Object}
         * @private
         */
        this._properties = {
            endpoint: null,
            pagesize: null,
            searchable: true,
            pageable: true,
            page: 1,
            maxPage: 1,
            listTemplate: "<p>No Template found. Please define one</p>"
        };

        let listTemplate = pListTemplate || this.querySelector("template");
        if (listTemplate) {
            this._properties.listTemplate = listTemplate.content;
        }
    }

    /**
     * @property {string|null} searchable
     */
    get searchable() {
        return this._properties.searchable;
    }

    set searchable(val) {
        if (val !== this.searchable) {
            this._properties.searchable = val === "true" || val === true;
            this.updateVisbility("searchControl", this.searchable);
        }
    }

    /**
     * @property {string|null} pageable
     */
    get pageable() {
        return this._properties.pageable;
    }

    set pageable(val) {
        if (val !== this.pageable) {
            this._properties.pageable = val === "true" || val === true;
            this._updatePager();
        }
    }

    /**
     * @property {string|null} src
     */
    get src() {
        return this._properties.src;
    }

    /**
     * @property {int} pagesize
     */
    get pagesize() {
        return this._properties.pagesize;
    }

    /**
     * @property {int} page
     */
    get page() {
        return this._properties.page;
    }

    /**
     * @property {int} maxPage
     */
    get maxPage() {
        return this._properties.maxPage;
    }

    set page(val) {
        if (val !== this.page) {
            this._properties.page = val;
            this._updatePager();
        }
    }

    set maxPage(val) {
        if (val !== this.maxPage) {
            this._properties.maxPage = val;
            this._updatePager();
        }
    }

    set pagesize(val) {
        if (val) {
            val = parseInt(val);
        }
        if (val !== this.pagesize) {
            this._properties.pagesize = val;
            this._fetchDataFromServer();
        }
    }

    set src(val) {
        if (val !== this.src) {
            this._properties.src = val;
            this._fetchDataFromServer();
        }
    }

    connectedCallback() {
        // Lazy creation of shadowRoot.
        if (!this.shadowRoot) {
            this.attachShadow({
                mode: 'open'
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
            this.shadowRoot.getElementById("listElements").innerHTML = "";
        }
        data.forEach(element => this._attachToList(element, searchValue));
    }

    search(searchString) {
        this._fetchDataFromServer(searchString);
    }

    // -----------------
    // PRIVATE METHODS
    // -----------------

    _addPagerListener() {
        this._pager.addEventListener("change", (event) => {
            this.page = event.target.page;
            this._fetchDataFromServer();
        });
    }

    /**
     * Input in search has Changed
     * @private
     */
    _addSearchFieldListener() {
        var searchTimer = 0;
        var value = null;
        var searchField = this.shadowRoot.querySelector("#search");
        searchField.addEventListener("keyup", (event) => {
            if (value != event.target.value) {
                clearTimeout(searchTimer);
                value = event.target.value;
                searchTimer = setTimeout((_) => {
                    this.search(value);
                }, 300);
            }
        });
        this.updateVisbility("searchControl", this.searchable);
    }

    /**
     * Updating Pager
     */
    _updatePager() {
        if (this.shadowRoot) {
            this.updateVisbility(this._pager.id, this.pageable);
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
        return this.shadowRoot.getElementById("pager");
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
     * @private
     */
    _fetchDataFromServer(searchValue = null) {
        if (this._readyToFetch) {
            var self = this;

            fetch(this.src)
                .then(response => response.json())
                .then(data => VetproviehList.search(data, searchValue))
                .then(data => self._setMaxPage(data.length) || data)
                .then(data => VetproviehList.filterByPage(data, self.page, self.pagesize))
                .then(data => self.attachData(data, searchValue, true));
        }
    }

    /**
     * Set Max-Page by lenth of data
     * @param {int} dataLength
     */
    _setMaxPage(dataLength) {
        this.maxPage = Math.ceil(dataLength / this.pagesize);
    }

    /**
     * Inserts Element to List
     * @private
     */
    _attachToList(element, searchValue) {
        var list = this.shadowRoot.getElementById("listElements");
        var newListItem = this._generateListItem(element);

        ViewHelper.replacePlaceholdersInTemplate(newListItem, element);

        if (searchValue) {
            ViewHelper.markElement(newListItem, searchValue);
        }

        list.appendChild(newListItem);
    }

    /**
     * Generate new Item for List which is based on the template
     * @private
     */
    _generateListItem(element) {
        var newNode = document.importNode(this._properties.listTemplate, true);
        var div = document.createElement("div");
        div.addEventListener('click', (event) => {
            let selectedEvent = new Event("selected");
            selectedEvent["data"] = element;
            this.dispatchEvent(selectedEvent)

        })
        div.appendChild(newNode);
        return div;
    }

    // -----------------
    // CLASS METHODS
    // -----------------


    /**
     * Filter Data by Page
     * @param {Array} data
     * @param {number} currentPage
     * @param {number} pageSize
     * @return {Array}
     */
    static filterByPage(data, currentPage, pageSize) {
        return data.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
        );
    }

    /**
     * Search by Value in Array
     * @param {Array} data
     * @param {string} searchValue
     */
    static search(data, searchValue) {
        if (searchValue) {
            return data.filter((e) => ObjectHelper.objectToStringDeep(e).indexOf(searchValue) >= 0);
        } else {
            return data;
        }
    }
}

customElements.define('vetprovieh-list', VetproviehList);