import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoDisplayComponent } from './video-display.component';

describe('VideoDisplayComponent', () => {
  let component: VideoDisplayComponent;
  let fixture: ComponentFixture<VideoDisplayComponent>;
  const originalLink: string =
    'https://www.youtube.com/watch?v=yG4FH60fhUE&ab_channel=ProgrammingwithMosh';
  const embeddedLink: string = 'https://www.youtube.com/embed/yG4FH60fhUE';
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VideoDisplayComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.link = originalLink;
  });

  it('should create ', () => {
    expect(component).toBeTruthy();
  });
  it('Generate saveSrc using the path as a link', () => {
    const link = component.turnYoutubeLinkToEmbedded(originalLink);
    //to be check that the value in the ( ) before it should be equal to the ( ) next to it
    expect(link).toBe(embeddedLink);
    let failLink = component.turnYoutubeLinkToEmbedded('noURl.com');
    expect(failLink).toEqual('noURl.com');
  });

  it('Generate saveSrc using the path as a link', () => {
    component.saveSrc = null;
    component.link = null;
    spyOn(component, 'sanitizeLink');
    let obj = component.getUrl();
    expect(obj).not.toBeUndefined();

    component.link = originalLink;
    component.getUrl();
    expect(component.sanitizeLink).toHaveBeenCalled();
  });
  it('Generate saveSrc using the path as a link', () => {
    spyOn(component, 'turnYoutubeLinkToEmbedded');
    let obj = component.getUrl();

    component.link = originalLink;
    obj = component.getUrl();
  });
});
