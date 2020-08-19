/**
 * Helper to get and set Attributes on Objects
 */
class ObjectHelper {
    /**
     * Checking if the Element is an Object
     * @param obj
     */
    static isObject(obj) {
        return obj != null && typeof (obj) === 'object';
    }
    /**
       * Getting Value from JSON-Object
       * @param {Indexable} object
       * @param {string} key
       * @return {any}
       */
    static get(object, key) {
        try {
            const attributes = key.split('.');
            return this._iterateThrough(object, attributes);
        }
        catch (ex) {
            return undefined;
        }
    }
    /**
       * Iterating Through Object
       * @param {Indexable} obj
       * @param {string[]} attributes
       * @param {number} depth
       * @return {any}
       * @private
       */
    static _iterateThrough(obj, attributes, depth = 0) {
        if (depth < 0)
            return undefined;
        while (attributes.length > depth) {
            const attribute = attributes.shift();
            if (!obj)
                throw new Error('Unknown Key');
            obj = obj[attribute];
        }
        return obj;
    }
    /**
       * Setting value for Object
       * @param {Indexable} object
       * @param {string} key
       * @param {any} value
       */
    static set(object, key, value) {
        const attributes = key.split('.');
        object = this._iterateThrough(object, attributes, 1);
        const property = attributes[0];
        object[property] = value;
    }
    /**
       * Object to String
       * @param {Object} obj
       * @return {string}
       */
    static objectToStringDeep(obj) {
        if (!obj)
            return '';
        return Object.keys(obj).map((k) => {
            const value = obj[k];
            if (typeof (value) == 'object') {
                return ObjectHelper.objectToStringDeep(value);
            }
            else {
                return value;
            }
        }).toString();
    }
}

/**
 * Helpers for View
 */
class ViewHelper {
    /**
       * Mark text yellow inside an element.
       * @param {Node} element
       * @param {string} input
       */
    static markElement(element, input) {
        if (input != '') {
            element.childNodes.forEach((n) => {
                const value = n.nodeValue || '';
                if (n.nodeName === '#text' && value.indexOf(input) >= 0) {
                    element.innerHTML = n['data']
                        .split(input)
                        .join('<mark>' + input + '</mark>');
                }
                else {
                    ViewHelper.markElement(n, input);
                }
            });
        }
    }
    /**
     * Getting URL-Parameter from address
     * @param {string} key
     * @return {string}
     */
    static getParameter(key) {
        const urlString = window.location.href;
        const url = new URL(urlString);
        const value = url.searchParams.get(key);
        return value;
    }
    /**
       * Regex to fill keys in template
       * @return {RegExp}
       */
    static get regexTemplate() {
        return /{{([a-zA-Z0-9\.]+)}}/;
    }
    /**
       * Replacing Placeholders in template from the loaded element
       * @param {HTMLElement} template
       * @param {Indexable} e
       */
    static replacePlaceholders(template, e) {
        let match = null;
        while (match = template.innerHTML.match(ViewHelper.regexTemplate)) {
            let value = ObjectHelper.get(e, match[1]);
            value = value || '';
            template.innerHTML = template.innerHTML.replace(match[0], value);
        }
    }
}

/**
 * BaseClass for view Elements
 */
class VetproviehElement extends HTMLElement {
    /**
       * Callback Implementation
       * @param {string} name
       * @param {any} old
       * @param {any} value
       */
    attributeChangedCallback(name, old, value) {
        if (old !== value) {
            this[name] = value;
        }
    }
    /**
     * Loading HTML-Element From ShadowRoot
     * @param {string} id
     * @return {HTMLElement | undefined}
     */
    getByIdFromShadowRoot(id) {
        if (this.shadowRoot) {
            return this.shadowRoot.getElementById(id);
        }
    }
    /**
       * Hide Or Show Element
       * @param {string} id
       * @param {boolean} show
       */
    updateVisibility(id, show) {
        const search = this.getByIdFromShadowRoot(id);
        if (search) {
            if (!show) {
                search.classList.add('is-hidden');
            }
            else {
                search.classList.remove('is-hidden');
            }
        }
    }
    // -----------------
    // CLASS METHODS
    // -----------------
    /**
       * Getting Template
       * @return {string}
       */
    static get template() {
        return `<link href="/node_modules/bulma/css/bulma.min.css" 
                  rel="stylesheet" type="text/css">`;
    }
}

/**
 * Repeats Template Element. Amount is set by the amount of objects
 * inside
 */
class VetproviehRepeat extends VetproviehElement {
    /**
     * Default-Contructor
     * @param {HTMLTemplateElement} pListTemplate
     */
    constructor(pListTemplate = undefined) {
        super();
        this._objects = [];
        this._orderBy = "+position";
        const listTemplate = pListTemplate || this.querySelector('template');
        if (listTemplate) {
            this._listTemplate = listTemplate.content;
        }
        else {
            this._listTemplate = new DocumentFragment();
        }
    }
    /**
      * Getting View Template
      * @return {string}
      */
    static get template() {
        return VetproviehElement.template + `<div id="listElements"></div>`;
    }
    /**
       * Getting observed Attributes
       * @return {string[]}
       */
    static get observedAttributes() {
        return ['objects', 'orderBy'];
    }
    /**
     * Get objects
     * @return {Array<any>}
     */
    get objects() {
        return this._objects;
    }
    /**
     * Set objects
     * @param {Array<any>} v
     */
    set objects(v) {
        if (this._objects != v) {
            this._objects = v;
            this.clearAndRender();
        }
    }
    /**
    * Get OrderBy
    * Expect "+position" for asceding positon
    * Expect "-position" for descending position
    * @return {string}
    */
    get orderBy() {
        return this._orderBy;
    }
    /**
     * Set OrderBy
     * @param {string} v
     */
    set orderBy(v) {
        if (this._orderBy != v) {
            this._orderBy = v;
            this.clearAndRender();
        }
    }
    /**
    * Connected Callback
    */
    connectedCallback() {
        this._initalizeShadowRoot(VetproviehRepeat.template);
        this.renderList();
    }
    /**
     * Clear and Render
     */
    clearAndRender() {
        this.clear();
        this._sortObjects();
        this.renderList();
    }
    /**
     * Sorting Objects
     */
    _sortObjects() {
        try {
            let asc = this.orderBy.substring(0, 1) == "+" ? 1 : -1;
            let argument = this.orderBy.substring(1);
            this.objects = this.objects
                .sort((a, b) => {
                let aValue = a[argument];
                let bValue = b[argument];
                return (aValue - bValue) * asc;
            });
        }
        catch (e) {
        }
    }
    /**
     * List will be cleared
     */
    clear() {
        const list = this.list;
        if (list)
            list.innerHTML = '';
    }
    /**
     * Rendering List-Content
     */
    renderList() {
        this.objects
            .forEach((obj, index) => {
            this._attachToList(obj, index);
        });
    }
    /**
     * Inserts Element to List
     * @param {any} dataItem
     * @param {index} number
     * @private
     */
    _attachToList(dataItem, index = 0) {
        if (this.shadowRoot) {
            const newListItem = this._generateListItem(dataItem);
            dataItem["index"] = index;
            ViewHelper.replacePlaceholders(newListItem, dataItem);
            const list = this.list;
            if (list) {
                list.appendChild(newListItem.children[0]);
            }
        }
    }
    /**
     * Getting List Element
     * @return {HTMLElement | undefined}
     */
    get list() {
        if (this.shadowRoot) {
            return this.shadowRoot.getElementById('listElements');
        }
        else {
            return undefined;
        }
    }
    /**
    * Generate new Item for List which is based on the template
    * @param {any} dataItem
    * @param {boolean} activatedEventListener
    * @return {HTMLDivElement}
    * @private
    */
    _generateListItem(dataItem, activatedEventListener = false) {
        const newNode = document.importNode(this._listTemplate, true);
        const div = document.createElement('div');
        if (activatedEventListener) {
            div.addEventListener('click', () => {
                const selectedEvent = new Event('selected');
                selectedEvent['data'] = dataItem;
                this.dispatchEvent(selectedEvent);
            });
        }
        div.appendChild(newNode);
        return div;
    }
    /**
     * Intializing Shadow-Root
     * @param {string} template
     * @protected
     */
    _initalizeShadowRoot(template) {
        // Lazy creation of shadowRoot.
        if (!this.shadowRoot) {
            super.attachShadow({
                mode: 'open',
            }).innerHTML = template;
        }
    }
}
if (!customElements.get('vp-repeat')) {
    customElements.define('vp-repeat', VetproviehRepeat);
}

class VetproviehPager extends HTMLElement {

      static get observedAttributes() {
        return ['page', 'maximum'];
      }

      static get template() {
        return `
        <link href="/node_modules/bulma/css/bulma.min.css" rel="stylesheet" type="text/css">
        <style>
          :host {
            display: block;
          }
        </style>
        <nav class="pagination is-centered is-small" role="navigation" aria-label="pagination">
          <ul id="pager" class="pagination-list">
          </ul>
        </nav>`;
      }

      attributeChangedCallback(name, old, value) {
        if (old !== value) {
          this[name] = value;
        }
      }

      constructor() {
        super();

        /**
         * @type {!Object}
         * @private
         */
        this._properties = {
          page: 1,
          maximum: 1
        };
      }

      /** 
       * @property {string|null} page
       */
      get page() {
        return this._properties.page;
      }

      set page(val) {
        let valAsInt = parseInt(val);
        if (valAsInt !== this.page) {
          this._properties.page = valAsInt;
          this._updateRendering();
        }
      }

      /** 
       * @property {string|null} maximum
       */
      get maximum() {
        return this._properties.maximum;
      }

      set maximum(val) {
        let valAsInt = parseInt(val);
        if (valAsInt !== this.maximum) {
          this._properties.maximum = valAsInt;
          this._updateRendering();
        }
      }

      /**
       * Render Pages for Pager
       * @return [string]
       * @private
       */
      _renderPages() {
        let pager = this.shadowRoot.querySelector('#pager');
        pager.appendChild(this._renderPage(1));
        this._addBlankPage(pager, this.page > 3);

        for (let i = -1; i < 2; i++) {
          const toDisplayPage = this.page + i;
          if (toDisplayPage > 1 && toDisplayPage < this.maximum) {
            pager.appendChild(this._renderPage(toDisplayPage));
          }
        }

        this._addBlankPage(pager, this.page < this.maximum - 2);
        if (this.maximum != 1) {
          pager.appendChild(this._renderPage(this.maximum));
        }
      }

      /**
       * render Page placeholder
       * @param [HTMLElement] pager
       * @param [boolean] show
       * @private
       */
      _addBlankPage(pager, show) {
        if (show) {
          var li = document.createElement('li');
          var span = document.createElement('span');
          span.classList.add("pagination-ellipsis");
          span.innerHTML = "&hellip;";
          li.appendChild(span);
          pager.appendChild(li);
        }
      }

      /**
       * Render Single page Button
       * @param [number] page
       * @return [HTMLLIElement] Element
       * @private
       */
      _renderPage(page) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.classList.add('pagination-link');
        if (page === this.page) {
          a.classList.add('is-current');
        }

        a.onclick = (event) => this._pageClickedEvent(this, event);

        a.title = "Open Page #" + this.page;
        var linkText = document.createTextNode(page);
        a.appendChild(linkText);
        li.appendChild(a);

        return li;
      }

      /**
       * Page-Button has been clicked
       * @param [VetproviehPager] pager
       * @param [Event] event
       * @private
       */
      _pageClickedEvent(pager, event) {
        var pageBefore = pager.page;
        pager.page = event.target.innerText;

        pager.dispatchEvent(new Event("change"));
      }


      connectedCallback() {
        // Lazy creation of shadowRoot.
        if (!this.shadowRoot) {
          this.attachShadow({
            mode: 'open'
          }).innerHTML = VetproviehPager.template;
        }
        this._updateRendering();
      }

      /**
       * @private
       */
      _updateRendering() {
        // Avoid rendering when not connected.
        if (this.shadowRoot && this.isConnected) {
          this.shadowRoot.querySelector('#pager').innerHTML = "";
          this._renderPages();
        }
      }
    }

    customElements.define('vetprovieh-pager', VetproviehPager);

/**
 * List Element for Vet:Provieh
 * Reads Data from Webservice an shows it.
 * @property {boolean} searchable
 * @property {boolean} pageable
 * @property {string} src
 */
class VetproviehList extends VetproviehElement {
    /**
     * Default Constructor
     * accepts a template as parameter
     * @param {HTMLTemplateElement} pListTemplate
     */
    constructor(pListTemplate = undefined) {
        super();
        this._src = "";
        this._pagesize = 0;
        this._searchable = true;
        this._pageable = true;
        this._page = 1;
        this._maxPage = 1;
        const listTemplate = pListTemplate || this.querySelector('template');
        if (listTemplate) {
            this._listTemplate = listTemplate.content;
        }
    }
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
            this._src = this._replaceParams(val);
            this._fetchDataFromServer();
        }
    }
    _replaceParams(val) {
        let newSrc = val;
        let regex = /{{([a-zA-Z0-9]+)}}/;
        const url = new URL(window.location.href);
        const matches = newSrc.match(regex);
        if (matches) {
            matches.shift();
            matches.forEach((m) => {
                newSrc = newSrc.replace("{{" + m + "}}", url.searchParams.get(m));
            });
        }
        return newSrc;
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
                let target = event.target;
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
    get _pager() {
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
    _fetchDataFromServer(searchValue = undefined) {
        if (this._readyToFetch) {
            const self = this;
            fetch(this.src)
                .then((response) => response.json())
                .then((data) => VetproviehList.search(data, searchValue))
                .then((data) => { self._setMaxPage(data.length); return data; })
                .then((data) => self._filterByPage(data))
                .then((data) => self.attachData(data, searchValue, true));
        }
    }
    /**
     * Set Max-Page by lenth of data
     * @param {number} dataLength
     * @return {boolean}
     */
    _setMaxPage(dataLength) {
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
            const list = this.shadowRoot.getElementById('listElements');
            const newListItem = this._generateListItem(element);
            ViewHelper.replacePlaceholders(newListItem, element);
            if (searchValue) {
                ViewHelper.markElement(newListItem, searchValue);
            }
            if (list) {
                this._attachDataToStoreLocalLink(element, newListItem);
                list.appendChild(newListItem);
            }
        }
    }
    /**
     * Inserts Element to List
     * @param {object} element
     * @param {HTMLElement} newListItem
     * @private
     */
    _attachDataToStoreLocalLink(element, newListItem) {
        const link = newListItem.getElementsByTagName("a")[0];
        if (link && link.attributes["is"] && link.attributes["is"].value === "local-store") {
            link.params = element;
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
        console.log(div.getElementsByTagName("a"));
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
                return ObjectHelper.objectToStringDeep(e).indexOf(searchValue) >= 0;
            });
        }
        else {
            return data;
        }
    }
}
if (!customElements.get('vetprovieh-list')) {
    customElements.define('vetprovieh-list', VetproviehList);
}

export { VetproviehList, VetproviehPager };
//# sourceMappingURL=vetprovieh-list.js.map
