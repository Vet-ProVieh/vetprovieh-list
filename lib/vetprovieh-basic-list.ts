import {VetproviehPager} from '@vetprovieh/vetprovieh-pager/lib';
import {
  IRepository, VetproviehElement,
} from '@vetprovieh/vetprovieh-shared/lib/index';
import {DataHelper} from './helpers/dataHelper';
import {ListItemFactory} from './helpers/listItemFactory';
import { SearchHelper } from './helpers/searchHelper';

/**
 * List Element for Vet:Provieh
 * Reads Data from Webservice an shows it.
 * @property {boolean} pageable
 * @property {string} src
 */
export class VetproviehBasicList extends VetproviehElement {
  /**
     * Getting observed Attributes
     * @return {string[]}
     */
  static get observedAttributes() {
    return ['pagesize', 'searchable', 'pageable'];
  }

  private _pagesize = 0;
  private _searchable = true;
  private _pageable = true;
  private _page = 1;
  private _maxPage = 1;
  protected _listTemplate: DocumentFragment | undefined;

  private _objects: any[] = [];
  private _repository: IRepository<any> | undefined;

  private _dataHelper: DataHelper = new DataHelper();
  private _itemFactory = new ListItemFactory(this);

  private _urlSearchParams: { [Identifier: string]: string } = {};

  /**
   * Get Repository
   * @return {IRepository<any>}
   */
  public get repository(): IRepository<any> {
    return this._dataHelper.repository;
  }

  /**
   * Set Repository
   * @param {IRepository<any>} val
   */
  public set repository(val: IRepository<any>) {
    this._dataHelper.repository = val;
    this._filterObjects();
  }

  /**
   * Getting Objects from List
   * @return {Array<any>}
   */
  public get objects() {
    return this._objects;
  }

  /**
   * Set Search-Params
   * @param {any} params
   */
  public set urlSearchParams(params: { [Identifier: string]: string }) {
    if (params !== this._urlSearchParams) {
      this._urlSearchParams = params;
    }
  }

  /**
     * Default Constructor
     * accepts a template as parameter
     * @param {HTMLTemplateElement} pListTemplate
     */
  constructor(pListTemplate: HTMLTemplateElement | undefined = undefined) {
    super();

    const listTemplate = pListTemplate || this.querySelector('template');
    if (listTemplate) {
      this.setlistTemplate(listTemplate);
    }
  }

  /**
   * Setting internal List Template
   * @param {HTMLTemplateElement} template
   */
  public setlistTemplate(template: HTMLTemplateElement) {
    if (template && this._listTemplate !== template.content) {
      this._listTemplate = template.content;
    }
  }

  /**
     * Getter searchable
     * @return {boolean} searchable
     */
  get searchable(): boolean {
    return this._searchable;
  }

  /**
     * Setter Searchable
     * @param {boolean} val
     */
  set searchable(val: boolean) {
    if (val !== this.searchable) {
      this._searchable = val === true || (val as any) === 'true';
      super.updateVisibility('searchControl', this.searchable);
    }
  }


  /**
   * Get ListTemplate
   * @return {HTMLTemplateElement}
   */
  get listTemplate() {
    return this._listTemplate;
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
      this._pageable = val === true || (val as any) === 'true';
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
  attachData(data: any, searchValue: any, clear = false) {
    this._itemFactory.appendAll(
        data,
        searchValue,
        clear
    );

    this._objects = data;
    this.dispatchEvent(new Event('loaded'));
  }


  /**
     * Search for a string
     * @param {string} searchString
     */
  search(searchString: string) {
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
        this.page = (event.target as VetproviehPager).page;
        this._filterObjects();
      });
    }
  }

  /**
     * Input in search has Changed
     * @private
     */
  private _addSearchFieldListener() {
    if (this.shadowRoot) {
      const searchHelper = new SearchHelper(this);
      searchHelper.activateListener();
      searchHelper.toggleSearchControls();
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
  get _pager(): VetproviehPager {
    return this.shadowRoot?.getElementById('pager') as VetproviehPager;
  }

  /**
     * Can component fetch new data?
     * @private
     */
  get _readyToFetch() {
    return this.pagesize && this.repository && this.shadowRoot;
  }

  /***
   * Getting SearchFIeld
   * @return {HTMLElement}
   */
  public get searchField() : HTMLElement{
    return this.shadowRoot?.querySelector('#search') as HTMLElement;
  }

  /**
     * Loading Data from Remote-Server
     * @param {string | undefined} searchValue
     * @private
     */
  _filterObjects(searchValue: string | undefined = undefined) {
    if (this._readyToFetch) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;

      const searchPromise = this._dataHelper.search(
          this._urlSearchParams,
          searchValue);


      searchPromise
          .then((data) => this._sort(data))
          .then((data) => {
            self._setMaxPage(data.length); return data;
          })
          .then((data) => this._dataHelper
              .filterByPage(data, this.page, this.maxPage))
          .then((data) => self.attachData(
              data,
              searchValue,
              true));
    }
  }

  /**
     * Sorting Data. can be overwritten
     * @param {any} data
     * @return {any}
     */
  protected _sort(data: any) {
    return data;
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
   * Get Div for List element
   * @return {HTMLElement}
   */
  public get listElementDiv(): HTMLElement {
    return this.shadowRoot
        .getElementById('listElements');
  }

  /**
   * Dispatch Element-Selected Event
   * @param {CustomEvent} event
   */
  public elementSelected(event: CustomEvent) {
    this.dispatchEvent(new CustomEvent('selected', {detail: event.detail}));
  }
}
