/**
 * List Element for Vet:Provieh
 * Reads Data from Webservice an shows it.
 * @property {boolean} searchable
 * @property {boolean} pageable
 * @property {string} src
 */
export let VetproviehList: {
    new (pListTemplate?: HTMLTemplateElement): {
        _pagesize: number;
        _searchable: boolean;
        _pageable: boolean;
        _page: number;
        _maxPage: number;
        _objects: any[];
        _dataHelper: DataHelper;
        _urlSearchParams: {};
        _itemFactory: ListItemFactory;
        /**
         * Get Repository
         * @return {IRepository<BaseModel>}
         */
        repository: IRepository<BaseModel>;
        /**
         * Getting Objects from List
         * @return {Array<any>}
         */
        readonly objects: any[];
        /**
         * Set Search-Params
         * @param {any} params
         */
        urlSearchParams: any;
        /**
         * Overwrite render
         */
        render(): void;
        /**
         * Setting internal List Template
         * @param {HTMLTemplateElement} template
         */
        setlistTemplate(template: HTMLTemplateElement): void;
        _listTemplate: any;
        /**
           * Getter searchable
           * @return {boolean} searchable
           */
        searchable: boolean;
        /**
         * Get ListTemplate
         * @return {HTMLTemplateElement}
         */
        readonly listTemplate: HTMLTemplateElement;
        /**
           * Getter Pageable
           * @property {string|null} pageable
           */
        pageable: boolean;
        /**
           * Getter pagesize
           * @return {number}
           */
        pagesize: number;
        /**
           * Getter CurrentPage
           * @return {number}
           */
        page: number;
        /**
           * Getter MaxPage
           * @return {number}
           */
        maxPage: number;
        /**
           * Connected Callback
           */
        connectedCallback(): void;
        /**
           * Attach Data to List
           * @param {Array<BaseModel>} data
           * @param {string} searchValue
           * @param {boolean} clear
           */
        attachData(data: Array<BaseModel>, searchValue: string, clear?: boolean): void;
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
         * toggle SerachControl
         * @private
         */
        _toggleSearchControls(): void;
        /**
           * Updating Pager
           */
        _updatePager(): void;
        /**
           * GET Pager Element
           * @return {VetproviehPager}
           * @private
           */
        readonly _pager: {
            _page: number;
            _maximum: number;
            /**
               * Page Getter
               * @property {number|null} page
               */
            page: number;
            /**
               * @property {number|null} maximum
               */
            maximum: number;
            /**
               * Render Pages for Pager
               * @private
               */
            renderPages(): void;
            /**
               * render Page placeholder
               * @param {HTMLElement} pager
               * @param {boolean} show
               * @private
               */
            _addBlankPage(pager: HTMLElement, show: boolean): void;
            /**
               * Render Single page Button
               * @param {number} page
               * @return {HTMLLIElement} Element
               * @private
               */
            renderPage(page: number): HTMLLIElement;
            /**
               * Page-Button has been clicked
               * @param {VetproviehPager} pager
               * @param {Event} event
               * @private
               */
            _pageClickedEvent(pager: any, event: Event): void;
            /**
               * Connected Callback
               */
            connectedCallback(): void;
            /**
               * @private
               */
            render(): void;
            /**
             * Getting the template
             * @return {string}
             */
            readonly template: string;
            /**
             * Should skip render on callback
             * @return {boolean}
             */
            readonly skipRenderOnCallback: boolean;
            /**
             * Hide css?
             * @param {boolean} bool
             * @return {string}
             */
            cssHidden(bool: boolean): string;
            /**
               * Callback Implementation
               * @param {string} name
               * @param {any} old
               * @param {any} value
               */
            attributeChangedCallback(name: string, old: any, value: any): void;
            /**
             * Sending a Callback
             * @param {string} name
             * @param {any} value
             */
            sendCallback(name: string, value: any): void;
            /**
             * Loading HTML-Element From ShadowRoot
             * @param {string} id
             * @return {HTMLElement | undefined}
             */
            getByIdFromShadowRoot(id: string): HTMLElement | undefined;
            /**
             * Getting InnerHTML
             * @return {string}
             */
            innerHTML: string;
            /**
               * Hide Or Show Element
               * @param {string} id
               * @param {boolean} show
               */
            updateVisibility(id: string, show: boolean): void;
            accessKey: string;
            readonly accessKeyLabel: string;
            autocapitalize: string;
            dir: string;
            draggable: boolean;
            hidden: boolean;
            innerText: string;
            lang: string;
            readonly offsetHeight: number;
            readonly offsetLeft: number;
            readonly offsetParent: Element;
            readonly offsetTop: number;
            readonly offsetWidth: number;
            outerText: string;
            spellcheck: boolean;
            title: string;
            translate: boolean;
            attachInternals(): ElementInternals;
            click(): void;
            addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
            addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
            removeEventListener<K_1 extends keyof HTMLElementEventMap>(type: K_1, listener: (this: HTMLElement, ev: HTMLElementEventMap[K_1]) => any, options?: boolean | EventListenerOptions): void;
            removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
            readonly attributes: NamedNodeMap;
            readonly classList: DOMTokenList;
            className: string;
            readonly clientHeight: number;
            readonly clientLeft: number;
            readonly clientTop: number;
            readonly clientWidth: number;
            id: string;
            readonly localName: string;
            readonly namespaceURI: string;
            onfullscreenchange: (this: Element, ev: Event) => any;
            onfullscreenerror: (this: Element, ev: Event) => any;
            outerHTML: string;
            readonly ownerDocument: Document;
            readonly part: DOMTokenList;
            readonly prefix: string;
            readonly scrollHeight: number;
            scrollLeft: number;
            scrollTop: number;
            readonly scrollWidth: number;
            readonly shadowRoot: ShadowRoot;
            slot: string;
            readonly tagName: string;
            attachShadow(init: ShadowRootInit): ShadowRoot;
            closest<K_2 extends keyof HTMLElementTagNameMap>(selector: K_2): HTMLElementTagNameMap[K_2];
            closest<K_3 extends keyof SVGElementTagNameMap>(selector: K_3): SVGElementTagNameMap[K_3];
            closest<E extends Element = Element>(selectors: string): E;
            getAttribute(qualifiedName: string): string;
            getAttributeNS(namespace: string, localName: string): string;
            getAttributeNames(): string[];
            getAttributeNode(qualifiedName: string): Attr;
            getAttributeNodeNS(namespace: string, localName: string): Attr;
            getBoundingClientRect(): DOMRect;
            getClientRects(): DOMRectList;
            getElementsByClassName(classNames: string): HTMLCollectionOf<Element>;
            getElementsByTagName<K_4 extends keyof HTMLElementTagNameMap>(qualifiedName: K_4): HTMLCollectionOf<HTMLElementTagNameMap[K_4]>;
            getElementsByTagName<K_5 extends keyof SVGElementTagNameMap>(qualifiedName: K_5): HTMLCollectionOf<SVGElementTagNameMap[K_5]>;
            getElementsByTagName(qualifiedName: string): HTMLCollectionOf<Element>;
            getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1999/xhtml", localName: string): HTMLCollectionOf<HTMLElement>;
            getElementsByTagNameNS(namespaceURI: "http://www.w3.org/2000/svg", localName: string): HTMLCollectionOf<SVGElement>;
            getElementsByTagNameNS(namespace: string, localName: string): HTMLCollectionOf<Element>;
            hasAttribute(qualifiedName: string): boolean;
            hasAttributeNS(namespace: string, localName: string): boolean;
            hasAttributes(): boolean;
            hasPointerCapture(pointerId: number): boolean;
            insertAdjacentElement(where: InsertPosition, element: Element): Element;
            insertAdjacentHTML(position: InsertPosition, text: string): void;
            insertAdjacentText(where: InsertPosition, data: string): void;
            matches(selectors: string): boolean;
            releasePointerCapture(pointerId: number): void;
            removeAttribute(qualifiedName: string): void;
            removeAttributeNS(namespace: string, localName: string): void;
            removeAttributeNode(attr: Attr): Attr;
            requestFullscreen(options?: FullscreenOptions): Promise<void>;
            requestPointerLock(): void;
            scroll(options?: ScrollToOptions): void;
            scroll(x: number, y: number): void;
            scrollBy(options?: ScrollToOptions): void;
            scrollBy(x: number, y: number): void;
            scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void;
            scrollTo(options?: ScrollToOptions): void;
            scrollTo(x: number, y: number): void;
            setAttribute(qualifiedName: string, value: string): void;
            setAttributeNS(namespace: string, qualifiedName: string, value: string): void;
            setAttributeNode(attr: Attr): Attr;
            setAttributeNodeNS(attr: Attr): Attr;
            setPointerCapture(pointerId: number): void;
            toggleAttribute(qualifiedName: string, force?: boolean): boolean;
            webkitMatchesSelector(selectors: string): boolean;
            readonly baseURI: string;
            readonly childNodes: NodeListOf<ChildNode>;
            readonly firstChild: ChildNode;
            readonly isConnected: boolean;
            readonly lastChild: ChildNode;
            readonly nextSibling: ChildNode;
            readonly nodeName: string;
            readonly nodeType: number;
            nodeValue: string;
            readonly parentElement: HTMLElement;
            readonly parentNode: ParentNode;
            readonly previousSibling: ChildNode;
            textContent: string;
            appendChild<T extends Node>(node: T): T;
            cloneNode(deep?: boolean): Node;
            compareDocumentPosition(other: Node): number;
            contains(other: Node): boolean;
            getRootNode(options?: GetRootNodeOptions): Node;
            hasChildNodes(): boolean;
            insertBefore<T_1 extends Node>(node: T_1, child: Node): T_1;
            isDefaultNamespace(namespace: string): boolean;
            isEqualNode(otherNode: Node): boolean;
            isSameNode(otherNode: Node): boolean;
            lookupNamespaceURI(prefix: string): string;
            lookupPrefix(namespace: string): string;
            normalize(): void;
            removeChild<T_2 extends Node>(child: T_2): T_2;
            replaceChild<T_3 extends Node>(node: Node, child: T_3): T_3;
            readonly ATTRIBUTE_NODE: number;
            readonly CDATA_SECTION_NODE: number;
            readonly COMMENT_NODE: number;
            readonly DOCUMENT_FRAGMENT_NODE: number;
            readonly DOCUMENT_NODE: number;
            readonly DOCUMENT_POSITION_CONTAINED_BY: number;
            readonly DOCUMENT_POSITION_CONTAINS: number;
            readonly DOCUMENT_POSITION_DISCONNECTED: number;
            readonly DOCUMENT_POSITION_FOLLOWING: number;
            readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: number;
            readonly DOCUMENT_POSITION_PRECEDING: number;
            readonly DOCUMENT_TYPE_NODE: number;
            readonly ELEMENT_NODE: number;
            readonly ENTITY_NODE: number;
            readonly ENTITY_REFERENCE_NODE: number;
            readonly NOTATION_NODE: number;
            readonly PROCESSING_INSTRUCTION_NODE: number;
            readonly TEXT_NODE: number;
            dispatchEvent(event: Event): boolean;
            ariaAtomic: string;
            ariaAutoComplete: string;
            ariaBusy: string;
            ariaChecked: string;
            ariaColCount: string;
            ariaColIndex: string;
            ariaColSpan: string;
            ariaCurrent: string;
            ariaDisabled: string;
            ariaExpanded: string;
            ariaHasPopup: string;
            ariaHidden: string;
            ariaKeyShortcuts: string;
            ariaLabel: string;
            ariaLevel: string;
            ariaLive: string;
            ariaModal: string;
            ariaMultiLine: string;
            ariaMultiSelectable: string;
            ariaOrientation: string;
            ariaPlaceholder: string;
            ariaPosInSet: string;
            ariaPressed: string;
            ariaReadOnly: string;
            ariaRequired: string;
            ariaRoleDescription: string;
            ariaRowCount: string;
            ariaRowIndex: string;
            ariaRowSpan: string;
            ariaSelected: string;
            ariaSetSize: string;
            ariaSort: string;
            ariaValueMax: string;
            ariaValueMin: string;
            ariaValueNow: string;
            ariaValueText: string;
            animate(keyframes: PropertyIndexedKeyframes | Keyframe[], options?: number | KeyframeAnimationOptions): Animation;
            getAnimations(options?: GetAnimationsOptions): Animation[];
            after(...nodes: (string | Node)[]): void;
            before(...nodes: (string | Node)[]): void;
            remove(): void;
            replaceWith(...nodes: (string | Node)[]): void;
            readonly nextElementSibling: Element;
            readonly previousElementSibling: Element;
            readonly childElementCount: number;
            readonly children: HTMLCollection;
            readonly firstElementChild: Element;
            readonly lastElementChild: Element;
            append(...nodes: (string | Node)[]): void;
            prepend(...nodes: (string | Node)[]): void;
            querySelector<K_6 extends keyof HTMLElementTagNameMap>(selectors: K_6): HTMLElementTagNameMap[K_6];
            querySelector<K_7 extends keyof SVGElementTagNameMap>(selectors: K_7): SVGElementTagNameMap[K_7];
            querySelector<E_1 extends Element = Element>(selectors: string): E_1;
            querySelectorAll<K_8 extends keyof HTMLElementTagNameMap>(selectors: K_8): NodeListOf<HTMLElementTagNameMap[K_8]>;
            querySelectorAll<K_9 extends keyof SVGElementTagNameMap>(selectors: K_9): NodeListOf<SVGElementTagNameMap[K_9]>;
            querySelectorAll<E_2 extends Element = Element>(selectors: string): NodeListOf<E_2>;
            replaceChildren(...nodes: (string | Node)[]): void;
            readonly assignedSlot: HTMLSlotElement;
            oncopy: (this: DocumentAndElementEventHandlers, ev: ClipboardEvent) => any;
            oncut: (this: DocumentAndElementEventHandlers, ev: ClipboardEvent) => any;
            onpaste: (this: DocumentAndElementEventHandlers, ev: ClipboardEvent) => any;
            readonly style: CSSStyleDeclaration;
            contentEditable: string;
            enterKeyHint: string;
            inputMode: string;
            readonly isContentEditable: boolean;
            onabort: (this: GlobalEventHandlers, ev: UIEvent) => any;
            onanimationcancel: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
            onanimationend: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
            onanimationiteration: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
            onanimationstart: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
            onauxclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
            onblur: (this: GlobalEventHandlers, ev: FocusEvent) => any;
            oncanplay: (this: GlobalEventHandlers, ev: Event) => any;
            oncanplaythrough: (this: GlobalEventHandlers, ev: Event) => any;
            onchange: (this: GlobalEventHandlers, ev: Event) => any;
            onclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
            onclose: (this: GlobalEventHandlers, ev: Event) => any;
            oncontextmenu: (this: GlobalEventHandlers, ev: MouseEvent) => any;
            oncuechange: (this: GlobalEventHandlers, ev: Event) => any;
            ondblclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
            ondrag: (this: GlobalEventHandlers, ev: DragEvent) => any;
            ondragend: (this: GlobalEventHandlers, ev: DragEvent) => any;
            ondragenter: (this: GlobalEventHandlers, ev: DragEvent) => any;
            ondragleave: (this: GlobalEventHandlers, ev: DragEvent) => any;
            ondragover: (this: GlobalEventHandlers, ev: DragEvent) => any;
            ondragstart: (this: GlobalEventHandlers, ev: DragEvent) => any;
            ondrop: (this: GlobalEventHandlers, ev: DragEvent) => any;
            ondurationchange: (this: GlobalEventHandlers, ev: Event) => any;
            onemptied: (this: GlobalEventHandlers, ev: Event) => any;
            onended: (this: GlobalEventHandlers, ev: Event) => any;
            onerror: OnErrorEventHandlerNonNull;
            onfocus: (this: GlobalEventHandlers, ev: FocusEvent) => any;
            onformdata: (this: GlobalEventHandlers, ev: FormDataEvent) => any;
            ongotpointercapture: (this: GlobalEventHandlers, ev: PointerEvent) => any;
            oninput: (this: GlobalEventHandlers, ev: Event) => any;
            oninvalid: (this: GlobalEventHandlers, ev: Event) => any;
            onkeydown: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
            onkeypress: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
            onkeyup: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
            onload: (this: GlobalEventHandlers, ev: Event) => any;
            onloadeddata: (this: GlobalEventHandlers, ev: Event) => any;
            onloadedmetadata: (this: GlobalEventHandlers, ev: Event) => any;
            onloadstart: (this: GlobalEventHandlers, ev: Event) => any;
            onlostpointercapture: (this: GlobalEventHandlers, ev: PointerEvent) => any;
            onmousedown: (this: GlobalEventHandlers, ev: MouseEvent) => any;
            onmouseenter: (this: GlobalEventHandlers, ev: MouseEvent) => any;
            onmouseleave: (this: GlobalEventHandlers, ev: MouseEvent) => any;
            onmousemove: (this: GlobalEventHandlers, ev: MouseEvent) => any;
            onmouseout: (this: GlobalEventHandlers, ev: MouseEvent) => any;
            onmouseover: (this: GlobalEventHandlers, ev: MouseEvent) => any;
            onmouseup: (this: GlobalEventHandlers, ev: MouseEvent) => any;
            onpause: (this: GlobalEventHandlers, ev: Event) => any;
            onplay: (this: GlobalEventHandlers, ev: Event) => any;
            onplaying: (this: GlobalEventHandlers, ev: Event) => any;
            onpointercancel: (this: GlobalEventHandlers, ev: PointerEvent) => any;
            onpointerdown: (this: GlobalEventHandlers, ev: PointerEvent) => any;
            onpointerenter: (this: GlobalEventHandlers, ev: PointerEvent) => any;
            onpointerleave: (this: GlobalEventHandlers, ev: PointerEvent) => any;
            onpointermove: (this: GlobalEventHandlers, ev: PointerEvent) => any;
            onpointerout: (this: GlobalEventHandlers, ev: PointerEvent) => any;
            onpointerover: (this: GlobalEventHandlers, ev: PointerEvent) => any;
            onpointerup: (this: GlobalEventHandlers, ev: PointerEvent) => any;
            onprogress: (this: GlobalEventHandlers, ev: ProgressEvent<EventTarget>) => any;
            onratechange: (this: GlobalEventHandlers, ev: Event) => any;
            onreset: (this: GlobalEventHandlers, ev: Event) => any;
            onresize: (this: GlobalEventHandlers, ev: UIEvent) => any;
            onscroll: (this: GlobalEventHandlers, ev: Event) => any;
            onseeked: (this: GlobalEventHandlers, ev: Event) => any;
            onseeking: (this: GlobalEventHandlers, ev: Event) => any;
            onselect: (this: GlobalEventHandlers, ev: Event) => any;
            onselectionchange: (this: GlobalEventHandlers, ev: Event) => any;
            onselectstart: (this: GlobalEventHandlers, ev: Event) => any;
            onstalled: (this: GlobalEventHandlers, ev: Event) => any;
            onsubmit: (this: GlobalEventHandlers, ev: SubmitEvent) => any;
            onsuspend: (this: GlobalEventHandlers, ev: Event) => any;
            ontimeupdate: (this: GlobalEventHandlers, ev: Event) => any;
            ontoggle: (this: GlobalEventHandlers, ev: Event) => any;
            ontouchcancel?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
            ontouchend?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
            ontouchmove?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
            ontouchstart?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
            ontransitioncancel: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
            ontransitionend: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
            ontransitionrun: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
            ontransitionstart: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
            onvolumechange: (this: GlobalEventHandlers, ev: Event) => any;
            onwaiting: (this: GlobalEventHandlers, ev: Event) => any;
            onwebkitanimationend: (this: GlobalEventHandlers, ev: Event) => any;
            onwebkitanimationiteration: (this: GlobalEventHandlers, ev: Event) => any;
            onwebkitanimationstart: (this: GlobalEventHandlers, ev: Event) => any;
            onwebkittransitionend: (this: GlobalEventHandlers, ev: Event) => any;
            onwheel: (this: GlobalEventHandlers, ev: WheelEvent) => any;
            autofocus: boolean;
            readonly dataset: DOMStringMap;
            nonce?: string;
            tabIndex: number;
            blur(): void;
            focus(options?: FocusOptions): void;
        };
        /**
           * Can component fetch new data?
           * @return {boolean}
           * @private
           */
        readonly _readyToFetch: boolean;
        /** *
         * Getting SearchFIeld
         * @return {HTMLElement}
         */
        readonly searchField: HTMLElement;
        /**
           * Loading Data from Remote-Server
           * @param {string | undefined} searchValue
           * @private
           */
        _filterObjects(searchValue?: string | undefined): void;
        /**
           * Sorting Data. can be overwritten
           * @param {any} data
           * @return {any}
           */
        _sort(data: any): any;
        /**
         * @protected
           * Set Max-Page by lenth of data
           * @param {number} dataLength
           * @return {boolean}
           */
        _setMaxPage(dataLength: number): boolean;
        /**
         * Get Div for List element
         * @return {HTMLElement}
         */
        readonly listElementDiv: HTMLElement;
        /**
         * Dispatch Element-Selected Event
         * @param {CustomEvent} event
         */
        elementSelected(event: CustomEvent): void;
        /**
         * Getting the template
         * @return {string}
         */
        readonly template: string;
        /**
         * Should skip render on callback
         * @return {boolean}
         */
        readonly skipRenderOnCallback: boolean;
        /**
         * Hide css?
         * @param {boolean} bool
         * @return {string}
         */
        cssHidden(bool: boolean): string;
        /**
           * Callback Implementation
           * @param {string} name
           * @param {any} old
           * @param {any} value
           */
        attributeChangedCallback(name: string, old: any, value: any): void;
        /**
         * Sending a Callback
         * @param {string} name
         * @param {any} value
         */
        sendCallback(name: string, value: any): void;
        /**
         * Loading HTML-Element From ShadowRoot
         * @param {string} id
         * @return {HTMLElement | undefined}
         */
        getByIdFromShadowRoot(id: string): HTMLElement | undefined;
        /**
         * Getting InnerHTML
         * @return {string}
         */
        innerHTML: string;
        /**
           * Hide Or Show Element
           * @param {string} id
           * @param {boolean} show
           */
        updateVisibility(id: string, show: boolean): void;
        accessKey: string;
        readonly accessKeyLabel: string;
        autocapitalize: string;
        dir: string;
        draggable: boolean;
        hidden: boolean;
        innerText: string;
        lang: string;
        readonly offsetHeight: number;
        readonly offsetLeft: number;
        readonly offsetParent: Element;
        readonly offsetTop: number;
        readonly offsetWidth: number;
        outerText: string;
        spellcheck: boolean;
        title: string;
        translate: boolean;
        attachInternals(): ElementInternals;
        click(): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K_1 extends keyof HTMLElementEventMap>(type: K_1, listener: (this: HTMLElement, ev: HTMLElementEventMap[K_1]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
        readonly attributes: NamedNodeMap;
        readonly classList: DOMTokenList;
        className: string;
        readonly clientHeight: number;
        readonly clientLeft: number;
        readonly clientTop: number;
        readonly clientWidth: number;
        id: string;
        readonly localName: string;
        readonly namespaceURI: string;
        onfullscreenchange: (this: Element, ev: Event) => any;
        onfullscreenerror: (this: Element, ev: Event) => any;
        outerHTML: string;
        readonly ownerDocument: Document;
        readonly part: DOMTokenList;
        readonly prefix: string;
        readonly scrollHeight: number;
        scrollLeft: number;
        scrollTop: number;
        readonly scrollWidth: number;
        readonly shadowRoot: ShadowRoot;
        slot: string;
        readonly tagName: string;
        attachShadow(init: ShadowRootInit): ShadowRoot;
        closest<K_2 extends keyof HTMLElementTagNameMap>(selector: K_2): HTMLElementTagNameMap[K_2];
        closest<K_3 extends keyof SVGElementTagNameMap>(selector: K_3): SVGElementTagNameMap[K_3];
        closest<E extends Element = Element>(selectors: string): E;
        getAttribute(qualifiedName: string): string;
        getAttributeNS(namespace: string, localName: string): string;
        getAttributeNames(): string[];
        getAttributeNode(qualifiedName: string): Attr;
        getAttributeNodeNS(namespace: string, localName: string): Attr;
        getBoundingClientRect(): DOMRect;
        getClientRects(): DOMRectList;
        getElementsByClassName(classNames: string): HTMLCollectionOf<Element>;
        getElementsByTagName<K_4 extends keyof HTMLElementTagNameMap>(qualifiedName: K_4): HTMLCollectionOf<HTMLElementTagNameMap[K_4]>;
        getElementsByTagName<K_5 extends keyof SVGElementTagNameMap>(qualifiedName: K_5): HTMLCollectionOf<SVGElementTagNameMap[K_5]>;
        getElementsByTagName(qualifiedName: string): HTMLCollectionOf<Element>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1999/xhtml", localName: string): HTMLCollectionOf<HTMLElement>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/2000/svg", localName: string): HTMLCollectionOf<SVGElement>;
        getElementsByTagNameNS(namespace: string, localName: string): HTMLCollectionOf<Element>;
        hasAttribute(qualifiedName: string): boolean;
        hasAttributeNS(namespace: string, localName: string): boolean;
        hasAttributes(): boolean;
        hasPointerCapture(pointerId: number): boolean;
        insertAdjacentElement(where: InsertPosition, element: Element): Element;
        insertAdjacentHTML(position: InsertPosition, text: string): void;
        insertAdjacentText(where: InsertPosition, data: string): void;
        matches(selectors: string): boolean;
        releasePointerCapture(pointerId: number): void;
        removeAttribute(qualifiedName: string): void;
        removeAttributeNS(namespace: string, localName: string): void;
        removeAttributeNode(attr: Attr): Attr;
        requestFullscreen(options?: FullscreenOptions): Promise<void>;
        requestPointerLock(): void;
        scroll(options?: ScrollToOptions): void;
        scroll(x: number, y: number): void;
        scrollBy(options?: ScrollToOptions): void;
        scrollBy(x: number, y: number): void;
        scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void;
        scrollTo(options?: ScrollToOptions): void;
        scrollTo(x: number, y: number): void;
        setAttribute(qualifiedName: string, value: string): void;
        setAttributeNS(namespace: string, qualifiedName: string, value: string): void;
        setAttributeNode(attr: Attr): Attr;
        setAttributeNodeNS(attr: Attr): Attr;
        setPointerCapture(pointerId: number): void;
        toggleAttribute(qualifiedName: string, force?: boolean): boolean;
        webkitMatchesSelector(selectors: string): boolean;
        readonly baseURI: string;
        readonly childNodes: NodeListOf<ChildNode>;
        readonly firstChild: ChildNode;
        readonly isConnected: boolean;
        readonly lastChild: ChildNode;
        readonly nextSibling: ChildNode;
        readonly nodeName: string;
        readonly nodeType: number;
        nodeValue: string;
        readonly parentElement: HTMLElement;
        readonly parentNode: ParentNode;
        readonly previousSibling: ChildNode;
        textContent: string;
        appendChild<T extends Node>(node: T): T;
        cloneNode(deep?: boolean): Node;
        compareDocumentPosition(other: Node): number;
        contains(other: Node): boolean;
        getRootNode(options?: GetRootNodeOptions): Node;
        hasChildNodes(): boolean;
        insertBefore<T_1 extends Node>(node: T_1, child: Node): T_1;
        isDefaultNamespace(namespace: string): boolean;
        isEqualNode(otherNode: Node): boolean;
        isSameNode(otherNode: Node): boolean;
        lookupNamespaceURI(prefix: string): string;
        lookupPrefix(namespace: string): string;
        normalize(): void;
        removeChild<T_2 extends Node>(child: T_2): T_2;
        replaceChild<T_3 extends Node>(node: Node, child: T_3): T_3;
        readonly ATTRIBUTE_NODE: number;
        readonly CDATA_SECTION_NODE: number;
        readonly COMMENT_NODE: number;
        readonly DOCUMENT_FRAGMENT_NODE: number;
        readonly DOCUMENT_NODE: number;
        readonly DOCUMENT_POSITION_CONTAINED_BY: number;
        readonly DOCUMENT_POSITION_CONTAINS: number;
        readonly DOCUMENT_POSITION_DISCONNECTED: number;
        readonly DOCUMENT_POSITION_FOLLOWING: number;
        readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: number;
        readonly DOCUMENT_POSITION_PRECEDING: number;
        readonly DOCUMENT_TYPE_NODE: number;
        readonly ELEMENT_NODE: number;
        readonly ENTITY_NODE: number;
        readonly ENTITY_REFERENCE_NODE: number;
        readonly NOTATION_NODE: number;
        readonly PROCESSING_INSTRUCTION_NODE: number;
        readonly TEXT_NODE: number;
        dispatchEvent(event: Event): boolean;
        ariaAtomic: string;
        ariaAutoComplete: string;
        ariaBusy: string;
        ariaChecked: string;
        ariaColCount: string;
        ariaColIndex: string;
        ariaColSpan: string;
        ariaCurrent: string;
        ariaDisabled: string;
        ariaExpanded: string;
        ariaHasPopup: string;
        ariaHidden: string;
        ariaKeyShortcuts: string;
        ariaLabel: string;
        ariaLevel: string;
        ariaLive: string;
        ariaModal: string;
        ariaMultiLine: string;
        ariaMultiSelectable: string;
        ariaOrientation: string;
        ariaPlaceholder: string;
        ariaPosInSet: string;
        ariaPressed: string;
        ariaReadOnly: string;
        ariaRequired: string;
        ariaRoleDescription: string;
        ariaRowCount: string;
        ariaRowIndex: string;
        ariaRowSpan: string;
        ariaSelected: string;
        ariaSetSize: string;
        ariaSort: string;
        ariaValueMax: string;
        ariaValueMin: string;
        ariaValueNow: string;
        ariaValueText: string;
        animate(keyframes: PropertyIndexedKeyframes | Keyframe[], options?: number | KeyframeAnimationOptions): Animation;
        getAnimations(options?: GetAnimationsOptions): Animation[];
        after(...nodes: (string | Node)[]): void;
        before(...nodes: (string | Node)[]): void;
        remove(): void;
        replaceWith(...nodes: (string | Node)[]): void;
        readonly nextElementSibling: Element;
        readonly previousElementSibling: Element;
        readonly childElementCount: number;
        readonly children: HTMLCollection;
        readonly firstElementChild: Element;
        readonly lastElementChild: Element;
        append(...nodes: (string | Node)[]): void;
        prepend(...nodes: (string | Node)[]): void;
        querySelector<K_6 extends keyof HTMLElementTagNameMap>(selectors: K_6): HTMLElementTagNameMap[K_6];
        querySelector<K_7 extends keyof SVGElementTagNameMap>(selectors: K_7): SVGElementTagNameMap[K_7];
        querySelector<E_1 extends Element = Element>(selectors: string): E_1;
        querySelectorAll<K_8 extends keyof HTMLElementTagNameMap>(selectors: K_8): NodeListOf<HTMLElementTagNameMap[K_8]>;
        querySelectorAll<K_9 extends keyof SVGElementTagNameMap>(selectors: K_9): NodeListOf<SVGElementTagNameMap[K_9]>;
        querySelectorAll<E_2 extends Element = Element>(selectors: string): NodeListOf<E_2>;
        replaceChildren(...nodes: (string | Node)[]): void;
        readonly assignedSlot: HTMLSlotElement;
        oncopy: (this: DocumentAndElementEventHandlers, ev: ClipboardEvent) => any;
        oncut: (this: DocumentAndElementEventHandlers, ev: ClipboardEvent) => any;
        onpaste: (this: DocumentAndElementEventHandlers, ev: ClipboardEvent) => any;
        readonly style: CSSStyleDeclaration;
        contentEditable: string;
        enterKeyHint: string;
        inputMode: string;
        readonly isContentEditable: boolean;
        onabort: (this: GlobalEventHandlers, ev: UIEvent) => any;
        onanimationcancel: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationend: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationiteration: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationstart: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onauxclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onblur: (this: GlobalEventHandlers, ev: FocusEvent) => any;
        oncanplay: (this: GlobalEventHandlers, ev: Event) => any;
        oncanplaythrough: (this: GlobalEventHandlers, ev: Event) => any;
        onchange: (this: GlobalEventHandlers, ev: Event) => any;
        onclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onclose: (this: GlobalEventHandlers, ev: Event) => any;
        oncontextmenu: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        oncuechange: (this: GlobalEventHandlers, ev: Event) => any;
        ondblclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        ondrag: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragend: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragenter: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragleave: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragover: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragstart: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondrop: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondurationchange: (this: GlobalEventHandlers, ev: Event) => any;
        onemptied: (this: GlobalEventHandlers, ev: Event) => any;
        onended: (this: GlobalEventHandlers, ev: Event) => any;
        onerror: OnErrorEventHandlerNonNull;
        onfocus: (this: GlobalEventHandlers, ev: FocusEvent) => any;
        onformdata: (this: GlobalEventHandlers, ev: FormDataEvent) => any;
        ongotpointercapture: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        oninput: (this: GlobalEventHandlers, ev: Event) => any;
        oninvalid: (this: GlobalEventHandlers, ev: Event) => any;
        onkeydown: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onkeypress: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onkeyup: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onload: (this: GlobalEventHandlers, ev: Event) => any;
        onloadeddata: (this: GlobalEventHandlers, ev: Event) => any;
        onloadedmetadata: (this: GlobalEventHandlers, ev: Event) => any;
        onloadstart: (this: GlobalEventHandlers, ev: Event) => any;
        onlostpointercapture: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onmousedown: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseenter: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseleave: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmousemove: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseout: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseover: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseup: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onpause: (this: GlobalEventHandlers, ev: Event) => any;
        onplay: (this: GlobalEventHandlers, ev: Event) => any;
        onplaying: (this: GlobalEventHandlers, ev: Event) => any;
        onpointercancel: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerdown: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerenter: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerleave: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointermove: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerout: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerover: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerup: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onprogress: (this: GlobalEventHandlers, ev: ProgressEvent<EventTarget>) => any;
        onratechange: (this: GlobalEventHandlers, ev: Event) => any;
        onreset: (this: GlobalEventHandlers, ev: Event) => any;
        onresize: (this: GlobalEventHandlers, ev: UIEvent) => any;
        onscroll: (this: GlobalEventHandlers, ev: Event) => any;
        onseeked: (this: GlobalEventHandlers, ev: Event) => any;
        onseeking: (this: GlobalEventHandlers, ev: Event) => any;
        onselect: (this: GlobalEventHandlers, ev: Event) => any;
        onselectionchange: (this: GlobalEventHandlers, ev: Event) => any;
        onselectstart: (this: GlobalEventHandlers, ev: Event) => any;
        onstalled: (this: GlobalEventHandlers, ev: Event) => any;
        onsubmit: (this: GlobalEventHandlers, ev: SubmitEvent) => any;
        onsuspend: (this: GlobalEventHandlers, ev: Event) => any;
        ontimeupdate: (this: GlobalEventHandlers, ev: Event) => any;
        ontoggle: (this: GlobalEventHandlers, ev: Event) => any;
        ontouchcancel?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchend?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchmove?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchstart?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontransitioncancel: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionend: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionrun: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionstart: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        onvolumechange: (this: GlobalEventHandlers, ev: Event) => any;
        onwaiting: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationend: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationiteration: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationstart: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkittransitionend: (this: GlobalEventHandlers, ev: Event) => any;
        onwheel: (this: GlobalEventHandlers, ev: WheelEvent) => any;
        autofocus: boolean;
        readonly dataset: DOMStringMap;
        nonce?: string;
        tabIndex: number;
        blur(): void;
        focus(options?: FocusOptions): void;
    };
    /**
       * Getting observed Attributes
       * @return {string[]}
       */
    readonly observedAttributes: string[];
    /**
       * Getting Template
       * @return {string}
       */
    readonly template: string;
};
/**
 * Paging Class
 */
export let VetproviehPager: {
    new (...args: any[]): {
        _page: number;
        _maximum: number;
        /**
           * Page Getter
           * @property {number|null} page
           */
        page: number;
        /**
           * @property {number|null} maximum
           */
        maximum: number;
        /**
           * Render Pages for Pager
           * @private
           */
        renderPages(): void;
        /**
           * render Page placeholder
           * @param {HTMLElement} pager
           * @param {boolean} show
           * @private
           */
        _addBlankPage(pager: HTMLElement, show: boolean): void;
        /**
           * Render Single page Button
           * @param {number} page
           * @return {HTMLLIElement} Element
           * @private
           */
        renderPage(page: number): HTMLLIElement;
        /**
           * Page-Button has been clicked
           * @param {VetproviehPager} pager
           * @param {Event} event
           * @private
           */
        _pageClickedEvent(pager: any, event: Event): void;
        /**
           * Connected Callback
           */
        connectedCallback(): void;
        /**
           * @private
           */
        render(): void;
        /**
         * Getting the template
         * @return {string}
         */
        readonly template: string;
        /**
         * Should skip render on callback
         * @return {boolean}
         */
        readonly skipRenderOnCallback: boolean;
        /**
         * Hide css?
         * @param {boolean} bool
         * @return {string}
         */
        cssHidden(bool: boolean): string;
        /**
           * Callback Implementation
           * @param {string} name
           * @param {any} old
           * @param {any} value
           */
        attributeChangedCallback(name: string, old: any, value: any): void;
        /**
         * Sending a Callback
         * @param {string} name
         * @param {any} value
         */
        sendCallback(name: string, value: any): void;
        /**
         * Loading HTML-Element From ShadowRoot
         * @param {string} id
         * @return {HTMLElement | undefined}
         */
        getByIdFromShadowRoot(id: string): HTMLElement | undefined;
        /**
         * Getting InnerHTML
         * @return {string}
         */
        innerHTML: string;
        /**
           * Hide Or Show Element
           * @param {string} id
           * @param {boolean} show
           */
        updateVisibility(id: string, show: boolean): void;
        accessKey: string;
        readonly accessKeyLabel: string;
        autocapitalize: string;
        dir: string;
        draggable: boolean;
        hidden: boolean;
        innerText: string;
        lang: string;
        readonly offsetHeight: number;
        readonly offsetLeft: number;
        readonly offsetParent: Element;
        readonly offsetTop: number;
        readonly offsetWidth: number;
        outerText: string;
        spellcheck: boolean;
        title: string;
        translate: boolean;
        attachInternals(): ElementInternals;
        click(): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K_1 extends keyof HTMLElementEventMap>(type: K_1, listener: (this: HTMLElement, ev: HTMLElementEventMap[K_1]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
        readonly attributes: NamedNodeMap;
        readonly classList: DOMTokenList;
        className: string;
        readonly clientHeight: number;
        readonly clientLeft: number;
        readonly clientTop: number;
        readonly clientWidth: number;
        id: string;
        readonly localName: string;
        readonly namespaceURI: string;
        onfullscreenchange: (this: Element, ev: Event) => any;
        onfullscreenerror: (this: Element, ev: Event) => any;
        outerHTML: string;
        readonly ownerDocument: Document;
        readonly part: DOMTokenList;
        readonly prefix: string;
        readonly scrollHeight: number;
        scrollLeft: number;
        scrollTop: number;
        readonly scrollWidth: number;
        readonly shadowRoot: ShadowRoot;
        slot: string;
        readonly tagName: string;
        attachShadow(init: ShadowRootInit): ShadowRoot;
        closest<K_2 extends keyof HTMLElementTagNameMap>(selector: K_2): HTMLElementTagNameMap[K_2];
        closest<K_3 extends keyof SVGElementTagNameMap>(selector: K_3): SVGElementTagNameMap[K_3];
        closest<E extends Element = Element>(selectors: string): E;
        getAttribute(qualifiedName: string): string;
        getAttributeNS(namespace: string, localName: string): string;
        getAttributeNames(): string[];
        getAttributeNode(qualifiedName: string): Attr;
        getAttributeNodeNS(namespace: string, localName: string): Attr;
        getBoundingClientRect(): DOMRect;
        getClientRects(): DOMRectList;
        getElementsByClassName(classNames: string): HTMLCollectionOf<Element>;
        getElementsByTagName<K_4 extends keyof HTMLElementTagNameMap>(qualifiedName: K_4): HTMLCollectionOf<HTMLElementTagNameMap[K_4]>;
        getElementsByTagName<K_5 extends keyof SVGElementTagNameMap>(qualifiedName: K_5): HTMLCollectionOf<SVGElementTagNameMap[K_5]>;
        getElementsByTagName(qualifiedName: string): HTMLCollectionOf<Element>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1999/xhtml", localName: string): HTMLCollectionOf<HTMLElement>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/2000/svg", localName: string): HTMLCollectionOf<SVGElement>;
        getElementsByTagNameNS(namespace: string, localName: string): HTMLCollectionOf<Element>;
        hasAttribute(qualifiedName: string): boolean;
        hasAttributeNS(namespace: string, localName: string): boolean;
        hasAttributes(): boolean;
        hasPointerCapture(pointerId: number): boolean;
        insertAdjacentElement(where: InsertPosition, element: Element): Element;
        insertAdjacentHTML(position: InsertPosition, text: string): void;
        insertAdjacentText(where: InsertPosition, data: string): void;
        matches(selectors: string): boolean;
        releasePointerCapture(pointerId: number): void;
        removeAttribute(qualifiedName: string): void;
        removeAttributeNS(namespace: string, localName: string): void;
        removeAttributeNode(attr: Attr): Attr;
        requestFullscreen(options?: FullscreenOptions): Promise<void>;
        requestPointerLock(): void;
        scroll(options?: ScrollToOptions): void;
        scroll(x: number, y: number): void;
        scrollBy(options?: ScrollToOptions): void;
        scrollBy(x: number, y: number): void;
        scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void;
        scrollTo(options?: ScrollToOptions): void;
        scrollTo(x: number, y: number): void;
        setAttribute(qualifiedName: string, value: string): void;
        setAttributeNS(namespace: string, qualifiedName: string, value: string): void;
        setAttributeNode(attr: Attr): Attr;
        setAttributeNodeNS(attr: Attr): Attr;
        setPointerCapture(pointerId: number): void;
        toggleAttribute(qualifiedName: string, force?: boolean): boolean;
        webkitMatchesSelector(selectors: string): boolean;
        readonly baseURI: string;
        readonly childNodes: NodeListOf<ChildNode>;
        readonly firstChild: ChildNode;
        readonly isConnected: boolean;
        readonly lastChild: ChildNode;
        readonly nextSibling: ChildNode;
        readonly nodeName: string;
        readonly nodeType: number;
        nodeValue: string;
        readonly parentElement: HTMLElement;
        readonly parentNode: ParentNode;
        readonly previousSibling: ChildNode;
        textContent: string;
        appendChild<T extends Node>(node: T): T;
        cloneNode(deep?: boolean): Node;
        compareDocumentPosition(other: Node): number;
        contains(other: Node): boolean;
        getRootNode(options?: GetRootNodeOptions): Node;
        hasChildNodes(): boolean;
        insertBefore<T_1 extends Node>(node: T_1, child: Node): T_1;
        isDefaultNamespace(namespace: string): boolean;
        isEqualNode(otherNode: Node): boolean;
        isSameNode(otherNode: Node): boolean;
        lookupNamespaceURI(prefix: string): string;
        lookupPrefix(namespace: string): string;
        normalize(): void;
        removeChild<T_2 extends Node>(child: T_2): T_2;
        replaceChild<T_3 extends Node>(node: Node, child: T_3): T_3;
        readonly ATTRIBUTE_NODE: number;
        readonly CDATA_SECTION_NODE: number;
        readonly COMMENT_NODE: number;
        readonly DOCUMENT_FRAGMENT_NODE: number;
        readonly DOCUMENT_NODE: number;
        readonly DOCUMENT_POSITION_CONTAINED_BY: number;
        readonly DOCUMENT_POSITION_CONTAINS: number;
        readonly DOCUMENT_POSITION_DISCONNECTED: number;
        readonly DOCUMENT_POSITION_FOLLOWING: number;
        readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: number;
        readonly DOCUMENT_POSITION_PRECEDING: number;
        readonly DOCUMENT_TYPE_NODE: number;
        readonly ELEMENT_NODE: number;
        readonly ENTITY_NODE: number;
        readonly ENTITY_REFERENCE_NODE: number;
        readonly NOTATION_NODE: number;
        readonly PROCESSING_INSTRUCTION_NODE: number;
        readonly TEXT_NODE: number;
        dispatchEvent(event: Event): boolean;
        ariaAtomic: string;
        ariaAutoComplete: string;
        ariaBusy: string;
        ariaChecked: string;
        ariaColCount: string;
        ariaColIndex: string;
        ariaColSpan: string;
        ariaCurrent: string;
        ariaDisabled: string;
        ariaExpanded: string;
        ariaHasPopup: string;
        ariaHidden: string;
        ariaKeyShortcuts: string;
        ariaLabel: string;
        ariaLevel: string;
        ariaLive: string;
        ariaModal: string;
        ariaMultiLine: string;
        ariaMultiSelectable: string;
        ariaOrientation: string;
        ariaPlaceholder: string;
        ariaPosInSet: string;
        ariaPressed: string;
        ariaReadOnly: string;
        ariaRequired: string;
        ariaRoleDescription: string;
        ariaRowCount: string;
        ariaRowIndex: string;
        ariaRowSpan: string;
        ariaSelected: string;
        ariaSetSize: string;
        ariaSort: string;
        ariaValueMax: string;
        ariaValueMin: string;
        ariaValueNow: string;
        ariaValueText: string;
        animate(keyframes: PropertyIndexedKeyframes | Keyframe[], options?: number | KeyframeAnimationOptions): Animation;
        getAnimations(options?: GetAnimationsOptions): Animation[];
        after(...nodes: (string | Node)[]): void;
        before(...nodes: (string | Node)[]): void;
        remove(): void;
        replaceWith(...nodes: (string | Node)[]): void;
        readonly nextElementSibling: Element;
        readonly previousElementSibling: Element;
        readonly childElementCount: number;
        readonly children: HTMLCollection;
        readonly firstElementChild: Element;
        readonly lastElementChild: Element;
        append(...nodes: (string | Node)[]): void;
        prepend(...nodes: (string | Node)[]): void;
        querySelector<K_6 extends keyof HTMLElementTagNameMap>(selectors: K_6): HTMLElementTagNameMap[K_6];
        querySelector<K_7 extends keyof SVGElementTagNameMap>(selectors: K_7): SVGElementTagNameMap[K_7];
        querySelector<E_1 extends Element = Element>(selectors: string): E_1;
        querySelectorAll<K_8 extends keyof HTMLElementTagNameMap>(selectors: K_8): NodeListOf<HTMLElementTagNameMap[K_8]>;
        querySelectorAll<K_9 extends keyof SVGElementTagNameMap>(selectors: K_9): NodeListOf<SVGElementTagNameMap[K_9]>;
        querySelectorAll<E_2 extends Element = Element>(selectors: string): NodeListOf<E_2>;
        replaceChildren(...nodes: (string | Node)[]): void;
        readonly assignedSlot: HTMLSlotElement;
        oncopy: (this: DocumentAndElementEventHandlers, ev: ClipboardEvent) => any;
        oncut: (this: DocumentAndElementEventHandlers, ev: ClipboardEvent) => any;
        onpaste: (this: DocumentAndElementEventHandlers, ev: ClipboardEvent) => any;
        readonly style: CSSStyleDeclaration;
        contentEditable: string;
        enterKeyHint: string;
        inputMode: string;
        readonly isContentEditable: boolean;
        onabort: (this: GlobalEventHandlers, ev: UIEvent) => any;
        onanimationcancel: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationend: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationiteration: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationstart: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onauxclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onblur: (this: GlobalEventHandlers, ev: FocusEvent) => any;
        oncanplay: (this: GlobalEventHandlers, ev: Event) => any;
        oncanplaythrough: (this: GlobalEventHandlers, ev: Event) => any;
        onchange: (this: GlobalEventHandlers, ev: Event) => any;
        onclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onclose: (this: GlobalEventHandlers, ev: Event) => any;
        oncontextmenu: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        oncuechange: (this: GlobalEventHandlers, ev: Event) => any;
        ondblclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        ondrag: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragend: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragenter: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragleave: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragover: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragstart: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondrop: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondurationchange: (this: GlobalEventHandlers, ev: Event) => any;
        onemptied: (this: GlobalEventHandlers, ev: Event) => any;
        onended: (this: GlobalEventHandlers, ev: Event) => any;
        onerror: OnErrorEventHandlerNonNull;
        onfocus: (this: GlobalEventHandlers, ev: FocusEvent) => any;
        onformdata: (this: GlobalEventHandlers, ev: FormDataEvent) => any;
        ongotpointercapture: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        oninput: (this: GlobalEventHandlers, ev: Event) => any;
        oninvalid: (this: GlobalEventHandlers, ev: Event) => any;
        onkeydown: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onkeypress: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onkeyup: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onload: (this: GlobalEventHandlers, ev: Event) => any;
        onloadeddata: (this: GlobalEventHandlers, ev: Event) => any;
        onloadedmetadata: (this: GlobalEventHandlers, ev: Event) => any;
        onloadstart: (this: GlobalEventHandlers, ev: Event) => any;
        onlostpointercapture: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onmousedown: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseenter: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseleave: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmousemove: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseout: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseover: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseup: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onpause: (this: GlobalEventHandlers, ev: Event) => any;
        onplay: (this: GlobalEventHandlers, ev: Event) => any;
        onplaying: (this: GlobalEventHandlers, ev: Event) => any;
        onpointercancel: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerdown: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerenter: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerleave: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointermove: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerout: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerover: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerup: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onprogress: (this: GlobalEventHandlers, ev: ProgressEvent<EventTarget>) => any;
        onratechange: (this: GlobalEventHandlers, ev: Event) => any;
        onreset: (this: GlobalEventHandlers, ev: Event) => any;
        onresize: (this: GlobalEventHandlers, ev: UIEvent) => any;
        onscroll: (this: GlobalEventHandlers, ev: Event) => any;
        onseeked: (this: GlobalEventHandlers, ev: Event) => any;
        onseeking: (this: GlobalEventHandlers, ev: Event) => any;
        onselect: (this: GlobalEventHandlers, ev: Event) => any;
        onselectionchange: (this: GlobalEventHandlers, ev: Event) => any;
        onselectstart: (this: GlobalEventHandlers, ev: Event) => any;
        onstalled: (this: GlobalEventHandlers, ev: Event) => any;
        onsubmit: (this: GlobalEventHandlers, ev: SubmitEvent) => any;
        onsuspend: (this: GlobalEventHandlers, ev: Event) => any;
        ontimeupdate: (this: GlobalEventHandlers, ev: Event) => any;
        ontoggle: (this: GlobalEventHandlers, ev: Event) => any;
        ontouchcancel?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchend?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchmove?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchstart?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontransitioncancel: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionend: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionrun: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionstart: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        onvolumechange: (this: GlobalEventHandlers, ev: Event) => any;
        onwaiting: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationend: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationiteration: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationstart: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkittransitionend: (this: GlobalEventHandlers, ev: Event) => any;
        onwheel: (this: GlobalEventHandlers, ev: WheelEvent) => any;
        autofocus: boolean;
        readonly dataset: DOMStringMap;
        nonce?: string;
        tabIndex: number;
        blur(): void;
        focus(options?: FocusOptions): void;
    };
    /**
       * Observed Attributes
       * @return {Array<string>}
       */
    readonly observedAttributes: string[];
    /**
       * Getting Template
       * @return {string}
       */
    readonly template: string;
};
/**
 * Helper Class for data operations like
 * - filter
 * - load
 * - search
 */
declare class DataHelper {
    /**
       * Executing search on repository
       * @param {any} params
       * @param {string|undefined} value
       * @return {Promise}
       **/
    search(params: any, value?: string | undefined): Promise<any>;
    /**
       * Executing remote search on repository
       * @param {any} params
       * @param {string|undefined} value
       * @return {Promise}
       **/
    remoteSearch(params: any, value?: string | undefined): Promise<any>;
    /**
         * Filter Data by Page
         * @param {Array<BaseModel>} data
         * @param {number} currentPage
         * @param {number} pageSize
         * @return {Array<BaseModel>}
         */
    filterByPage(data: Array<BaseModel>, currentPage: number, pageSize: number): Array<BaseModel>;
    /**
       * Set Repository
       * @param {IRepository<BaseModel>} v
       */
    set repository(arg: IRepository<BaseModel>);
    /**
       * Get Repository
       * @return {IRepository<BaseModel>}
       */
    get repository(): IRepository<BaseModel>;
    _repository: IRepository<BaseModel>;
}
/**
 * ListItemFactory
 */
declare class ListItemFactory {
    /**
     * Default-Contructor
     * @param {HTMLElement} listItemDiv
     * @param {DocumentFragment} template
     * @param {Function} callbackSelected
     */
    constructor(listItemDiv: HTMLElement, template: DocumentFragment, callbackSelected: Function);
    _listItemDiv: HTMLElement;
    _template: DocumentFragment;
    _callbackSelected: Function;
    /**
     * Setter listItemDiv
     * @param {HTMLElement} v
     */
    set listItemDiv(arg: HTMLElement);
    /**
       * Appending new Data and clear parent div
       * @param {BaseModel[]} elements
       * @param {string|undefined} searchValue
       * @param {boolean} clear
       */
    appendAll(elements: BaseModel[], searchValue: string | undefined, clear: boolean): void;
    /**
       * Clearing the Item Div
       * @param {boolean} clear
       */
    clearItemDiv(clear: boolean): void;
    /**
       * Insert a placeholder if elements are empty
       */
    insertPlaceholderIfEmpty(): void;
    /**
     * Append an element and mark search value
     * @param {BaseModel} element
     * @param {string|undefined} searchValue
     */
    appendAndMarkSearch(element: BaseModel, searchValue: string | undefined): void;
    /**
       * Append a new ListItem to parent list
       * and return the item
       * @param {BaseModel} dataElement
       * @return {ListItem}
       */
    append(dataElement: BaseModel): {
        _data: BaseModel;
        /**
         * Marking Element, when found
         * @param {string} searchValue
         */
        mark(searchValue: string): void;
        /**
         * Attaching a Event-Listener
         * @private
         * @param {string} event
         */
        _attachEventListener(event: string): void;
        /**
           * Inserts Element to List
           * @param {object} element
           * @param {HTMLElement} newListItem
           * @private
           */
        _attachDataToStoreLocalLink(): void;
        /**
         * Generating the ListItem
         * @param {DocumentFragment} template
         */
        _generate(template: DocumentFragment): void;
        accessKey: string;
        readonly accessKeyLabel: string;
        autocapitalize: string;
        dir: string;
        draggable: boolean;
        hidden: boolean;
        innerText: string;
        lang: string;
        readonly offsetHeight: number;
        readonly offsetLeft: number;
        readonly offsetParent: Element;
        readonly offsetTop: number;
        readonly offsetWidth: number;
        outerText: string;
        spellcheck: boolean;
        title: string;
        translate: boolean;
        attachInternals(): ElementInternals;
        click(): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K_1 extends keyof HTMLElementEventMap>(type: K_1, listener: (this: HTMLElement, ev: HTMLElementEventMap[K_1]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
        readonly attributes: NamedNodeMap;
        readonly classList: DOMTokenList;
        className: string;
        readonly clientHeight: number;
        readonly clientLeft: number;
        readonly clientTop: number;
        readonly clientWidth: number;
        id: string;
        readonly localName: string;
        readonly namespaceURI: string;
        onfullscreenchange: (this: Element, ev: Event) => any;
        onfullscreenerror: (this: Element, ev: Event) => any;
        outerHTML: string;
        readonly ownerDocument: Document;
        readonly part: DOMTokenList;
        readonly prefix: string;
        readonly scrollHeight: number;
        scrollLeft: number;
        scrollTop: number;
        readonly scrollWidth: number;
        readonly shadowRoot: ShadowRoot;
        slot: string;
        readonly tagName: string;
        attachShadow(init: ShadowRootInit): ShadowRoot;
        closest<K_2 extends keyof HTMLElementTagNameMap>(selector: K_2): HTMLElementTagNameMap[K_2];
        closest<K_3 extends keyof SVGElementTagNameMap>(selector: K_3): SVGElementTagNameMap[K_3];
        closest<E extends Element = Element>(selectors: string): E;
        getAttribute(qualifiedName: string): string;
        getAttributeNS(namespace: string, localName: string): string;
        getAttributeNames(): string[];
        getAttributeNode(qualifiedName: string): Attr;
        getAttributeNodeNS(namespace: string, localName: string): Attr;
        getBoundingClientRect(): DOMRect;
        getClientRects(): DOMRectList;
        getElementsByClassName(classNames: string): HTMLCollectionOf<Element>;
        getElementsByTagName<K_4 extends keyof HTMLElementTagNameMap>(qualifiedName: K_4): HTMLCollectionOf<HTMLElementTagNameMap[K_4]>;
        getElementsByTagName<K_5 extends keyof SVGElementTagNameMap>(qualifiedName: K_5): HTMLCollectionOf<SVGElementTagNameMap[K_5]>;
        getElementsByTagName(qualifiedName: string): HTMLCollectionOf<Element>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1999/xhtml", localName: string): HTMLCollectionOf<HTMLElement>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/2000/svg", localName: string): HTMLCollectionOf<SVGElement>;
        getElementsByTagNameNS(namespace: string, localName: string): HTMLCollectionOf<Element>;
        hasAttribute(qualifiedName: string): boolean;
        hasAttributeNS(namespace: string, localName: string): boolean;
        hasAttributes(): boolean;
        hasPointerCapture(pointerId: number): boolean;
        insertAdjacentElement(where: InsertPosition, element: Element): Element;
        insertAdjacentHTML(position: InsertPosition, text: string): void;
        insertAdjacentText(where: InsertPosition, data: string): void;
        matches(selectors: string): boolean;
        releasePointerCapture(pointerId: number): void;
        removeAttribute(qualifiedName: string): void;
        removeAttributeNS(namespace: string, localName: string): void;
        removeAttributeNode(attr: Attr): Attr;
        requestFullscreen(options?: FullscreenOptions): Promise<void>;
        requestPointerLock(): void;
        scroll(options?: ScrollToOptions): void;
        scroll(x: number, y: number): void;
        scrollBy(options?: ScrollToOptions): void;
        scrollBy(x: number, y: number): void;
        scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void;
        scrollTo(options?: ScrollToOptions): void;
        scrollTo(x: number, y: number): void;
        setAttribute(qualifiedName: string, value: string): void;
        setAttributeNS(namespace: string, qualifiedName: string, value: string): void;
        setAttributeNode(attr: Attr): Attr;
        setAttributeNodeNS(attr: Attr): Attr;
        setPointerCapture(pointerId: number): void;
        toggleAttribute(qualifiedName: string, force?: boolean): boolean;
        webkitMatchesSelector(selectors: string): boolean;
        readonly baseURI: string;
        readonly childNodes: NodeListOf<ChildNode>;
        readonly firstChild: ChildNode;
        readonly isConnected: boolean;
        readonly lastChild: ChildNode;
        readonly nextSibling: ChildNode;
        readonly nodeName: string;
        readonly nodeType: number;
        nodeValue: string;
        readonly parentElement: HTMLElement;
        readonly parentNode: ParentNode;
        readonly previousSibling: ChildNode;
        textContent: string;
        appendChild<T extends Node>(node: T): T;
        cloneNode(deep?: boolean): Node;
        compareDocumentPosition(other: Node): number;
        contains(other: Node): boolean;
        getRootNode(options?: GetRootNodeOptions): Node;
        hasChildNodes(): boolean;
        insertBefore<T_1 extends Node>(node: T_1, child: Node): T_1;
        isDefaultNamespace(namespace: string): boolean;
        isEqualNode(otherNode: Node): boolean;
        isSameNode(otherNode: Node): boolean;
        lookupNamespaceURI(prefix: string): string;
        lookupPrefix(namespace: string): string;
        normalize(): void;
        removeChild<T_2 extends Node>(child: T_2): T_2;
        replaceChild<T_3 extends Node>(node: Node, child: T_3): T_3;
        readonly ATTRIBUTE_NODE: number;
        readonly CDATA_SECTION_NODE: number;
        readonly COMMENT_NODE: number;
        readonly DOCUMENT_FRAGMENT_NODE: number;
        readonly DOCUMENT_NODE: number;
        readonly DOCUMENT_POSITION_CONTAINED_BY: number;
        readonly DOCUMENT_POSITION_CONTAINS: number;
        readonly DOCUMENT_POSITION_DISCONNECTED: number;
        readonly DOCUMENT_POSITION_FOLLOWING: number;
        readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: number;
        readonly DOCUMENT_POSITION_PRECEDING: number;
        readonly DOCUMENT_TYPE_NODE: number;
        readonly ELEMENT_NODE: number;
        readonly ENTITY_NODE: number;
        readonly ENTITY_REFERENCE_NODE: number;
        readonly NOTATION_NODE: number;
        readonly PROCESSING_INSTRUCTION_NODE: number;
        readonly TEXT_NODE: number;
        dispatchEvent(event: Event): boolean;
        ariaAtomic: string;
        ariaAutoComplete: string;
        ariaBusy: string;
        ariaChecked: string;
        ariaColCount: string;
        ariaColIndex: string;
        ariaColSpan: string;
        ariaCurrent: string;
        ariaDisabled: string;
        ariaExpanded: string;
        ariaHasPopup: string;
        ariaHidden: string;
        ariaKeyShortcuts: string;
        ariaLabel: string;
        ariaLevel: string;
        ariaLive: string;
        ariaModal: string;
        ariaMultiLine: string;
        ariaMultiSelectable: string;
        ariaOrientation: string;
        ariaPlaceholder: string;
        ariaPosInSet: string;
        ariaPressed: string;
        ariaReadOnly: string;
        ariaRequired: string;
        ariaRoleDescription: string;
        ariaRowCount: string;
        ariaRowIndex: string;
        ariaRowSpan: string;
        ariaSelected: string;
        ariaSetSize: string;
        ariaSort: string;
        ariaValueMax: string;
        ariaValueMin: string;
        ariaValueNow: string;
        ariaValueText: string;
        animate(keyframes: PropertyIndexedKeyframes | Keyframe[], options?: number | KeyframeAnimationOptions): Animation;
        getAnimations(options?: GetAnimationsOptions): Animation[];
        after(...nodes: (string | Node)[]): void;
        before(...nodes: (string | Node)[]): void;
        remove(): void;
        replaceWith(...nodes: (string | Node)[]): void;
        innerHTML: string;
        readonly nextElementSibling: Element;
        readonly previousElementSibling: Element;
        readonly childElementCount: number;
        readonly children: HTMLCollection;
        readonly firstElementChild: Element;
        readonly lastElementChild: Element;
        append(...nodes: (string | Node)[]): void;
        prepend(...nodes: (string | Node)[]): void;
        querySelector<K_6 extends keyof HTMLElementTagNameMap>(selectors: K_6): HTMLElementTagNameMap[K_6];
        querySelector<K_7 extends keyof SVGElementTagNameMap>(selectors: K_7): SVGElementTagNameMap[K_7];
        querySelector<E_1 extends Element = Element>(selectors: string): E_1;
        querySelectorAll<K_8 extends keyof HTMLElementTagNameMap>(selectors: K_8): NodeListOf<HTMLElementTagNameMap[K_8]>;
        querySelectorAll<K_9 extends keyof SVGElementTagNameMap>(selectors: K_9): NodeListOf<SVGElementTagNameMap[K_9]>;
        querySelectorAll<E_2 extends Element = Element>(selectors: string): NodeListOf<E_2>;
        replaceChildren(...nodes: (string | Node)[]): void;
        readonly assignedSlot: HTMLSlotElement;
        oncopy: (this: DocumentAndElementEventHandlers, ev: ClipboardEvent) => any;
        oncut: (this: DocumentAndElementEventHandlers, ev: ClipboardEvent) => any;
        onpaste: (this: DocumentAndElementEventHandlers, ev: ClipboardEvent) => any;
        readonly style: CSSStyleDeclaration;
        contentEditable: string;
        enterKeyHint: string;
        inputMode: string;
        readonly isContentEditable: boolean;
        onabort: (this: GlobalEventHandlers, ev: UIEvent) => any;
        onanimationcancel: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationend: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationiteration: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationstart: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onauxclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onblur: (this: GlobalEventHandlers, ev: FocusEvent) => any;
        oncanplay: (this: GlobalEventHandlers, ev: Event) => any;
        oncanplaythrough: (this: GlobalEventHandlers, ev: Event) => any;
        onchange: (this: GlobalEventHandlers, ev: Event) => any;
        onclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onclose: (this: GlobalEventHandlers, ev: Event) => any;
        oncontextmenu: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        oncuechange: (this: GlobalEventHandlers, ev: Event) => any;
        ondblclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        ondrag: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragend: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragenter: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragleave: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragover: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragstart: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondrop: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondurationchange: (this: GlobalEventHandlers, ev: Event) => any;
        onemptied: (this: GlobalEventHandlers, ev: Event) => any;
        onended: (this: GlobalEventHandlers, ev: Event) => any;
        onerror: OnErrorEventHandlerNonNull;
        onfocus: (this: GlobalEventHandlers, ev: FocusEvent) => any;
        onformdata: (this: GlobalEventHandlers, ev: FormDataEvent) => any;
        ongotpointercapture: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        oninput: (this: GlobalEventHandlers, ev: Event) => any;
        oninvalid: (this: GlobalEventHandlers, ev: Event) => any;
        onkeydown: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onkeypress: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onkeyup: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onload: (this: GlobalEventHandlers, ev: Event) => any;
        onloadeddata: (this: GlobalEventHandlers, ev: Event) => any;
        onloadedmetadata: (this: GlobalEventHandlers, ev: Event) => any;
        onloadstart: (this: GlobalEventHandlers, ev: Event) => any;
        onlostpointercapture: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onmousedown: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseenter: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseleave: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmousemove: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseout: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseover: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseup: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onpause: (this: GlobalEventHandlers, ev: Event) => any;
        onplay: (this: GlobalEventHandlers, ev: Event) => any;
        onplaying: (this: GlobalEventHandlers, ev: Event) => any;
        onpointercancel: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerdown: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerenter: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerleave: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointermove: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerout: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerover: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerup: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onprogress: (this: GlobalEventHandlers, ev: ProgressEvent<EventTarget>) => any;
        onratechange: (this: GlobalEventHandlers, ev: Event) => any;
        onreset: (this: GlobalEventHandlers, ev: Event) => any;
        onresize: (this: GlobalEventHandlers, ev: UIEvent) => any;
        onscroll: (this: GlobalEventHandlers, ev: Event) => any;
        onseeked: (this: GlobalEventHandlers, ev: Event) => any;
        onseeking: (this: GlobalEventHandlers, ev: Event) => any;
        onselect: (this: GlobalEventHandlers, ev: Event) => any;
        onselectionchange: (this: GlobalEventHandlers, ev: Event) => any;
        onselectstart: (this: GlobalEventHandlers, ev: Event) => any;
        onstalled: (this: GlobalEventHandlers, ev: Event) => any;
        onsubmit: (this: GlobalEventHandlers, ev: SubmitEvent) => any;
        onsuspend: (this: GlobalEventHandlers, ev: Event) => any;
        ontimeupdate: (this: GlobalEventHandlers, ev: Event) => any;
        ontoggle: (this: GlobalEventHandlers, ev: Event) => any;
        ontouchcancel?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchend?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchmove?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchstart?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontransitioncancel: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionend: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionrun: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionstart: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        onvolumechange: (this: GlobalEventHandlers, ev: Event) => any;
        onwaiting: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationend: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationiteration: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationstart: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkittransitionend: (this: GlobalEventHandlers, ev: Event) => any;
        onwheel: (this: GlobalEventHandlers, ev: WheelEvent) => any;
        autofocus: boolean;
        readonly dataset: DOMStringMap;
        nonce?: string;
        tabIndex: number;
        blur(): void;
        focus(options?: FocusOptions): void;
    };
    /**
       * @private
       * Adding EventListeners to listItem
       * @param {ListItem} listItem
       */
    private addEventListeners;
}
/**
 * BasicModel for Activerecord ORM
 */
declare class BaseModel {
    /**
       * Is the model already persisted?
       * @param {BaseModel} model
       * @return {boolean}
       */
    static isPersisted(model: BaseModel): boolean;
    /**
       * Getting the Endpoint Adress
       * @return {string}
       */
    static get endpoint(): string;
    /**
       * Is Model already saved
       * @return {boolean}
       */
    get persisted(): boolean;
}
export {};
