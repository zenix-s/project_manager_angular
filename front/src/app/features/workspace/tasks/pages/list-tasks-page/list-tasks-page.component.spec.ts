import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTasksPageComponent } from './list-tasks-page.component';

describe('ListTasksPageComponent', () => {
  let component: ListTasksPageComponent;
  let fixture: ComponentFixture<ListTasksPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListTasksPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListTasksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
