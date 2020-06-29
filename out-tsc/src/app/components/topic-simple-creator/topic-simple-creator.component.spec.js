import { async, TestBed } from '@angular/core/testing';
import { TopicSimpleCreatorComponent } from './topic-simple-creator.component';
describe('TopicSimpleCreatorComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TopicSimpleCreatorComponent],
        }).compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(TopicSimpleCreatorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    // it('should create', () => {
    //   expect(component).toBeTruthy();
    // });
});
//# sourceMappingURL=topic-simple-creator.component.spec.js.map