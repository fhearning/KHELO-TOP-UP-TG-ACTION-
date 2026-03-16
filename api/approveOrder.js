import {db} from "../firebase.js"

export default async function handler(req,res){

const id=req.query.id

await db.collection("orders").doc(id).update({
status:"success"
})

res.json({success:true})

}
