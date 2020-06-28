import {
  async,
  ComponentFixture,
  TestBed,
  inject,
} from '@angular/core/testing';
import { TextConfirmComponent } from './text-confirm.component';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { InputData } from 'src/app/model/inputs/input-data';
import { InUseMaterialModule } from 'src/app/material-module';
import { OverlayContainer } from '@angular/cdk/overlay';

describe('TextConfirmComponent', () => {
  let component: TextConfirmComponent;
  let fixture: ComponentFixture<TextConfirmComponent>;
  let dialog: MatDialog;
  let overlayContainer: OverlayContainer;
  const mockDialogRef = {
    close: jasmine.createSpy('close'),
  };
  const linkData: InputData = {
    title: 'Add Link',
    content: [
      {
        text: 'Link:',
        value: '',
      },
      {
        text: 'Display Text:',
      },
    ],
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TextConfirmComponent],
      imports: [InUseMaterialModule, NoopAnimationsModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: mockDialogRef,
        },
        { provide: MAT_DIALOG_DATA, useValue: linkData },
        MatDialog,
      ],
    }).compileComponents();
  }));
  beforeEach(inject(
    [MatDialog, OverlayContainer],
    (d: MatDialog, oc: OverlayContainer) => {
      dialog = d;
      overlayContainer = oc;
    }
  ));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should close and send data', () => {
    component.onNoClick();
    expect(mockDialogRef.close).toHaveBeenCalled();
    component.onEnter();
    expect(mockDialogRef.close).toHaveBeenCalledTimes(2);
  });
  it('should open a dialog with a component', () => {
    const dialogRef = dialog.open(TextConfirmComponent, {
      data: { param: '1' },
    });
    // verify
    expect(dialogRef.componentInstance instanceof TextConfirmComponent).toBe(
      true
    );
  });
});
