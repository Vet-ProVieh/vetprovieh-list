import {
  BaseModel,
  WebComponent,
  ViewHelper,
  Indexable} from '@vetprovieh/vetprovieh-shared';


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

  /**
   * Default-Constructor
   * @param {DocumentFragment} template
   * @param {BaseModel} data
   */
  constructor(
      template: DocumentFragment,
      data: BaseModel) {
    super();
    this._data = data;
    this._generate(template);
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
   * @param {DocumentFragment} template
   */
  private _generate(template: DocumentFragment) {
    const newNode = document.importNode(template, true);
    this._attachEventListener('click');
    this.appendChild(newNode);
    ViewHelper.replacePlaceholders(this, this._data);
    this._attachDataToStoreLocalLink();
  }
}
