var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("vetprovieh-list", ["require", "exports", "@tomuench/vetprovieh-shared/src"], function (require, exports, src_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VetproviehList = void 0;
    /**
     * List Element for Vet:Provieh
     * Reads Data from Webservice an shows it.
     * @property {boolean} searchable
     * @property {boolean} pageable
     * @property {string} src
     */
    var VetproviehList = /** @class */ (function (_super) {
        __extends(VetproviehList, _super);
        /**
           * Default Constructor
           * accepts a template as parameter
           * @param {HTMLTemplateElement} pListTemplate
           */
        function VetproviehList(pListTemplate) {
            var _this = _super.call(this) || this;
            /**
                 * @type {!Object}
                 * @private
                 */
            _this._properties = {
                endpoint: null,
                pagesize: null,
                searchable: true,
                pageable: true,
                page: 1,
                maxPage: 1,
                listTemplate: '<p>No Template found. Please define one</p>',
            };
            var listTemplate = pListTemplate || _this.querySelector('template');
            if (listTemplate) {
                _this._properties.listTemplate = listTemplate.content;
            }
            return _this;
        }
        Object.defineProperty(VetproviehList, "template", {
            /**
               * Getting View Template
               * @return {string}
               */
            get: function () {
                return src_1.VetproviehElement.template + " \n    <style>\n      :host {\n        display: block;\n      }\n      #listElements div{\n        cursor: pointer;\n      }\n      #listElements div:hover {\n        background-color: #F0F0F0 !important;\n      }\n    </style>\n  \n    <!-- SearchControl on Top -->\n    <div id=\"searchControl\" class=\"control\">\n      <input id=\"search\" class=\"input\" type=\"text\" \n             placeholder=\"Bitte Suchbegriff eingeben\">\n    </div>\n  \n    <!-- Listing Elements here -->\n    <div id=\"listElements\" style=\"margin-top:20px;\">\n  \n    </div>\n    <!-- Pager for Paging through List-->\n    <vetprovieh-pager id=\"pager\" page=\"1\" maximum=\"7\">\n    </vetprovieh-pager>";
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(VetproviehList, "observedAttributes", {
            /**
               * Getting observed Attributes
               * @return {string[]}
               */
            get: function () {
                return ['src', 'pagesize', 'searchable', 'pageable'];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(VetproviehList.prototype, "searchable", {
            /**
             * Getter searchable
               * @property {string|null} searchable
               */
            get: function () {
                return this._properties.searchable;
            },
            /**
               * Setter Searchable
               * @param {boolean} val
               */
            set: function (val) {
                if (val !== this.searchable) {
                    this._properties.searchable = val === 'true' || val === true;
                    this.updateVisbility('searchControl', this.searchable);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(VetproviehList.prototype, "pageable", {
            /**
             * Getter Pageable
               * @property {string|null} pageable
               */
            get: function () {
                return this._properties.pageable;
            },
            /**
               * Setter Pageable
               * @param {boolean} val
               */
            set: function (val) {
                if (val !== this.pageable) {
                    this._properties.pageable = val === 'true' || val === true;
                    this._updatePager();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(VetproviehList.prototype, "src", {
            /**
             * Getter src
               * @property {string|null} src
             * @return {string}
               */
            get: function () {
                return this._properties.src;
            },
            /** *
               * Setter Src
               * @param {string} val
               */
            set: function (val) {
                if (val !== this.src) {
                    this._properties.src = val;
                    this._fetchDataFromServer();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(VetproviehList.prototype, "pagesize", {
            /**
             * Getter pagesize
               * @property {int} pagesize
             * @return {int}
               */
            get: function () {
                return this._properties.pagesize;
            },
            /**
               * Setter Pagesize
               * @param {int} val
               */
            set: function (val) {
                if (val) {
                    val = parseInt(val);
                }
                if (val !== this.pagesize) {
                    this._properties.pagesize = val;
                    this._fetchDataFromServer();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(VetproviehList.prototype, "page", {
            /**
             * Getter CurrentPage
               * @property {int} page
             * @return {int}
               */
            get: function () {
                return this._properties.page;
            },
            /**
               * Setter CurrentPage
               * @param {int} val
               */
            set: function (val) {
                if (val !== this.page) {
                    this._properties.page = val;
                    this._updatePager();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(VetproviehList.prototype, "maxPage", {
            /**
             * Getter MaxPage
               * @property {int} maxPage
             * @return {int}
               */
            get: function () {
                return this._properties.maxPage;
            },
            /**
               * Setter MaxPage
               * @param {int} val
               */
            set: function (val) {
                if (val !== this.maxPage) {
                    this._properties.maxPage = val;
                    this._updatePager();
                }
            },
            enumerable: false,
            configurable: true
        });
        /**
           * Connected Callback
           */
        VetproviehList.prototype.connectedCallback = function () {
            // Lazy creation of shadowRoot.
            if (!this.shadowRoot) {
                this.attachShadow({
                    mode: 'open',
                }).innerHTML = VetproviehList.template;
            }
            this._addSearchFieldListener();
            this._fetchDataFromServer();
            this._updatePager();
            this._addPagerListener();
        };
        /**
           * Attach Data to List
           * @param {Array} data
           * @param {string} searchValue
           * @param {boolean} clear
           */
        VetproviehList.prototype.attachData = function (data, searchValue, clear) {
            var _this = this;
            if (clear === void 0) { clear = false; }
            if (clear) {
                this.shadowRoot.getElementById('listElements').innerHTML = '';
            }
            data.forEach(function (element) { return _this._attachToList(element, searchValue); });
        };
        /**
           * Search for a string
           * @param {string} searchString
           */
        VetproviehList.prototype.search = function (searchString) {
            this._fetchDataFromServer(searchString);
        };
        // -----------------
        // PRIVATE METHODS
        // -----------------
        /**
           * Adding PageListener
           * @private
           */
        VetproviehList.prototype._addPagerListener = function () {
            var _this = this;
            this._pager.addEventListener('change', function (event) {
                _this.page = event.target.page;
                _this._fetchDataFromServer();
            });
        };
        /**
           * Input in search has Changed
           * @private
           */
        VetproviehList.prototype._addSearchFieldListener = function () {
            var _this = this;
            var searchTimer = 0;
            var value = null;
            var searchField = this.shadowRoot.querySelector('#search');
            searchField.addEventListener('keyup', function (event) {
                if (value != event.target.value) {
                    clearTimeout(searchTimer);
                    value = event.target.value;
                    searchTimer = setTimeout(function (_) {
                        _this.search(value);
                    }, 300);
                }
            });
            this.updateVisbility('searchControl', this.searchable);
        };
        /**
           * Updating Pager
           */
        VetproviehList.prototype._updatePager = function () {
            if (this.shadowRoot) {
                this.updateVisbility(this._pager.id, this.pageable);
                this._pager.page = this.page;
                this._pager.maximum = this.maxPage;
            }
        };
        Object.defineProperty(VetproviehList.prototype, "_pager", {
            /**
               * GET Pager Element
               * @return {VetproviehPager}
               * @private
               */
            get: function () {
                return this.shadowRoot.getElementById('pager');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(VetproviehList.prototype, "_readyToFetch", {
            /**
               * Can component fetch new data?
               * @private
               */
            get: function () {
                return this.pagesize && this.src && this.shadowRoot;
            },
            enumerable: false,
            configurable: true
        });
        /**
           * Loading Data from Remote-Server
           * @param {string} searchValue
           * @private
           */
        VetproviehList.prototype._fetchDataFromServer = function (searchValue) {
            if (searchValue === void 0) { searchValue = null; }
            if (this._readyToFetch) {
                var self_1 = this;
                fetch(this.src)
                    .then(function (response) { return response.json(); })
                    .then(function (data) { return VetproviehList.search(data, searchValue); })
                    .then(function (data) { return self_1._setMaxPage(data.length) || data; })
                    .then(function (data) { return self_1._filterByPage(data); })
                    .then(function (data) { return self_1.attachData(data, searchValue, true); });
            }
        };
        /**
           * Set Max-Page by lenth of data
           * @param {int} dataLength
           */
        VetproviehList.prototype._setMaxPage = function (dataLength) {
            this.maxPage = Math.ceil(dataLength / this.pagesize);
        };
        /**
           * Inserts Element to List
           * @param {object} element
           * @param {string} searchValue
           * @private
           */
        VetproviehList.prototype._attachToList = function (element, searchValue) {
            var list = this.shadowRoot.getElementById('listElements');
            var newListItem = this._generateListItem(element);
            src_1.ViewHelper.replacePlaceholdersInTemplate(newListItem, element);
            if (searchValue) {
                src_1.ViewHelper.markElement(newListItem, searchValue);
            }
            list.appendChild(newListItem);
        };
        /**
           * Generate new Item for List which is based on the template
           * @param {object} dataItem
           * @return {HTMLElement}
           * @private
           */
        VetproviehList.prototype._generateListItem = function (dataItem) {
            var _this = this;
            var newNode = document.importNode(this._properties.listTemplate, true);
            var div = document.createElement('div');
            div.addEventListener('click', function (event) {
                var selectedEvent = new Event('selected');
                selectedEvent['data'] = dataItem;
                _this.dispatchEvent(selectedEvent);
            });
            div.appendChild(newNode);
            return div;
        };
        /**
           * Filter Data by Page
           * @param {Array} data
           * @param {number} currentPage
           * @param {number} pageSize
           * @return {Array}
           * @private
           */
        VetproviehList.prototype._filterByPage = function (data) {
            return data.slice((this.page - 1) * this.pagesize, this.page * this.pagesize);
        };
        // -----------------
        // CLASS METHODS
        // -----------------
        /**
           * Search by Value in Array
           * @param {Array} data
           * @param {string} searchValue
           * @return {Array}
           */
        VetproviehList.search = function (data, searchValue) {
            if (searchValue) {
                return data.filter(function (e) {
                    return src_1.ObjectHelper.objectToStringDeep(e).indexOf(searchValue) >= 0;
                });
            }
            else {
                return data;
            }
        };
        return VetproviehList;
    }(src_1.VetproviehElement));
    exports.VetproviehList = VetproviehList;
    customElements.define('vetprovieh-list', VetproviehList);
});
