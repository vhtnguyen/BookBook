// modal
const modal_body = document.querySelector(".modal-body");
const header_avatar = document.querySelector(".header-img");
const header_user = document.querySelector(".header-name");
const contents_body = document.querySelector(".contents-body");
const contents_comments = document.querySelector(".contents-comments");
export const showModal = (data_images) => {
  //image
  const html_image = `<img src="${data_images.image}" alt="" />`;
  // user
  //const html_avatar = `<img src="${data_images.avatar}" alt="" />`;
  // const html_user = `
  //  <span><b>${data_images.user}</b></span>
  //  <span class="fst-italic fw-lighter">${data_images.id_user}</span>`;
  // content
  const html_contents = `<p>${data_images.contents}</p>`;
  // comments
  const html_comments = data_images.data.map((item) => {
    return `
      <div
         class="user-other d-flex flex-row justify-content-between gap-2 mb-3">
         <div class="img-user">
            <img src="${item.avatar}" alt="" />
         </div>
         <div
            class="user-comment d-flex flex-column justify-content-between">
            <div class="p-2">
               <span><b>${item.name}</b></span>
               <span><p class="m-0">${item.comment}</p></span>
            </div>
         </div>
      </div>`;
  });

  //
  modal_body.innerHTML = html_image;
  //header_avatar.innerHTML = html_avatar;
  //header_user.innerHTML = html_user;
  contents_body.innerHTML = html_contents;
  contents_comments.innerHTML = html_comments.join("");
};
const btn_show_message = document.querySelector(".btn-delete");
btn_show_message.addEventListener("click", () => {
  document.querySelector(".modal-delete").style.display = "block";
});
// btn- close
const btn_close = document.querySelector(".btn-close-modal");
btn_close.addEventListener("click", () => {
  document.querySelector(".modal-delete").style.display = "none";
});

// btn- when you dont agree to delete
const btn_no = document.querySelector(".btn-no");
btn_no.addEventListener("click", () => {
  document.querySelector(".modal-delete").style.display = "none";
});

// btn- when agreeing to delete
const btn_yes = document.querySelector(".btn-yes");
btn_yes.addEventListener("click", async () => {
  document.querySelector(".modal-delete").style.display = "none";
  // fetch api when user click yes

  // try {
  //    await fetch("url api");
  // } catch (error) {
  //    console.log(error);
  // }
});
