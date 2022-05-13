const User = {
  getPrompt: function () {
    return $("textarea[name='userPrompt']").val().trim();
  },
  appendPrompt: function (HTMLPrompt) {
    $("#chatMain").append(HTMLPrompt);
  },
  createPromptHTML: function (prompt) {
    return `
        <div class="d-flex justify-content-end mb-4">
            <div class="msg_cotainer_send">
                ${prompt}
            </div>
            <div class="img_cont_msg">
                <img src="assets/user-icon.png" class="rounded-circle user_img_msg">
            </div>
        </div>
    `;
  },
  clearPrompt: function () {
    const promptTextarea = $("textarea[name='userPrompt']");
    promptTextarea.val("");
  },
  saveDataToLocalStorage: function (data) {
    let exitingData = localStorage.getItem("chatData");
    exitingData = exitingData ? JSON.parse(exitingData) : [];
    updatedData = [...exitingData, data];
    localStorage.setItem("chatData", JSON.stringify(updatedData));
    return data;
  },
  getDataFromLocalStorage: function () {
    let existingData = localStorage.getItem("chatData");
    existingData = existingData ? JSON.parse(existingData) : [];
    return existingData;
  },
  renderSavedData: function (data) {
    data.forEach((item) => {
      const HTMLPrompt = User.createPromptHTML(item.prompt);
      User.appendPrompt(HTMLPrompt);
      OpenAI.renderChoices(item.chatResponse);
    });
  },
};
