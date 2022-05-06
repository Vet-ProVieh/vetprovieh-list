
const LISTENING_TO_EVENT = 'keyup';
const SEARCH_DELAY = 300;

/**
 * Helper for Search functionality in Vetprovieh-List
 */
export class SearchHelper {
  private searchTimer: any;
  private searchValue: string | undefined;
  private searchField: HTMLElement;
  private searchCallback: (searchValue: string) => void;

  /**
   * Default-Constructor
   * @param {HTMLElement} searchField
   * @param {Function} searchCallback
   */
  constructor(searchField: HTMLElement,
      searchCallback: (searchValue: string) => void) {
    this.searchField = searchField;
    this.searchCallback = searchCallback;
  }

  /**
   * Update current searchValue and dispatch event
   * @param {string} searchValue
   */
  private set currentSearch(searchValue: string) {
    if (this.searchValue !== searchValue) {
      clearTimeout(this.searchTimer);
      this.searchValue = searchValue;
      this.searchTimer = setTimeout(() => {
        this.searchCallback(searchValue);
      }, SEARCH_DELAY);
    }
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
