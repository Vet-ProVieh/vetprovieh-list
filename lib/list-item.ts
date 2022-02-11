import {
  WebComponent,
  ViewHelper,
  Indexable} from '@vetprovieh/vetprovieh-shared/lib';


// eslint-disable-next-line new-cap
@WebComponent({
  template: '',
  tag: 'list-item',
})
/**
 * List-Item inside a Vetprovieh:List
 */
export class ListItem extends HTMLElement {
  private _data: any;
  private _list: any;

  /**
   * Default-Constructor
   * @param {any} list
   * @param {any} data
   */
  constructor(list: any, data: any) {
    super();
    this._list = list;
    this._data = data;
    this._generate();
  }

  /**
   * Marking Element, when found
   * @param {string} searchValue
   */
  public mark(searchValue: string) {
    if (searchValue) {
      ViewHelper.markElement(this, searchValue);
    }
  }

  /**
   * Attaching a Event-Listener
   * @private
   * @param {string} event
   */
  private _attachEventListener(event:string) {
    this.addEventListener(event, () => {
      const selectedEvent = new CustomEvent('selected', {
        detail: this._data,
      });
      this.dispatchEvent(selectedEvent);
      // this._list.dispatchEvent(selectedEvent);
    });
  }

  /**
     * Inserts Element to List
     * @param {object} element
     * @param {HTMLElement} newListItem
     * @private
     */
  private _attachDataToStoreLocalLink() {
    const link = this.getElementsByTagName('store-local-link')[0] as Indexable;
    if (link) {
      link.params = this._data;
    }
  }

  /**
   * Generating the ListItem
   */
  private _generate() {
    const newNode = document.importNode(this._list.listTemplate, true);
    this._attachEventListener('click');
    this.appendChild(newNode);
    ViewHelper.replacePlaceholders(this, this._data);
    this._attachDataToStoreLocalLink();
  }
}
