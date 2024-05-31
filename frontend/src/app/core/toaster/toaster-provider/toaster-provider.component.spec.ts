import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToasterProviderComponent } from './toaster-provider.component';

describe('ToasterProviderComponent', () => {
  let component: ToasterProviderComponent;
  let fixture: ComponentFixture<ToasterProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToasterProviderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToasterProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
