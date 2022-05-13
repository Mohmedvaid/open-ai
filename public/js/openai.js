const OpenAI = {
  renderChoices: function (data) {
    const responseDiv = $("#response");
    console.log(data);
    const html = `<div class="response-ai">
                    ${data.map((choice) => `<p>${choice.text}</p>`).join("")}
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
    let tempData = localStorage.getItem("data");
    if (tempData) {
      tempData = JSON.parse(tempData);
      return Promise.resolve(tempData);
    }
    return fetch(
      "https://api.openai.com/v1/engines/text-curie-001/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer api`,
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("data", JSON.stringify(data));
      });
  },
};
