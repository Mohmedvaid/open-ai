$(document).ready(function () {
  $("#formMain").submit(async function (e) {
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
    User.clearPrompt();

    // Generate the API request body
    const data = OpenAI.generateAPIBody(prompt);

    try {
      // Send the request and render the response
      OpenAI.showTypingLoader();
      const response = await OpenAI.sendRequest(data);
      const chatResponse = OpenAI.extractResponses(response);
      OpenAI.renderChoices(chatResponse);
      User.saveDataToLocalStorage({ prompt, chatResponse });
      Util.clearError();
      Util.scrollToBottom(".msg_card_body");
      OpenAI.hideTypingLoader();
    } catch (err) {
      OpenAI.hideTypingLoader();
      Util.clearError();
      Util.displayError(err);
    }

    // OpenAI.sendRequest(data)
    //   .then((res) => OpenAI.extractResponses(res))
    //   .then((responses) => OpenAI.renderChoices(responses))
    //   .then(() => User.saveDataToLocalStorage([{ prompt, responses }]))
    //   .then(() => Util.clearError())
    //   .then(() => Util.scrollToBottom(".msg_card_body"))
    //   .then(() => OpenAI.hideTypingLoader())
    //   .catch((err) => {
    //     OpenAI.hideTypingLoader();
    //     Util.clearError();
    //     Util.displayError(err);
    //   });
  });

  // Render saved data from local storage
  const chatHistory = User.getDataFromLocalStorage();
  if (chatHistory.length > 0) {
    User.renderSavedData(chatHistory);
  }
  // Ready ends here
});
