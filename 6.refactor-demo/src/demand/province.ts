import { Producer } from "./producer"
import { ProvinceDataImpl } from "./types"

export class Province {
    _name: string
    _producers: Producer[] = []
    _totalProduction: number = 0
    _demand: number
    _price: number

    constructor(doc: ProvinceDataImpl) {
        this._name = doc.name
        this._demand = doc.demand
        this._price = doc.price
        doc.producers.forEach(d => this.addProducer(new Producer(this, d)))
    }

    addProducer(arg: Producer) {
        this._producers.push(arg)
        this._totalProduction += arg.production
    }

    get totalProduction() {
        return this._totalProduction
    }

    get shortfail() {
        return this._demand - this.totalProduction
    }

    get satisfiedDemand() {
        return Math.min(this._demand, this.totalProduction)
    }

    get price() { return this._price }

    get demandValue() {
        return this.satisfiedDemand * this.price
    }

    get demandCost() {
        let remainingDemain = this._demand
        let result = 0

        this._producers
            .sort((a, b) => a.cost - b.cost)
            .forEach(p => {
                const contribution = Math.min(remainingDemain, p.production)
                remainingDemain -= contribution
                result += contribution * p.cost
            })

        return result
    }

    get profit(){
        return this.demandValue  - this.demandCost
    }
}