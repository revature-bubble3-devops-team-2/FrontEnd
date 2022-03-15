import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'youtube-video',
  templateUrl: './youtube-video.component.html',
  styleUrls: ['./youtube-video.component.css']
})
export class YoutubeVideoComponent implements OnInit {

  @Input() videoID: string = 'https://www.youtube.com/embed/fyIm_yQRPgg';

  baseURL: string = 'https://www.youtube.com/embed/'

  safeId: SafeResourceUrl = ''; 
  

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    
    var newURL = this.baseURL.concat(this.videoID);
    console.log(newURL);
    this.safeId= this.sanitizer.bypassSecurityTrustResourceUrl(newURL);

    
  }

}
