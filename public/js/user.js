const User = {
  getPrompt: function () {
    return $("textarea[name='userPrompt']").val().trim();
  },
  appendPrompt: function (HTMLPrompt) {
    $("#response").append(HTMLPrompt);
  },
  createPromptHTML: function (prompt) {
    return `<div class="response-user">
                <p>${prompt}</p>
            </div>`;
  },
};
