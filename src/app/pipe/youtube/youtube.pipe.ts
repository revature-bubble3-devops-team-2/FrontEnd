import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
@Pipe({
  name: 'youtube'
})

@Injectable()
export class YoutubePipe implements PipeTransform {
  constructor(private _dom :DomSanitizer) {
  }
  transform(value:any, ...args:unknown[]) {
    return this._dom.bypassSecurityTrustResourceUrl(value);
  }

}
