import {db} from "../firebase.js"

export default async function approveDeposit(data){

const id=data.replace("approve_deposit_","")

await db.collection("deposits").doc(id).update({
status:"approved"
})

}
