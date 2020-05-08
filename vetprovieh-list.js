import { VetproviehPager } from "@tomuench/vetprovieh-pager";

class VetproviehList extends HTMLElement {


  static get template() {
    return ` 
      <link href="../node_modules/bulma/css/bulma.min.css" rel="stylesheet" type="text/css">
        <style>
          :host {
            display: block;
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
  /**
   * Regex to fill keys in template
   */
  static get regexTemplate() {
    return /{{([a-zA-Z0-9\.]+)}}/;
  }

  static get observedAttributes() {
    return ['src', 'pagesize'];
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
      endpoint: null,
      pagesize: null,
      page: 1,
      maxPage: 1,
      listTemplate: "<p>No Template found. Please define one</p>"
    };

    var listTemplate = this.querySelector("template");
    if (listTemplate) {
      this._properties.listTemplate = listTemplate.content;
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
   * @param [Array] data
   * @param [string] searchValue
   * @param [boolean] clear
   */
  attachData(data, searchValue, clear = false) {
    if (clear) {
      this.shadowRoot.getElementById("listElements").innerHTML = "";
    }
    data.forEach(element => this._attachToList(element, searchValue));
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
          this._fetchDataFromServer(value);
        }, 300);
      }
    });
  }

  /**
   * Updating Pager
   */
  _updatePager() {
    if (this.shadowRoot) {
      this._pager.page = this.page;
      this._pager.maximum = this.maxPage;
    }
  }

  /**
   * GET Pager Element
   * @return [VetproviehPager]
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

      fetch(this.src + "/index.json")
        .then(response => response.json())
        .then(data => VetproviehList.search(data, searchValue))
        .then(data => self._setMaxPage(data.length) || data)
        .then(data => VetproviehList.filterByPage(data, self.page, self.pagesize))
        .then(data => self.attachData(data, searchValue, true));
    }
  }

  /**
   * Set Max-Page by lenth of data
   * @param [int] dataLength
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
    var newListItem = this._generateListItem();

    VetproviehList.replacePlaceholdersInTemplate(newListItem, element);

    if (searchValue) {
      VetproviehList.markElement(newListItem, searchValue);
    }

    list.appendChild(newListItem);
  }

  /**
   * Generate new Item for List which is based on the template
   * @private
   */
  _generateListItem() {
    var newNode = document.importNode(this._properties.listTemplate, true);
    var div = document.createElement("div");
    div.appendChild(newNode);
    return div;
  }

  /**
   * Toggeling List 
   */
  _toggleList() {
    this._toggleElement("#listElements");
  }

  /**
   *  Toggeling a HTML-Element
   * @param id
   * @private
   */
  _toggleElement(id, cssClass = "is-hidden") {
    var element = this.shadowRoot.querySelector(id);
    if (element.classList.contains(cssClass)) {
      element.classList.remove(cssClass);
    } else {
      element.classList.add(cssClass);
    }
  }

  // -----------------
  // CLASS METHODS
  // -----------------


  /**
   * Getting Value from JSON-Object
   * @param [object] value
   * @param [string] key
   * @return [object]
   */
  static getValueFromObj(value, key) {
    try {
      var attribute = key.split(".");
      while (attribute.length > 0) {
        value = value[attribute.shift()];
      }
      return value;
    } catch (ex) {
      return null;
    }
  }

  /**
   * Marking Element in Text
   * @param element
   * @param input
   */
  static markElement(element, input) {
    if (input != "") {
      element.childNodes.forEach((n) => {
        if (n.nodeName === "#text" && n.nodeValue.indexOf(input) >= 0) {
          n.parentElement.innerHTML = n.data
            .split(input)
            .join("<mark>" + input + "</mark>");
        } else {
          VetproviehList.markElement(n, input);
        }
      })
    }
  }

  /**
   * Object to String
   * @param [object] obj
   * @return [string]
   */
  static objectToStringDeep(obj) {
    return Object.keys(obj).map((k) => {
      if (typeof (obj[k]) == "object") {
        return VetproviehList.objectToStringDeep(obj[k]);
      } else {
        return obj[k];
      }
    }).toString()
  }


  /**
   * Replacing Placeholders in template from the loaded element
   * @param [HTMLElement] div
   * @param [object] element
   */
  static replacePlaceholdersInTemplate(div, element) {
    var match = null;
    while (match = div.innerHTML.match(VetproviehList.regexTemplate)) {
      var value = VetproviehList.getValueFromObj(element, match[1]);
      value = value || "${attribute} not found";
      div.innerHTML = div.innerHTML.replace(match[0], value);
    }
  }

  /**
   * Filter Data by Page
   * @param [Array] data
   * @param [number] currentPage
   * @param [number] pageSize
   * @return [Array]
   */
  static filterByPage(data, currentPage, pageSize) {
    return data.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
  }

  /**
   * Search by Value in Array
   * @param [Array] data
   * @param [string] searchValue
   */
  static search(data, searchValue) {
    if (searchValue) {
      return data.filter((e) => VetproviehList.objectToStringDeep(e).indexOf(searchValue) >= 0);
    } else {
      return data;
    }
  }
}

customElements.define('vetprovieh-list', VetproviehList);