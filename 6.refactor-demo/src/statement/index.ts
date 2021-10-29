import { statement } from "./statement";
import  plays  from './plays.json'
import invoices from './invoices.json'


const result = statement(invoices,plays)

console.log(result)