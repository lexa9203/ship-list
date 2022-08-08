import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  arrPort:number[] = [];
  nameType = new FormControl("");
  nameShipSearch = new FormControl("");
  shipName: string = '';
  homePorts: string = '';
  portValue = [
    { id: 1, selected: false, port: 'Port Canaveral' },
    { id: 2, selected: false, port: 'Port of Los Angeles' },
    { id: 3, selected: false, port: 'Fort Lauderdale' }
  ];

  @Output() selectType: EventEmitter<string> = new EventEmitter<string>();
  @Output() searchName: EventEmitter<string> = new EventEmitter<string>();
  @Output() changePort: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    const res = JSON.parse(localStorage.getItem('filters')!);
    if(res) {
      this.nameType.setValue(res.type);
      this.nameShipSearch.setValue(res.name);
      this.homePorts = res.home_port;
      this.selectType.emit(this.nameType.value);
      this.searchName.emit(this.nameShipSearch.value);
      this.changePort.emit(this.homePorts);
    }
  
    this.homePorts
      .split('|')
      .forEach((el) => {
        this.portValue  
          .filter((elem)=> elem.port == el)
          .map(el => {
            this.arrPort.push(el.id);
            return el.selected = true;
          })
      })
  }

  select(event: any) {
    if(this.nameType.value === event.target.value) {
      this.nameType.setValue('');
      const filters = JSON.parse(localStorage.getItem('filters')!);
      filters.type = '';
      localStorage.setItem('filters', JSON.stringify(filters)) ;
    } else {
      this.nameType.setValue(event.target.value);
    }
    this.selectType.emit(this.nameType.value);
  }

  search(event: any) {
    if(typeof event === "string") {
      this.searchName.emit(event);
    } else {
      this.searchName.emit(event.target.value);
    }
  }

  change(event: any) {
    this.arrPort.length = 0;
    const value = event.target.value;
    const isCheked = event.target.checked;
    this.homePorts = this.portValue
      .map((el) => {
        if(el.port === value){
          el.selected = isCheked;
          return el;
        } 
        return el;
      })
      .filter(el => el.selected)
      .map(el => {
        this.arrPort.push(el.id);
        return el.port}).join('|');

    this.changePort.emit(this.homePorts);
  }
}
