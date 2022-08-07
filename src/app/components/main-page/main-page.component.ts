import { Component, OnInit } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { IShip } from 'src/app/interfaces/interfaces';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  loading = false;
  ships: IShip[] = [];
  shipQuery!: QueryRef<any>;
  type = '';
  maxPage = 0;
  page = 0;
  pageSize = 5;
  variables = {limit: this.pageSize, offset: 0, name: '', type: '', home_port: '', page: this.page};

  constructor(private readonly appService: AppService) { }

  ngOnInit(): void {
    this.shipQuery = this.appService.getData(this.pageSize, '', '', this.type);
    this.shipQuery.valueChanges.subscribe(res => {
      this.ships = res.data.shipsResult.data;
      this.maxPage = Math.ceil(res.data.shipsResult.result.totalCount / this.pageSize);
    })
  }

  onChangePort(event: string){
    this.variables.home_port = event;
    this.variables.offset = 0;
    this.page = 0;
    this.shipQuery.fetchMore({
      variables: this.variables
    }).then(res => {
      this.ships = res.data.shipsResult.data; 
      this.maxPage = Math.ceil(res.data.shipsResult.result.totalCount / this.pageSize);
    }).catch(err => console.log(err))
  }

  select(event:string){
    this.variables.type = event;
    this.variables.offset = 0;
    this.page = 0;
    this.shipQuery.fetchMore({
      variables: this.variables
    }).then(res => {
      this.ships = res.data.shipsResult.data; 
      this.maxPage = Math.ceil(res.data.shipsResult.result.totalCount / this.pageSize);
    }).catch(err => console.log(err))
  }

  next(event: number) {
    this.loading = true;
    this.page = event;
    this.variables.offset = this.pageSize * this.page;
    this.shipQuery.fetchMore({
      variables: this.variables
    }).then(res => {
      this.ships = res.data.shipsResult.data;
    }).catch(err => {console.log(err)
    }).finally(() => {this.loading = false})
  }

  prev(event: number) {
    this.loading = true;
    this.page = event;
    this.variables.offset = this.pageSize * this.page;
    this.shipQuery.fetchMore({
      variables: this.variables
    }).then(res => {
      this.ships = res.data.shipsResult.data;
    }).catch(err => {console.log(err)
    }).finally(() => {this.loading = false}) 
  }

  search(str: string) {
    this.variables.name = str;
    this.page = 0;
    this.variables.offset = 0;
    this.shipQuery.fetchMore({
      variables: this.variables
    }).then(res => {
      this.ships = res.data.shipsResult.data; 
      this.maxPage = Math.ceil(res.data.shipsResult.result.totalCount / this.pageSize);
    }).catch(err => console.log(err))
  }

  ngOnDestroy(): void {
    localStorage.setItem('filters', JSON.stringify(this.variables));
  }

}
