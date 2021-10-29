import { Province } from "./province"
import {  ProducerDataImpl } from "./types"


export class Producer {

    _provice:Province
    _cost:number
    _name:string
    _production: number

    constructor(province: Province, data:ProducerDataImpl) {
        this._provice =province
        this._name = data.name
        this._production = data.production
        this._cost = data.cost
    }

    get name(){return  this._name}
    get cost(){return this._cost}
    set cost(arg) {this._cost = arg}

    get production(){ return  this._production}

    set production(amount){
        this._provice._totalProduction += amount - this._production
        this._production = amount
    }


    
}