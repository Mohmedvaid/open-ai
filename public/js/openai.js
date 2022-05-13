const OpenAI = {
  renderChoices: function (data) {
    const responseDiv = $("#chatMain");
    const html = `
          <div class="d-flex justify-content-start mb-4">
              <div class="img_cont_msg">
                  <img src="assets/logo.svg" class="rounded-circle user_img_msg">
              </div>
              <div class="msg_cotainer">
            ${data.map((choice) => `<p>${choice.text}</p>`).join("")}
              </div>
          </div>`;
    responseDiv.append(html);
    return;
  },
  extractResponses: function (data) {
    console.log("data from out api==>>", data);
    return data.choices;
  },
  generateAPIBody: function (prompt, config) {
    return {
      prompt,
      temperature: 0.5,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };
  },
  sendRequest: function (data) {
    return fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  },
  showTypingLoader: function () {
    const loader = $("#typingLoader");
    loader.removeClass("invisible");
  },
  hideTypingLoader: function () {
    const loader = $("#typingLoader");
    loader.addClass("invisible");
  },
};
