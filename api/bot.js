import admin from "firebase-admin"

if(!admin.apps.length){
admin.initializeApp({
credential: admin.credential.cert({
projectId: process.env.FIREBASE_PROJECT_ID,
clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g,"\n")
})
})
}

const db=admin.firestore()

export default async function handler(req,res){

if(req.method!=="POST"){
return res.status(200).send("OK")
}

const body=req.body

if(body.callback_query){

const data=body.callback_query.data

// ORDER APPROVE
if(data.startsWith("approve_order_")){
const orderId=data.replace("approve_order_","")
await db.collection("orders").doc(orderId).update({
status:"success"
})
}

// ORDER REJECT
if(data.startsWith("reject_order_")){
const orderId=data.replace("reject_order_","")
const orderDoc=await db.collection("orders").doc(orderId).get()

if(orderDoc.exists){
const order=orderDoc.data()

await db.collection("orders").doc(orderId).update({
status:"cancel"
})

const userRef=db.collection("users").doc(order.userId)

await db.runTransaction(async(t)=>{
const user=await t.get(userRef)
const bal=user.data().balance||0
t.update(userRef,{balance:bal+Number(order.price)})
})
}
}

// DEPOSIT APPROVE
if(data.startsWith("approve_deposit_")){
const depositId=data.replace("approve_deposit_","")
const depDoc=await db.collection("deposits").doc(depositId).get()

if(depDoc.exists){
const dep=depDoc.data()

await db.collection("deposits").doc(depositId).update({
status:"approved"
})

const userRef=db.collection("users").doc(dep.userId)

await db.runTransaction(async(t)=>{
const user=await t.get(userRef)
const bal=user.data().balance||0
t.update(userRef,{balance:bal+Number(dep.amount)})
})
}
}

// DEPOSIT REJECT
if(data.startsWith("reject_deposit_")){
const depositId=data.replace("reject_deposit_","")
await db.collection("deposits").doc(depositId).update({
status:"rejected"
})
}

}

res.status(200).send("OK")
}
