import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  query = gql`
    query Ship($limit: Int, $offset: Int, $name: String, $home_port: String, $type: String){
      shipsResult (limit: $limit, offset: $offset, find: {name: $name, home_port: $home_port, type: $type}) {
        data{
          id
          name
          home_port
          type
          missions {
            name
          }
          weight_kg
          year_built
        }
        result {
          totalCount
        }
      }
    }
  `;
  queryId = gql`
    query ShipById($id: ID){
      shipsResult(find: {id: $id}) {
        data{
          id
          name
          home_port
          type
          missions {
            name
          }
          weight_kg
          year_built
        }
        result {
          totalCount
        }
      }
    }
  `;
  constructor(private apollo: Apollo) { }

  getData(pageSize: number, nameShip: string, homePorts: string, type: string) {
    return this.apollo.watchQuery<any>({
      query: this.query,
      variables: {
        limit: pageSize,
        offset: 0,
        name: nameShip,
        home_port: homePorts,
        type: type
      }
    })
  }

  getDataById(ids: string) {
    return this.apollo.watchQuery<any>({
      query: this.queryId,
      variables: {
        id: ids
      }
    })
  }
}
