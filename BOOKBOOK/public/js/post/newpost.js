var input = document.getElementsByName("img_upload")[0];
input.onchange = function () {
  var file = this.files;
  const submit = document.getElementById("submit_post");
  if (file.length > 0) {
    submit.disabled = false;
  } else {
    submit.disabled = true;
  }
};
