import {
  VetproviehElement,
  WebComponent} from '@vetprovieh/vetprovieh-shared';
import {VetproviehBasicList} from './vetprovieh-basic-list';

export {VetproviehPager} from '@vetprovieh/vetprovieh-pager/lib';
/**
 * List Element for Vet:Provieh
 * Reads Data from Webservice an shows it.
 * @property {boolean} searchable
 * @property {boolean} pageable
 * @property {string} src
 */
// eslint-disable-next-line new-cap
@WebComponent({
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
  tag: 'vetprovieh-list',
})
/**
 * WebComponent - VetproViehList
 */
export class VetproviehList extends VetproviehBasicList {

}
