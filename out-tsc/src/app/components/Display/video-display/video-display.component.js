import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let VideoDisplayComponent = class VideoDisplayComponent {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        //Set to trusted
        this.sanitize();
    }
    ngOnInit() { }
    //Returns the SafeResourceUrl
    getUrl() {
        if (this.saveSrc != null) {
            return this.saveSrc;
        }
        if (this.link == null) {
            return;
        }
        this.sanitize();
        return this.saveSrc;
    }
    //Makes the link save using the sanitizer
    sanitize() {
        this.saveSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.turnYoutubeLinkToEmbeded(this.link));
    }
    //Set the saveSrc value using the link
    turnYoutubeLinkToEmbeded(url) {
        let video, results;
        if (url == null) {
            return url;
        }
        results = url.match('[\\?&]v=([^&#]*)');
        video = results === null ? url : results[1];
        let embed = `https://www.youtube.com/embed/${video}`;
        return embed;
    }
};
__decorate([
    Input()
], VideoDisplayComponent.prototype, "link", void 0);
VideoDisplayComponent = __decorate([
    Component({
        selector: 'app-video-display',
        templateUrl: './video-display.component.html',
        styleUrls: ['./video-display.component.css'],
    })
], VideoDisplayComponent);
export { VideoDisplayComponent };
//# sourceMappingURL=video-display.component.js.map