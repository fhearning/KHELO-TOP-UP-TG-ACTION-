import {db} from "../firebase.js"

export default async function approveOrder(data){

const id=data.replace("approve_order_","")

await db.collection("orders").doc(id).update({
status:"success"
})

}
