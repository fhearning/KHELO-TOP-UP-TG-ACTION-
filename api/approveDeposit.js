import {db,FieldValue} from "../firebase.js"

export default async function handler(req,res){

const id=req.query.id

const depDoc=await db.collection("deposits").doc(id).get()

const dep=depDoc.data()

await db.collection("deposits").doc(id).update({
status:"approved"
})

await db.collection("users").doc(dep.userId).update({
balance:FieldValue.increment(dep.amount)
})

res.json({success:true})

}
