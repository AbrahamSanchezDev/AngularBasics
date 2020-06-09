import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { url } from 'inspector';

@Component({
  selector: 'app-video-display',
  templateUrl: './video-display.component.html',
  styleUrls: ['./video-display.component.css'],
})
export class VideoDisplayComponent implements OnInit {
  @Input() link: string;
  saveSrc: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    //Set to trusted
    this.sanitize();
  }

  ngOnInit(): void {}
  //Returns the SafeResourceUrl
  getUrl(): SafeResourceUrl {
    if (this.saveSrc != null) {
      return this.saveSrc;
    }
    if (this.link == null) {
      return;
    }
    this.sanitize();
    return this.saveSrc;
  }
  //make the link save using the sanitizer
  sanitize() {
    this.saveSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.turnYoutubeLinkToEmbeded(this.link)
    );
  }
  //Set the saveSrc value using the link
  turnYoutubeLinkToEmbeded(url: string): string {
    let video, results;
    if (url == null) {
      return url;
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video = results === null ? url : results[1];
    let embed = `https://www.youtube.com/embed/${video}`;
    return embed;
  }
}
