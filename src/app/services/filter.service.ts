import { Injectable } from '@angular/core';
import { text } from '@fortawesome/fontawesome-svg-core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }
  /**
   * Read in text and filter out the profane words defined in
   * lib/seeds/profanity.json
   * @param text
   */
  filterProfanity(text:String)
  {
    var filter = require("leo-profanity");
    console.log(filter.clean(text))
    return filter.clean(text);
  }
}
