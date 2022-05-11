$(document).ready(function () {
  // get prompt
  $("#formMain").submit(function (e) {
    e.preventDefault();
    const prompt = getUserPrompt();
    const data = generateData(prompt);
    sendRequest(data)
      .then((data) => data.json())
      .then(getChoices)
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

function sendRequest(data) {
  return fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer API`,
    },
    body: JSON.stringify(data),
  });
}

function generateData(prompt, config) {
  return {
    prompt,
    temperature: 0.5,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };
}

function getChoices(data) {
  console.log(data);
  return data.choices;
}

function renderChoices(choices) {
  const responseDiv = $("#response");
  choices.forEach((choice) => {
    const choiceDiv = $("<div>");
    choiceDiv.text(choice.text);
    responseDiv.append(choiceDiv);
  });
}
