import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IShip } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-ship-item',
  templateUrl: './ship-item.component.html',
  styleUrls: ['./ship-item.component.css']
})
export class ShipItemComponent implements OnInit {

  @Input()ship!: IShip;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  routerShip(id: string) {
    this.router.navigate(["/card", id]);
  }

}
