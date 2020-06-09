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

  embededLink: string;
  saveSrc: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.saveSrc = this.getUrl();
  }
  //Returns the SafeResourceUrl
  getUrl(): SafeResourceUrl {
    if (this.saveSrc != null) {
      return this.saveSrc;
    }
    this.generateSafeUrl();
    return this.saveSrc;
  }
  //Set the saveSrc value using the link
  generateSafeUrl(): void {
    var url = this.link;
    var video, results;
    if (url === null) {
      return;
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video = results === null ? url : results[1];
    this.embededLink = `https://www.youtube.com/embed/${video}`;
    this.saveSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.embededLink
    );
  }
}
