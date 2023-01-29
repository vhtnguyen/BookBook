//thao đổi data của modal sau khi resquest data của item từ server
const changeData = (res) => {
  const item_title = document.querySelector("#item-title");
  const seller_avt = document.querySelector("#seller-avt");
  const seller_name = document.querySelector("#seller-name");
  const time_post_item = document.querySelector("#time-post-item");
  const item_des = document.querySelector("#item-des");
  const item_img = document.querySelector("#item-img");
  const item_price = document.querySelector("#item-price");
  item_title.innerHTML = res.title;
  seller_avt.src = res.seller_avt;
  seller_name.innerHTML = res.post_by;
  time_post_item.innerHTML = res.post_time;
  item_des.src = res.text;
  item_img.innerHTML = res.img;
  item_price.innerHTML = res.price;
};

// const event_click_image = () => {
//   const items = document.querySelectorAll(".list-item-group");
//   items.forEach((item, index) => {
//     item.onclick = () => {
//       console.log(item.getAttribute("post_id"));
//       //fetch here to take item data
//     };
//   });
// };
const click_btn_del = () => {
  const items = document.querySelectorAll(".btn-del-item");
  items.forEach((item, index) => {
    item.onclick = () => {
      let id = item.getAttribute("post_id");
      confirm(`Confirm to delete item #${id}`);
    };
  });
};

const input = document.getElementById("file-input");
const image = document.getElementById("img-preview");

input.addEventListener("change", (e) => {
  if (e.target.files.length) {
    const src = URL.createObjectURL(e.target.files[0]);
    image.src = "";
    image.style.visibility = "visible";
  }
});
const new_item_form = document.querySelector("#new-item-form");

const resetForm = () => {
  new_item_form.reset();
  image.style.visibility = "hidden";
};

const btn_post_item = document.querySelector("#btn-post-item");
const btn_cancel_post = document.querySelector("#btn-cancel-post");
btn_cancel_post.addEventListener("click", (e) => {
  resetForm();
});
// btn_post_item.addEventListener("click", (e) => {
//   resetForm();
// });
event_click_image();
click_btn_del();
