$(document).ready(function () {
  $("#formMain").submit(function (e) {
    e.preventDefault();
    const prompt = User.getPrompt();
    const data = OpenAI.generateAPIBody(prompt);
    const HTMLPrompt = User.createPromptHTML(prompt);
    User.appendPrompt(HTMLPrompt);
    OpenAI.sendRequest(data)
      // .then((data) => data.json())
      .then((res) => OpenAI.extractResponses(res))
      .then((responses) => OpenAI.renderChoices(responses))
      .then(() => Util.scrollToBottomInChat())
      .catch((err) => {
        console.log("Error:");
        console.error(err);
      });
  });
});
