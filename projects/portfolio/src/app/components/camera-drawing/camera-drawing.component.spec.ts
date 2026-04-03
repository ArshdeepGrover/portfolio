import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraDrawingComponent } from './camera-drawing.component';

describe('CameraDrawingComponent', () => {
  let component: CameraDrawingComponent;
  let fixture: ComponentFixture<CameraDrawingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CameraDrawingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CameraDrawingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
