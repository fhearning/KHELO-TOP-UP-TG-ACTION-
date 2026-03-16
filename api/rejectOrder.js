import {db,FieldValue} from "../firebase.js"

export default async function handler(req,res){

const id=req.query.id

const orderDoc=await db.collection("orders").doc(id).get()

const order=orderDoc.data()

await db.collection("orders").doc(id).update({
status:"cancel"
})

await db.collection("users").doc(order.userId).update({
balance:FieldValue.increment(order.price)
})

res.json({success:true})

}
