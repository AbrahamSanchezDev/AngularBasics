import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-view-source-code',
  templateUrl: './view-source-code.component.html',
  styleUrls: ['./view-source-code.component.css'],
})
export class ViewSourceCodeComponent implements OnInit {
  @Input() link: string;
  constructor() {}

  ngOnInit(): void {}
}
