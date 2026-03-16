import {db} from "../firebase.js"

export default async function handler(req,res){

const id=req.query.id

await db.collection("deposits").doc(id).update({
status:"rejected"
})

res.json({success:true})

}
