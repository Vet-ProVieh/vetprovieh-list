import {VetproviehBasicList} from '..';
import {ListItem} from '../list-item';

const LIST_PLACEHOLDER = '<p> Keine Daten zur Anzeige gefunden. </p>';
/**
 * ListItemFactory
 */
export class ListItemFactory {
  private _parentList: VetproviehBasicList;

  /**
   * Default-Contructor
   * @param {VetproviehBasicList} parentList
   */
  constructor(
      parentList: VetproviehBasicList) {
    this._parentList = parentList;
  }


  /**
     * Appending new Data and clear parent div
     * @param {any[]} elements
     * @param {string|undefined} searchValue
     * @param {boolean} clear
     */
  public appendAll(
      elements: any[],
      searchValue: string | undefined,
      clear: boolean) {
    if (this._parentList.shadowRoot) {
      this.clearItemDiv(clear);
      elements.forEach((element: any) => {
        this.appendAndMarkSearch(
            element,
            searchValue);
      });

      this.insertPlaceholderIfEmpty();
    }
  }


  /**
     * Clearing the Item Div
     * @param {boolean} clear
     */
  private clearItemDiv(clear: boolean) {
    const listElements = this._parentList
        .listElementDiv;
    if (clear && listElements) {
      listElements.innerHTML = '';
    }
  }

  /**
     * Insert a placeholder if elements are empty
     */
  private insertPlaceholderIfEmpty() {
    const listElements = this._parentList.listElementDiv;
    if (listElements?.innerHTML === '') {
      listElements.innerHTML = LIST_PLACEHOLDER;
    }
  }

  /**
   * Append an element and mark search value
   * @param {any} element
   * @param {string|undefined} searchValue
   */
  public appendAndMarkSearch(
      element: any,
      searchValue: string | undefined
  ) {
    const newItem = this.append(element);
    newItem.mark(searchValue);
  }

  /**
     * Append a new ListItem to parent list
     * and return the item
     * @param {any} dataElement
     * @return {ListItem}
     */
  public append(dataElement: any): ListItem {
    const newListItem: ListItem = new ListItem(
        this._parentList,
        dataElement);

    this.addEventListeners(newListItem);

    this._parentList
        .listElementDiv
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
        (event) => {
          this._parentList.elementSelected(
                    event as CustomEvent
          );
        });
  }
}
