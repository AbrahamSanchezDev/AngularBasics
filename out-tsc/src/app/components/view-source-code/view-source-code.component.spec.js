import { async, TestBed } from '@angular/core/testing';
import { ViewSourceCodeComponent } from './view-source-code.component';
describe('ViewSourceCodeComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ViewSourceCodeComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(ViewSourceCodeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=view-source-code.component.spec.js.map