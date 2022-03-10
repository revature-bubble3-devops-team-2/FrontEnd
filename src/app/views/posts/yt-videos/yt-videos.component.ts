import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'yt-videos',
  templateUrl: './yt-videos.component.html',
  styleUrls: ['./yt-videos.component.css']
})
export class YtVideosComponent implements OnInit {

  public videos: string[] = [];
  @Input() textBody = '';
  
  

  constructor() { }

  ngOnInit(): void {
    if(this.textBody.includes('https://')){
      //this.videos.push(this.textBody);
      this.videos = this.parseYouTubeLinks(this.textBody);
    }
    
  }

   parseYouTubeLinks(text: string): string[]
{
    let urls: string[] = text.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi) || [];
    for(let i: number = 0; i < urls.length; i++)
    {
        urls[i] = this.parseYouTubeLinkIds(urls[i]);
    }
    let filtered: string[] = urls.filter(Boolean);
    return filtered;
}
 parseYouTubeLinkIds(url: string): string
{
    let id = url.match(/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
    if(id && id[2].length == 11)
    {
        return id[2];
    }
    return "";
}



}
