// check location (at report user or report post)
let nav_item_left = document.querySelectorAll(".nav-item-left");
let _location = "";
nav_item_left.forEach((item) => {
  let nav_link = item.children[0];
  if (nav_link.classList.contains("active")) {
    _location = nav_link.getAttribute("rp-type");
  }
});

// handle view button
let view_user = document.getElementsByName("view-user");
for (let i = 0; i < view_user.length; i++) {
  view_user[i].addEventListener("click", function () {
    let username =
      view_user[i].parentElement.parentElement.children[1].innerText;
    window.location.href = `/profile/?username=${username}`;
  });
}
let view_post = document.getElementsByName("view-post");
for (let i = 0; i < view_post.length; i++) {
  view_post[i].addEventListener("click", async function () {
    let post_id = this.getAttribute("postid");
    await fetch(`/admin/post/view?post_id=${post_id}`)
      .then((res) => res.json())
      .then((data) => {
        const profile = data.author_username_user_profile;
        const html_avatar = `<img src="avatar/${profile.avatar}" alt="" />`;
        const html_image = `<img class="img-post" src="post/${data.img}" alt="" />`;
        const html_contents = `<p>${data.text}</p>`;
        const html_header_name = `<span><strong>${profile.fullname}</strong></span>
                                        <span
                                        class="fst-italic fw-lighter"
                                        >@${data.author_username}</span>`;

        document.querySelector("#post-image").innerHTML = html_image;
        document.querySelector(".contents-body").innerHTML = html_contents;
        document.querySelector(".header-img").innerHTML = html_avatar;
        document.querySelector(".header-name").innerHTML = html_header_name;
        $("#exampleModal").modal("show");
      });
  });
}

// handle skip button
let confirm_skip = document.getElementById("confirm-skip");
function confirmSkip(skip_btn) {
  $("#skipModal").modal("show");
  confirm_skip.addEventListener("click", skip, false);
  confirm_skip.skip_btn = skip_btn;
}
async function skip(event) {
  let row = event.currentTarget.skip_btn.parentElement.parentElement;
  let row_index = row.rowIndex;
  let report_id = row.children[0].innerText;
  let url = "";

  if (_location == "post") {
    url = "/admin/post/skip";
  } else {
    url = "/admin/user/skip";
  }
  let result = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: report_id }),
  })
    .then((res) => res.json())
    .then((result) => {
      return result;
    });

  if (result) {
    console.log(`Skip ${_location} ${report_id} successfully`);
    document.getElementById("rp-table").deleteRow(row_index);
    confirm_skip.removeEventListener("click", skip, false);
    $("#skipModal").modal("hide");
  } else {
    console.log(`Fail to skip report of ${_location} ${report_id}`);
    alert(`Fail to skip report of ${_location} ${report_id}`);
  }
}

// handle delete button
let confirm_delete = document.getElementById("confirm-delete");
function confirmDelete(delete_btn) {
  $("#deleteModal").modal("show");
  confirm_delete.addEventListener("click", _delete, false);
  confirm_delete.delete_btn = delete_btn;
}
async function _delete(event) {
  let row = event.currentTarget.delete_btn.parentElement.parentElement;
  let data = row.children[1].innerText;
  let rows = document.querySelectorAll("tr");
  let table = document.getElementById("rp-table");
  let url = "";

  if (_location == "post") {
    url = "/admin/post/delete";
  } else {
    url = "/admin/user/delete";
  }
  let result = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: data }),
  })
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
  if (result) {
    console.log(`Delete ${location} ${data} successfully`);
    $("#deleteModal").modal("hide");
    confirm_delete.removeEventListener("click", _delete, false);
    rows.forEach((row) => {
      if (row.children[1].innerText == data) {
        let row_index = row.rowIndex;
        table.deleteRow(row_index);
      }
    });
  } else {
    console.log(`Fail to delete ${_location} ${data}`);
    alert(`Fail to delete ${_location} ${data}`);
  }
}

document.querySelector(".header-setting").disabled = true;
document.querySelector(".input-comments").disabled = true;
document.querySelector(".btn-comment").disabled = true;
// document.querySelector(".btn-like").disabled = true
