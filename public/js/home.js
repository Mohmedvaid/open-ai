$(document).ready(function () {
  // get prompt
  $("#formMain").submit(function (e) {
    e.preventDefault();
    const prompt = getUserPrompt();
    const data = generateAPIBody(prompt);
    const HTMLPrompt = createUserPromptHTML(prompt);
    appendUserPrompt(HTMLPrompt);
    sendRequest(data)
      // .then((data) => data.json())
      .then(extractAIResponses)
      .then(renderChoices)
      .catch((err) => {
        console.log("Error:");
        console.error(err);
      });
  });
});

function getUserPrompt() {
  return $("textarea[name='userPrompt']").val().trim();
}

function appendUserPrompt(HTMLPrompt) {
  $("#response").append(HTMLPrompt);
}

function sendRequest(data) {
  let tempData = localStorage.getItem("data");
  if (tempData) {
    tempData = JSON.parse(tempData);
    return Promise.resolve(tempData);
  }
  return fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer API_KEY`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem("data", JSON.stringify(data));
    });
}

function generateAPIBody(prompt, config) {
  return {
    prompt,
    temperature: 0.5,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };
}

function extractAIResponses(data) {
  console.log(data);
  return data.choices;
}

function renderChoices(data) {
  const responseDiv = $("#response");
  const html = `<p class="response-ai">${data[0].text}</p>`;
  responseDiv.append(html);
  return;
}

function createUserPromptHTML(prompt) {
  return `<p class="response-user">${prompt}</p>`;
}
