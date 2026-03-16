import {db} from "../firebase.js"

export default async function rejectDeposit(data){

const id=data.replace("reject_deposit_","")

await db.collection("deposits").doc(id).update({
status:"rejected"
})

}
