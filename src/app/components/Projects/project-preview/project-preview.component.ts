import { Component, OnInit } from '@angular/core';
import { ProjectDataModule } from 'src/app/model/project-data/project-data.module';

@Component({
  selector: 'app-project-preview',
  templateUrl: './project-preview.component.html',
  styleUrls: ['./project-preview.component.css'],
})
export class ProjectPreviewComponent implements OnInit {
  project: ProjectDataModule;
  webLink: string = 'https://i.imgur.com/BCRnjrH.png';

  constructor() {
    // this.project = new ProjectDataModule();
    // this.project.name = 'Resume';
    // this.project.description = `My Presonal resume showing my experience
    // and some other skills`;
    // this.project.link = 'https://holykiller.github.io/Resume/';
    // this.project.img = this.webLink;
  }

  ngOnInit(): void {}
  //Open the project Link
  openLink(): void {
    window.open(this.project.link, '_blank');
  }
  //Check if the project data is valid
  valid(): boolean {
    return this.project != null;
  }
}
