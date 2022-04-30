import {BaseRepository, IRepository} from '@vetprovieh/vetprovieh-shared/lib';


/**
 * Helper Class for data operations like
 * - filter
 * - load
 * - search
 */
export class DataHelper {
  // Repository for Operations
  private _repository: IRepository<any>;

  /**
     * Executing search on repository
     * @param {any} params
     * @param {string|undefined} value
     * @return {Promise}
     **/
  public search(
      params: any,
      value: string | undefined = undefined
  ): Promise<any> {
    if (this.repository) {
      let searchPromise: Promise<any>;
      if (Object.keys(params).length > 0) {
        searchPromise = this.remoteSearch(params, value);
      } else {
        searchPromise = this.repository.where(value);
      }

      return searchPromise;
    } else {
      throw new Error('No Repository is set');
    }
  }


  /**
     * Executing remote search on repository
     * @param {any} params
     * @param {string|undefined} value
     * @return {Promise}
     **/
  private remoteSearch(
      params: { [Identifier: string]: string },
      value: string | undefined = undefined
  ): Promise<any> {
    return this.repository
        .whereByParams(params)
        .then((data) => BaseRepository
            .search(
                data,
                value));
  }


  /**
       * Filter Data by Page
       * @param {Array} data
       * @param {number} currentPage
       * @param {number} pageSize
       * @return {Array}
       */
  filterByPage(data: Array<any>,
      currentPage: number,
      pageSize: number) {
    return data.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize,
    );
  }


  /**
     * Get Repository
     * @return {IRepository<any>}
     */
  public get repository(): IRepository<any> {
    return this._repository;
  }


  /**
     * Set Repository
     * @param {IRepository<any>} v
     */
  public set repository(v: IRepository<any>) {
    if (v !== this._repository) {
      this._repository = v;
    }
  }
}