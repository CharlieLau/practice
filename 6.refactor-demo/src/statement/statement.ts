export function statement(invoice, plays) {
    let totalAmount = 0
    let volumnCredits = 0
    let result = `Statement for ${invoice.customer} \n`
    const format = new Intl.NumberFormat('en-us', { style: 'currency', currency: "USD", minimumFractionDigits: 2 }).format

    for (let perf of invoice.performances) {

        const play = plays[perf.playID]
        let thisAmount = amountFor(play, perf)
        // add volume credits
        volumnCredits += Math.max(perf.audience - 30, 0)

        if ("comedy" === play.type) volumnCredits += Math.floor(perf.audience / 5)

        //print  line for  this order
        result += ` ${play.name}: ${format(thisAmount / 100)} (${perf.audience} seats) \n`
        totalAmount += thisAmount
    }

    result += `Amount owed is ${format(totalAmount / 100)}\n`
    result += `You earned ${volumnCredits} credits\n`

    return result

    function amountFor(play: any, perf: any) {
        let result = 0

        switch (play.type) {

            case 'tragedy':
                result = 40000
                if (perf.audience > 30) {
                    result += 1000 * (perf.audience - 30)
                }
                break

            case 'comedy':
                result = 30000
                if (perf.audience > 20) {
                    result += 10000 + 500 * (perf.audience - 20)
                }
                result += 300 * perf.audience
                break
            default:
                throw new Error(`unkown type: ${play.type}`)
        }
        return result
    }
}

