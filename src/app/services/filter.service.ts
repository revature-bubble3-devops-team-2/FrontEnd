import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  /**
   * Read in text and filter out the profane words defined in
   * lib/seeds/profanity.json
   * @param text
   */
  filterProfanity(text:string)
  {
    var filter = require("leo-profanity");
    return filter.clean(text);
  }
}
