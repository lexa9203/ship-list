export interface IShip {
    id: string;
    home_port: string;
    name: string;
    type: string;
    weight_kg: number;
    year_built: number;
    missions: IMission[];
}

export interface IMission {
    name: string;
}
