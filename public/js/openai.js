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
    console.log(data);
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
    return fetch(
      "https://api.openai.com/v1/engines/text-curie-001/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer api_key`,
        },
        body: JSON.stringify(data),
      }
    ).then((res) => res.json());
  },
};
