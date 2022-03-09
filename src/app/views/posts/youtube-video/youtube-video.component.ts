import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'youtube-video',
  templateUrl: './youtube-video.component.html',
  styleUrls: ['./youtube-video.component.css']
})
export class YoutubeVideoComponent implements OnInit {

  public videoID: string = 'https://www.youtube.com/embed/fyIm_yQRPgg';
  safeId: SafeResourceUrl = ''; 
  

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.safeId= this.sanitizer.bypassSecurityTrustResourceUrl(this.videoID);
  }

}
