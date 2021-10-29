
export interface ProducerDataImpl{
    name:string,
    cost:number,
    production:number
}


export interface ProvinceDataImpl{
    name:string,
    producers: ProducerDataImpl[]
    demand:number,
    price:number
}