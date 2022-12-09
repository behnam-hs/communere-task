import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-paginator',
  templateUrl: './list-paginator.component.html',
  styleUrls: ['./list-paginator.component.css']
})
export class ListPaginatorComponent {

  @Input() currentPage = 1;
  @Input() totalPages?:number;
  @Output() nextPage = new EventEmitter<number>;
  @Output() prevPage = new EventEmitter<number>;

  next() {
    this.nextPage.emit();
  }

  prev() {
    this.prevPage.emit();
  }

}
