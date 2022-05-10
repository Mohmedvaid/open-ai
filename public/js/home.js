$(document).ready(function () {
  // get prompt
  $("#formMain").submit(function (e) {
    e.preventDefault();
    const prompt = getUserPrompt();
    const data = generateData(prompt);
    sendRequest(data)
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  });
});

function getUserPrompt() {
  return $("textarea[name='userPrompt']").val().trim();
}

function sendRequest(data) {
  return fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer APIKEY`,
    },
    body: JSON.stringify(data),
  });
}

function generateData(prompt, config) {
  return (data = {
    prompt,
    temperature: 0.5,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });
}
