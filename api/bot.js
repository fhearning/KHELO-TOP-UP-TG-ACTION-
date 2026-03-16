export default async function handler(req,res){

const update=req.body

console.log(update)

res.status(200).send("ok")

}
