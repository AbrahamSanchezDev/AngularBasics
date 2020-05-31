import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'app-nav-control',
  templateUrl: './nav-control.component.html',
  styleUrls: ['./nav-control.component.css'],
})
export class NavControlComponent implements AfterViewInit {
  @ViewChild('nav') nav: ElementRef;

  childs: any;
  title: string = 'How to Angular!';
  linksClass: string;
  burgerOthers: string;
  delay: number = 0.4;
  show: boolean = false;

  constructor() {}
  //Called after the view was init and it has the view child refs
  ngAfterViewInit(): void {
    this.childs = this.nav.nativeElement.querySelectorAll('.links li');
  }
  ngOnInit() {}
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
  onBurger(): void {
    this.changeClasses();
    this.reanimate();
  }
  //Change the classes for the effects
  changeClasses() {
    this.show = !this.show;
    if (this.show && window.innerWidth < 768) {
      this.linksClass = 'links-active';
      this.burgerOthers = 'toggle';
    } else {
      this.linksClass = '';
      this.burgerOthers = '';
    }
  }
  //Adds or removes the animation of the links texts
  reanimate(show: boolean = true): void {
    this.childs.forEach((link, index) => {
      if (link.style.animation || !show) {
        link.style.animation = '';
      } else {
        link.style.animation = `linksFade 0.5s ease forwards ${
          index / 7 + this.delay
        }s`;
      }
    });
  }
}
