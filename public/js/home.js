$(document).ready(function () {
  $("#formMain").submit(function (e) {
    e.preventDefault();
    // Get and validate the input
    const prompt = User.getPrompt();
    if (prompt.length === 0) {
      Util.displayError("Please enter a prompt");
      return;
    }
    // Render prompt in chat
    const HTMLPrompt = User.createPromptHTML(prompt);
    User.appendPrompt(HTMLPrompt);
    Util.scrollToBottom(".msg_card_body");

    // Generate the API request body
    const data = OpenAI.generateAPIBody(prompt);

    // Send the request and render the response
    OpenAI.sendRequest(data)
      .then((res) => OpenAI.extractResponses(res))
      .then((responses) => OpenAI.renderChoices(responses))
      .then(() => User.clearPrompt())
      .then(() => Util.clearError())
      .then(() => Util.scrollToBottom(".msg_card_body"))
      .catch((err) => {
        Util.clearError();
        Util.displayError(err);
      });
  });
});
