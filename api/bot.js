export default async function handler(req, res) {

  console.log("Telegram update:", req.body)

  if (req.body.callback_query) {
    const callbackId = req.body.callback_query.id

    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/answerCallbackQuery`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        callback_query_id: callbackId,
        text: "Button clicked"
      })
    })
  }

  res.status(200).send("OK")
}
