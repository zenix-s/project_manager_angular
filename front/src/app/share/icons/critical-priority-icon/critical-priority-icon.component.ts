import { Component } from '@angular/core';

@Component({
  selector: 'app-critical-priority-icon',
  template: `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
          class="icon icon-tabler icon-tabler-alert-square-filled" viewBox="0 0 24 24" stroke-width="1.5"
          stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path
            d="M19 2a3 3 0 0 1 2.995 2.824l.005 .176v14a3 3 0 0 1 -2.824 2.995l-.176 .005h-14a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-14a3 3 0 0 1 2.824 -2.995l.176 -.005h14zm-6.99 13l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm-.01 -8a1 1 0 0 0 -.993 .883l-.007 .117v4l.007 .117a1 1 0 0 0 1.986 0l.007 -.117v-4l-.007 -.117a1 1 0 0 0 -.993 -.883z"
            stroke-width="0" fill="currentColor" />
        </svg>
  `,
  styles: ``
})
export class CriticalPriorityIconComponent {

}