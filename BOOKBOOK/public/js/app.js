async function logOut() {
  document.getElementById("logout-form").submit();
}

const searchBox = document.querySelector(".search-box");

document.querySelector(".fa-search").addEventListener("click", () => {
  searchBox.classList.contains("active")
    ? searchBox.classList.remove("active")
    : searchBox.classList.add("active");
});

const head_search = document.querySelector("#submit-on-enter");
const head_form = document.querySelector("#head-form");
if (head_search) {
  head_search.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  head_search.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
      let query = head_search.value;
      if (query.trim() !== "") {
        head_form.submit();
      }
    }
  });
}
