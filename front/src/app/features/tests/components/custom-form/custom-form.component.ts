import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrl: './custom-form.component.css'
})
export class CustomFormComponent {
  constructor(private fb: FormBuilder) {

  }

  myForm: FormGroup = this.fb.group({
    customInputControl: [false]
  });

  onSubmit() {
    console.log('onSubmit', this.myForm.value);
  }
}
