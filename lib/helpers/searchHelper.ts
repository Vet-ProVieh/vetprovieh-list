import { VetproviehBasicList } from "..";

var LISTENING_TO_EVENT = "keyup";

/**
 * Helper for Search functionality in Vetprovieh-List
 */
export class SearchHelper {
  private searchTimer: any;
  private searchValue: string | undefined;
  private list: VetproviehBasicList;
  private searchField: HTMLElement;

  /**
   * Default-Constructor
   * @param {VetproviehBasicList} list 
   */
  constructor(list: VetproviehBasicList) {
    this.list = list;
    this.searchField = this.list.searchField;
  }

  /**
   * Update current searchValue and dispatch event
   * @param {string} searchValue
   */
  private set currentSearch(searchValue: string) {
    if (this.searchValue != searchValue) {
      clearTimeout(this.searchTimer);
      this.searchValue = searchValue;
      this.searchTimer = setTimeout(() => {
        this.list.search(searchValue);
      }, 300);
    }
  }

  /**
   * Updates visibility of search controls 
   */
  public toggleSearchControls(){
    this.list.updateVisibility(
      'searchControl',
      this.list.searchable
    );
  }

  /**
   * Activiating Event-Listener for serachField
   */
  public activateListener() {
    if (this.searchField) {
      this.searchField.addEventListener(
        LISTENING_TO_EVENT,
        (event) => {
          const target = event.target as HTMLInputElement;
          this.currentSearch = target.value;
        });
    }
  }
}