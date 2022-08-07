import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryRef } from 'apollo-angular';
import { IShip } from 'src/app/interfaces/interfaces';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.css']
})
export class CardPageComponent implements OnInit {

  loading = false;
  id: string = '';
  ship!: IShip;
  missions: string = '';
  shipQuery!: QueryRef<any>;

  constructor(private appService: AppService, private router: Router, private route: ActivatedRoute) { 
    this.route.params.subscribe(res => this.id = res['id']);
    this.shipQuery = this.appService.getDataById(this.id);
  }
  
  ngOnInit(): void {
    this.loading = true;
    this.shipQuery.fetchMore({variables: {id: this.id}})
    .then(res => {
        this.ship = res.data.shipsResult.data[0];
        this.missions = res.data.shipsResult.data[0].missions.map((el:{name: string}) => el.name).join(', ');
      }).catch(err => {
        console.log(err);
      }).finally(() => this.loading = false)
  }

  goHome() {
    this.router.navigate(["/"]);
  }

}
