import {db} from "../firebase.js"

export default async function rejectOrder(data){

const id=data.replace("reject_order_","")

await db.collection("orders").doc(id).update({
status:"cancel"
})

}
