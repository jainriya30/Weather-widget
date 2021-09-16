export class Weather {
    constructor(
        public temp: number,
        public summary : string,
        public wind : number,
        public humidity: number,
        public icon: string
    ){ }
}
export class locName {
    constructor(
        public street: string,
        public state: string
    ) { }
}