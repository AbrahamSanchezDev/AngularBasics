import { __decorate } from "tslib";
import { Component, ViewChild, } from '@angular/core';
let NavControlComponent = class NavControlComponent {
    constructor() {
        this.title = 'How to Angular!';
        this.delay = 0.4;
        this.show = false;
    }
    //Called after the view was init and it has the view child refs
    ngAfterViewInit() {
        this.childs = this.nav.nativeElement.querySelectorAll('.links li');
    }
    ngOnInit() { }
    onChanged() {
        var minWidth = window.innerWidth < 768;
        //Check if is in mobile mode if so then set it to true so the toggle changes is set to false
        if (minWidth == false) {
            this.show = true;
        }
        this.changeClasses();
        //Check if the with is less than the max width if so then add animation to the text
        this.reanimate(minWidth);
    }
    //Called when you want to change
    onBurger() {
        this.changeClasses();
        this.reanimate();
    }
    //Change the classes for the effects
    changeClasses() {
        this.show = !this.show;
        if (this.show && window.innerWidth < 768) {
            this.linksClass = 'links-active';
            this.burgerOthers = 'toggle';
        }
        else {
            this.linksClass = '';
            this.burgerOthers = '';
        }
    }
    //Adds or removes the animation of the links texts
    reanimate(show = true) {
        this.childs.forEach((link, index) => {
            if (link.style.animation || !show) {
                link.style.animation = '';
            }
            else {
                link.style.animation = `linksFade 0.5s ease forwards ${index / 7 + this.delay}s`;
            }
        });
    }
};
__decorate([
    ViewChild('nav')
], NavControlComponent.prototype, "nav", void 0);
NavControlComponent = __decorate([
    Component({
        selector: 'app-nav-control',
        templateUrl: './nav-control.component.html',
        styleUrls: ['./nav-control.component.css'],
    })
], NavControlComponent);
export { NavControlComponent };
//# sourceMappingURL=nav-control.component.js.map