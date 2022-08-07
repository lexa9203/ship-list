import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input()page!: number;
  @Input()maxPage!: number;
  @Output() nextPage: EventEmitter<number> = new EventEmitter<number>();
  @Output() prevPage: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  next() {
    this.nextPage.emit(++this.page);
  }
  
  prev(){
    this.nextPage.emit(--this.page);
  }

}
