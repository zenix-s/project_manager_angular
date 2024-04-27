import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTaskSubmenuComponent } from './delete-task-submenu.component';

describe('DeleteTaskSubmenuComponent', () => {
  let component: DeleteTaskSubmenuComponent;
  let fixture: ComponentFixture<DeleteTaskSubmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteTaskSubmenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteTaskSubmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
