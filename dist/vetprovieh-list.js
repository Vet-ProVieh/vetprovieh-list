/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

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
    get template() {
        return '';
    }
    constructor(shadowed = true) {
        super();
        if (shadowed) {
            this.attachShadow({
                mode: 'open',
            });
        }
        this.render();
    }
    /**
       * Callback Implementation
       * @param {string} name
       * @param {any} old
       * @param {any} value
       */
    attributeChangedCallback(name, old, value) {
        if (old !== value) {
            this.sendCallback(`_${name}_beforeSet`, value);
            this[name] = value;
            this.sendCallback(`_${name}_afterSet`, value);
            this.render();
        }
    }
    /**
     * Connected Callback
     */
    connectedCallback() {
    }
    sendCallback(name, value) {
        const method = this[name];
        if (method && typeof (method) === 'function') {
            this[name](value);
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
    render() {
        const renderedTemplate = eval('`' + this.template + '`');
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = renderedTemplate;
        }
        else {
            this.innerHTML = renderedTemplate;
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
    set innerHTML(input) {
        if (this.shadowRoot != null) {
            this.shadowRoot.innerHTML = input;
        }
        else {
            super.innerHTML = input;
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
        this._orderBy = '+position';
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
            const asc = this.orderBy.substring(0, 1) == '+' ? 1 : -1;
            const argument = this.orderBy.substring(1);
            this.objects = this.objects
                .sort((a, b) => {
                const aValue = a[argument];
                const bValue = b[argument];
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
            dataItem['index'] = index;
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

function WebComponent(webComponentArgs) {
    /**
       * Defining Tag for HTML-Component
       * @param {any} constructor
       * @param {string} tagName
       */
    const defineTag = (constructor, tagName) => {
        if (!customElements.get(tagName)) {
            customElements.define(tagName, constructor);
        }
    };
    return function (constructorFunction) {
        /**
             * Building Wrapper Function for new Constructor
             * @param args
             */
        const newConstructorFunction = function (...args) {
            const func = function () {
                return new constructorFunction(...args);
            };
            func.prototype = constructorFunction.prototype;
            const result = new func();
            return result;
        };
        newConstructorFunction.prototype = constructorFunction.prototype;
        if (webComponentArgs.template) {
            Object.defineProperty(newConstructorFunction.prototype, 'template', {
                get: () => webComponentArgs.template || "",
            });
        }
        defineTag(constructorFunction, webComponentArgs.tag);
        return newConstructorFunction;
    };
}

let ListItem = /** @class */ (() => {
    let ListItem = class ListItem extends HTMLElement {
        constructor(list, data) {
            super();
            this._list = list;
            this._data = data;
            this._generate();
        }
        mark(searchValue) {
            if (searchValue) {
                ViewHelper.markElement(this, searchValue);
            }
        }
        _attachEventListener(event) {
            this.addEventListener(event, (event) => {
                const selectedEvent = new Event('selected');
                selectedEvent['data'] = this._data;
                this._list.dispatchEvent(selectedEvent);
            });
        }
        /**
        * Inserts Element to List
        * @param {object} element
        * @param {HTMLElement} newListItem
        * @private
        */
        _attachDataToStoreLocalLink() {
            const link = this.getElementsByTagName("a")[0];
            if (link && link.attributes["is"] && link.attributes["is"].value === "local-store") {
                link.params = this._data;
            }
        }
        _generate() {
            const newNode = document.importNode(this._list.listTemplate, true);
            this._attachEventListener('click');
            this.appendChild(newNode);
            ViewHelper.replacePlaceholders(this, this._data);
            this._attachDataToStoreLocalLink();
        }
    };
    ListItem = __decorate([
        WebComponent({
            template: "",
            tag: "list-item"
        }),
        __metadata("design:paramtypes", [Object, Object])
    ], ListItem);
    return ListItem;
})();

/**
 * Helper to get and set Attributes on Objects
 */
class ObjectHelper$1 {
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
                return ObjectHelper$1.objectToStringDeep(value);
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
class ViewHelper$1 {
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
                    ViewHelper$1.markElement(n, input);
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
        while (match = template.innerHTML.match(ViewHelper$1.regexTemplate)) {
            let value = ObjectHelper$1.get(e, match[1]);
            value = value || '';
            template.innerHTML = template.innerHTML.replace(match[0], value);
        }
    }
}

/**
 * BaseClass for view Elements
 */
class VetproviehElement$1 extends HTMLElement {
    get template() {
        return '';
    }
    constructor(shadowed = true) {
        super();
        if (shadowed) {
            this.attachShadow({
                mode: 'open',
            });
        }
        this.render();
    }
    /**
       * Callback Implementation
       * @param {string} name
       * @param {any} old
       * @param {any} value
       */
    attributeChangedCallback(name, old, value) {
        if (old !== value) {
            this.sendCallback(`_${name}_beforeSet`, value);
            this[name] = value;
            this.sendCallback(`_${name}_afterSet`, value);
            this.render();
        }
    }
    /**
     * Connected Callback
     */
    connectedCallback() {
    }
    sendCallback(name, value) {
        const method = this[name];
        if (method && typeof (method) === 'function') {
            this[name](value);
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
    render() {
        const renderedTemplate = eval('`' + this.template + '`');
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = renderedTemplate;
        }
        else {
            this.innerHTML = renderedTemplate;
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
    set innerHTML(input) {
        if (this.shadowRoot != null) {
            this.shadowRoot.innerHTML = input;
        }
        else {
            super.innerHTML = input;
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
class VetproviehRepeat$1 extends VetproviehElement$1 {
    /**
     * Default-Contructor
     * @param {HTMLTemplateElement} pListTemplate
     */
    constructor(pListTemplate = undefined) {
        super();
        this._objects = [];
        this._orderBy = '+position';
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
        return VetproviehElement$1.template + `<div id="listElements"></div>`;
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
        this._initalizeShadowRoot(VetproviehRepeat$1.template);
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
            const asc = this.orderBy.substring(0, 1) == '+' ? 1 : -1;
            const argument = this.orderBy.substring(1);
            this.objects = this.objects
                .sort((a, b) => {
                const aValue = a[argument];
                const bValue = b[argument];
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
            dataItem['index'] = index;
            ViewHelper$1.replacePlaceholders(newListItem, dataItem);
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
    customElements.define('vp-repeat', VetproviehRepeat$1);
}

/**
 * Paging Class
 */
class VetproviehPager extends VetproviehElement$1 {
    constructor() {
        super(...arguments);
        this._properties = {
            page: 1,
            maximum: 1,
        };
    }
    /**
     * Observed Attributes
     * @return {Array<string>}
     */
    static get observedAttributes() {
        return ['page', 'maximum'];
    }
    /**
     * Template for Pager
     * @return {string}
     */
    static get template() {
        return super.template + `
        <style>
          :host {
            display: block;
          }
        </style>
        <nav class="pagination is-centered is-small" role="navigation" 
             aria-label="pagination">
          <ul id="pager" class="pagination-list">
          </ul>
        </nav>`;
    }
    /**
     * Page Getter
     * @property {number|null} page
     */
    get page() {
        return this._properties.page;
    }
    /**
     * Setting page
     * @param {number} val
     */
    set page(val) {
        if (typeof (val) === 'string')
            val = parseInt(val);
        if (val !== this.page && val <= this.maximum && val > 0) {
            this._properties.page = val;
            this._updateRendering();
        }
    }
    /**
     * @property {number|null} maximum
     */
    get maximum() {
        return this._properties.maximum;
    }
    /**
     * Setting Maximum
     * @param {number} val
     */
    set maximum(val) {
        if (val !== this.maximum) {
            this._properties.maximum = val;
            this._updateRendering();
        }
    }
    /**
     * Render Pages for Pager
     * @private
     */
    _renderPages() {
        const pager = this.getByIdFromShadowRoot('pager');
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
     * @param {HTMLElement} pager
     * @param {boolean} show
     * @private
     */
    _addBlankPage(pager, show) {
        if (show) {
            const li = document.createElement('li');
            const span = document.createElement('span');
            span.classList.add('pagination-ellipsis');
            span.innerHTML = '&hellip;';
            li.appendChild(span);
            pager.appendChild(li);
        }
    }
    /**
     * Render Single page Button
     * @param {number} page
     * @return {HTMLLIElement} Element
     * @private
     */
    _renderPage(page) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.classList.add('pagination-link');
        if (page === this.page) {
            a.classList.add('is-current');
        }
        a.onclick = (event) => this._pageClickedEvent(this, event);
        a.title = 'Open Page #' + this.page;
        const linkText = document.createTextNode(page.toString());
        a.appendChild(linkText);
        li.appendChild(a);
        return li;
    }
    /**
     * Page-Button has been clicked
     * @param {VetproviehPager} pager
     * @param {Event} event
     * @private
     */
    _pageClickedEvent(pager, event) {
        pager.page = parseInt(event.target.innerText);
        pager.dispatchEvent(new Event('change'));
    }
    /**
     * Connected Callback
     */
    connectedCallback() {
        // Lazy creation of shadowRoot.
        if (!this.shadowRoot) {
            this.attachShadow({
                mode: 'open',
            }).innerHTML = VetproviehPager.template;
        }
        this._updateRendering();
    }
    /**
     * @private
     */
    _updateRendering() {
        if (this.shadowRoot) {
            const pager = this.getByIdFromShadowRoot('pager');
            pager.innerHTML = '';
            this._renderPages();
        }
    }
}
if (!customElements.get('vetprovieh-pager')) {
    customElements.define('vetprovieh-pager', VetproviehPager);
}

/**
 * List Element for Vet:Provieh
 * Reads Data from Webservice an shows it.
 * @property {boolean} searchable
 * @property {boolean} pageable
 * @property {string} src
 */
let VetproviehList = /** @class */ (() => {
    var _a;
    let VetproviehList = class VetproviehList extends VetproviehElement {
        /**
         * Default Constructor
         * accepts a template as parameter
         * @param {HTMLTemplateElement} pListTemplate
         */
        constructor(pListTemplate = undefined) {
            super();
            this._pagesize = 0;
            this._searchable = true;
            this._pageable = true;
            this._page = 1;
            this._maxPage = 1;
            this._objects = [];
            const listTemplate = pListTemplate || this.querySelector('template');
            if (listTemplate) {
                this._listTemplate = listTemplate.content;
            }
        }
        /**
         * Getting observed Attributes
         * @return {string[]}
         */
        static get observedAttributes() {
            return ['pagesize', 'searchable', 'pageable'];
        }
        get repository() {
            return this._repository;
        }
        set repository(val) {
            if (this._repository != val) {
                this._repository = val;
                this._filterObjects();
            }
        }
        get objects() {
            return this._objects;
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
        search(searchString) {
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
                    this.page = event.target.page;
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
            return this.pagesize && this.repository && this.shadowRoot;
        }
        /**
         * Loading Data from Remote-Server
         * @param {string | undefined} searchValue
         * @private
         */
        _filterObjects(searchValue = undefined) {
            if (this._readyToFetch) {
                const self = this;
                this.repository.where(searchValue)
                    .then((data) => this._sort(data))
                    .then((data) => { self._setMaxPage(data.length); return data; })
                    .then((data) => self._filterByPage(data))
                    .then((data) => self.attachData(data, searchValue, true));
            }
        }
        /**
         * Sorting Data. can be overwritten
         * @param data
         */
        _sort(data) {
            return data;
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
                if (list) {
                    const newListItem = new ListItem(this, element);
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
        _filterByPage(data) {
            return data.slice((this.page - 1) * this.pagesize, this.page * this.pagesize);
        }
    };
    VetproviehList = __decorate([
        WebComponent({
            template: VetproviehElement.template + `<style>
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
                </vetprovieh-pager>`,
            tag: "vetprovieh-list"
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof HTMLTemplateElement !== "undefined" && HTMLTemplateElement) === "function" ? _a : Object])
    ], VetproviehList);
    return VetproviehList;
})();

export { VetproviehList, VetproviehPager };
//# sourceMappingURL=vetprovieh-list.js.map
