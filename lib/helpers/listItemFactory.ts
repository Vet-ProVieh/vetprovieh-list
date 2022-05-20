import {BaseModel} from '@vetprovieh/vetprovieh-shared';
import {ListItem} from '../list-item';

const LIST_PLACEHOLDER = '<p> Keine Daten zur Anzeige gefunden. </p>';
/**
 * ListItemFactory
 */
export class ListItemFactory {
  private _listItemDiv: HTMLElement;
  private _template: DocumentFragment;
  private _callbackSelected: (event: CustomEvent) => void;

  /**
   * Default-Contructor
   * @param {HTMLElement} listItemDiv
   * @param {DocumentFragment} template
   * @param {Function} callbackSelected
   */
  constructor(
      listItemDiv: HTMLElement,
      template: DocumentFragment,
      callbackSelected: (event: CustomEvent) => void) {
    this._listItemDiv = listItemDiv;
    this._template = template;
    this._callbackSelected = callbackSelected;
  }

  /**
   * Setter listItemDiv
   * @param {HTMLElement} v
   */
  set listItemDiv(v: HTMLElement) {
    if (this._listItemDiv !== v) {
      this._listItemDiv = v;
    }
  }


  /**
     * Appending new Data and clear parent div
     * @param {BaseModel[]} elements
     * @param {string|undefined} searchValue
     * @param {boolean} clear
     */
  public appendAll(
      elements: BaseModel[],
      searchValue: string | undefined,
      clear: boolean) {
    this.clearItemDiv(clear);
    elements.forEach((element: BaseModel) => {
      this.appendAndMarkSearch(
          element,
          searchValue);
    });

    this.insertPlaceholderIfEmpty();
  }


  /**
     * Clearing the Item Div
     * @param {boolean} clear
     */
  private clearItemDiv(clear: boolean) {
    if (clear && this._listItemDiv) {
      this._listItemDiv.innerHTML = '';
    }
  }

  /**
     * Insert a placeholder if elements are empty
     */
  private insertPlaceholderIfEmpty() {
    if (this._listItemDiv?.innerHTML === '') {
      this._listItemDiv.innerHTML = LIST_PLACEHOLDER;
    }
  }

  /**
   * Append an element and mark search value
   * @param {BaseModel} element
   * @param {string|undefined} searchValue
   */
  public appendAndMarkSearch(
      element: BaseModel,
      searchValue: string | undefined
  ) {
    const newItem = this.append(element);
    newItem.mark(searchValue);
  }

  /**
     * Append a new ListItem to parent list
     * and return the item
     * @param {BaseModel} dataElement
     * @return {ListItem}
     */
  public append(dataElement: BaseModel): ListItem {
    const newListItem: ListItem = new ListItem(
        this._template,
        dataElement);

    this.addEventListeners(newListItem);

    this._listItemDiv
        .appendChild(newListItem);

    return newListItem;
  }

  /**
     * @private
     * Adding EventListeners to listItem
     * @param {ListItem} listItem
     */
  private addEventListeners(listItem: ListItem) {
    listItem.addEventListener(
        'selected',
        (event) => this._callbackSelected(event as CustomEvent));
  }
}
