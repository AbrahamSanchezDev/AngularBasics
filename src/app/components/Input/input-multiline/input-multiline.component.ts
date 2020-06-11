import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'app-input-multiline',
  templateUrl: './input-multiline.component.html',
  styleUrls: ['./input-multiline.component.css'],
})
export class InputMultilineComponent implements AfterViewInit {
  @Input() title: string = '';
  @Input() cssClass: string = 'expInputArea';
  @Input() content: string;
  @Input() height: string = '150px';

  @ViewChild('theText') theText: ElementRef<HTMLTextAreaElement>;
  constructor() {}
  ngAfterViewInit(): void {
    if (this.theText == null) {
      console.log('No Text view child');
    }
  }

  ngOnInit(): void {}
}
