import approveOrder from "./approveOrder.js"
import rejectOrder from "./rejectOrder.js"
import approveDeposit from "./approveDeposit.js"
import rejectDeposit from "./rejectDeposit.js"

export default async function handler(req,res){

const body=req.body

if(body.callback_query){

const data=body.callback_query.data

if(data.startsWith("approve_order_")){
await approveOrder(data)
}

if(data.startsWith("reject_order_")){
await rejectOrder(data)
}

if(data.startsWith("approve_deposit_")){
await approveDeposit(data)
}

if(data.startsWith("reject_deposit_")){
await rejectDeposit(data)
}

}

res.status(200).send("OK")
}
