import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

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

  value;

  passRegEx = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])/;

  emailRegEx = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  passwordControl = new FormControl('', Validators.compose(
    [Validators.required, Validators.minLength(8), Validators.pattern(this.passRegEx)]
  ));

  emailControl = new FormControl('', Validators.compose(
    [Validators.required, Validators.pattern(this.emailRegEx)]
  ));

  constructor() {
  }

  ngOnInit() {
  }

  emitValue() {
    if (this.type === 'password') {
      if (this.passwordControl.valid) {
        return this.valueEmitter.emit(this.value);
      }
      return this.valueEmitter.emit(null);
    } else if (this.type === 'email') {
      if (this.emailControl.valid) {
        return this.valueEmitter.emit(this.value);
      }
      return this.valueEmitter.emit(null);
    }
  }

  getController() {
    if (this.type === 'password') {
      return this.passwordControl;
    } else if (this.type === 'email') {
      return this.emailControl;
    }
  }

  toggle() {
    this.edit = !this.edit;
  }

  reset() {
  }
}
