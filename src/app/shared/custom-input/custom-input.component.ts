import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss']
})
export class CustomInputComponent implements OnInit {

  @Input() label;
  @Input() type;
  @Input() placeholder;
  @Input() toggleEdit;

  @Input() validation;
  @Input() position;
  @Input() shouldShow;

  @Output() valueEmitter = new EventEmitter<any>();

  edit = false;
  show = false;

  passRegEx = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])/;

  emailRegEx = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  inputForm = new FormGroup({
    passwordControl: new FormControl('', Validators.compose(
      [Validators.required, Validators.minLength(8), Validators.pattern(this.passRegEx)]
    )),

    emailControl: new FormControl('', Validators.compose(
      [Validators.required, Validators.pattern(this.emailRegEx)]
    )),
  });


  constructor() {
  }

  ngOnInit() {
  }

  emitValue() {
    if (this.type === 'password') {
      if (this.inputForm.controls.passwordControl.valid) {
        return this.valueEmitter.emit(this.inputForm.controls.passwordControl.value);
      }
      return this.valueEmitter.emit(null);
    } else if (this.type === 'email') {
      if (this.inputForm.controls.emailControl.valid) {
        return this.valueEmitter.emit(this.inputForm.controls.emailControl.value);
      }
      return this.valueEmitter.emit(null);
    }
  }

  getController() {
    if (this.type === 'password') {
      return 'passwordControl';
    } else if (this.type === 'email') {
      return 'emailControl';
    }
  }

  toggle() {
    this.edit = !this.edit;
  }

  reset() {
  }
}
