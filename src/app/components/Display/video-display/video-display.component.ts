import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
    this.sanitizeLink();
  }

  ngOnInit(): void {}
  //Returns the SafeResourceUrl
  getUrl(): SafeResourceUrl {
    if (this.link == null) {
      return null;
    }
    if (this.saveSrc != null) {
      return this.saveSrc;
    }
    this.sanitizeLink();
    return this.saveSrc;
  }
  //Makes the link save using the sanitizer
  sanitizeLink(): void {
    this.saveSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.turnYoutubeLinkToEmbedded(this.link)
    );
  }
  //Set the saveSrc value using the link
  turnYoutubeLinkToEmbedded(url: string): string {
    if (url == null) {
      return url;
    }
    const results = url.match('[\\?&]v=([^&#]*)');
    if (results === null) {
      return url;
    }
    return `https://www.youtube.com/embed/${results[1]}`;
  }
}
