import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-deadline-submenu',
  templateUrl: './deadline-submenu.component.html',
  styles: ``
})
export class DeadlineSubmenuComponent {
  hovered:boolean = false;

  @Output()
  onChangeDeadline = new EventEmitter<Date | null>()

  changeDeadline(newDeadline:Date){
    this.onChangeDeadline.emit(newDeadline)
    console.log("new deadline: low af", newDeadline)
  }

  clearDeadline(){
    this.onChangeDeadline.emit(null)
  }

  get tomorrow(){
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  }

  get nextWeek(){
    let nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    return nextWeek;
  }

  get thisFriday(){
    // end of the week is friday
    let endOfWeek = new Date();
    endOfWeek.setDate(endOfWeek.getDate() + (5 - endOfWeek.getDay() + 7) % 7);
    return endOfWeek;
  }

}
