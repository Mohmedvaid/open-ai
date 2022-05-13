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
    const promptDiv = $("#prompt");
    promptDiv.text("");
  },
};
