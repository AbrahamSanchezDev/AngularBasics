import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { url } from 'inspector';

@Component({
  selector: 'app-video-display',
  templateUrl: './video-display.component.html',
  styleUrls: ['./video-display.component.css'],
})
export class VideoDisplayComponent implements OnInit {
  @Input() path: string;

  saveSrc: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer) {
    this.saveSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.path);
  }

  ngOnInit(): void {}

  getUrl(): SafeResourceUrl {
    var url = this.path;
    var video, results;
    if (url === null) {
      return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video = results === null ? url : results[1];

    this.saveSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' + video
    );
    return this.saveSrc;
  }
}
