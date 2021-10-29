import { Province } from "./province"
import { sampleProvinceData } from "./smaple"
import assert from 'assert'

describe('province', function () {

    let asia  

    beforeEach(function(){
        asia = new  Province(sampleProvinceData())
    })

    it('shortfail', function () {
        assert.equal(asia.shortfail, 5)
    })

    it('profit',function(){
        assert.equal(asia.profit,230)
    })
})