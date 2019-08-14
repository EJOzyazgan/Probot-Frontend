import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {

  @Input() validation;
  @Input() position;
  @Input() show;
  @Input() shouldShow;
  @Input() controller;

  constructor() {
  }

  ngOnInit() {
  }

  getPosition() {
    let style;

    if (this.position === 'right') {
      style = {
        'float': this.position
      };
    }

    return style;
  }

  getShow(type) {
    return this.validation === type && this.show;
  }
}
