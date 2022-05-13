const Util = {
  scrollToBottom: function (el) {
    $(el).scrollTop($(el)[0].scrollHeight);
  },
  displayError: function (error) {
    console.error(error);
    const errDiv = $("#error");
    let errMsg = error
      ? error
      : "Oops, something went wrong. Please try again.";
    errDiv.text(errMsg);
    errDiv.removeClass("invisible");
  },
  clearError: function () {
    const errDiv = $("#error");
    errDiv.addClass("invisible");
    errDiv.text("");
  },
};
