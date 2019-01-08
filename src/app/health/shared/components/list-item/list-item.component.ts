import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemComponent implements OnInit {

  @Input() item: any;

  @Output() remove = new EventEmitter<any>();

  toggled = false;

  constructor() { }

  ngOnInit() {
  }

  getRoute(item: any) {
    return [`../meals`, item.key];
  }

  removeItem() {
    this.remove.emit(this.item);
  }

  toggle() {
    this.toggled = !this.toggled;
  }

}
