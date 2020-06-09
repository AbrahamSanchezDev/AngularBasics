import { Component, OnInit, ViewChild } from '@angular/core';
import { MultiLineToJsonComponent } from '../multi-line-to-json/multi-line-to-json.component';
import { DownloadToolService } from 'src/app/library/download-tool/download-tool.service';
import { ExpObjModule } from 'src/app/model/exp-obj/exp-obj.module';

@Component({
  selector: 'app-experience-obj',
  templateUrl: './experience-obj.component.html',
  styleUrls: ['./experience-obj.component.css'],
})
export class ExperienceObjComponent implements OnInit {
  @ViewChild('multiText') multiLineText: MultiLineToJsonComponent;

  expObj: ExpObjModule = new ExpObjModule();
  constructor(private downloadTool: DownloadToolService) {}

  ngOnInit() {}

  //Create the ExpObj description and save it as json
  createExp(theText: any): void {
    let theTextInArray = this.multiLineText.generateText();
    this.expObj.description = theTextInArray;
    this.downloadTool.DownloadTextToFileAsJson(this.expObj, theText);
  }
}
