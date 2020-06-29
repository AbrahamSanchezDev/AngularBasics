import { async, TestBed } from '@angular/core/testing';
import { VideoDisplayComponent } from './video-display.component';
describe('VideoDisplayComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [VideoDisplayComponent],
        }).compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(VideoDisplayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('Generate saveSrc using the path as a link', () => {
        const originalLink = 'https://www.youtube.com/watch?v=yG4FH60fhUE&ab_channel=ProgrammingwithMosh';
        const embededLink = 'https://www.youtube.com/embed/yG4FH60fhUE';
        const link = component.turnYoutubeLinkToEmbeded(originalLink);
        //to be check that the value in the ( ) before it should be equal to the ( ) next to it
        expect(link).toBe(embededLink);
        //Check that the (component) value is true
        // expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=video-display.component.spec.js.map