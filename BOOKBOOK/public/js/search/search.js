const left_search = document.querySelector("#left-form");
const btn_submit = document.querySelector("#left-submit");

left_search.addEventListener("submit", (e) => {
  e.preventDefault();
  left_search.submit();
});


/*****  handle follow/unfollow buttons *****/
const htmlFollowing = `<button type="button" class="btn btn-success" data-bs-toggle="dropdown" aria-expanded="false">
                              Following <i class="fa fa-check"></i>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end">
                              <li>
                                  <button type="button" class="btn dropdown-item" name="unfollow">
                                    Unfollow
                                  </button>
                              </li>
                            </ul>`;
const htmlNotFollow = `<button type="button" class="btn btn-outline-success" name="follow">Follow</button>`;

async function handleFollow(event) {
  let user_to_follow = event.currentTarget.user_to_follow;
  let result = await follow(user_to_follow);
  if (!result) {
    alert(`Error occurs when following ${user_to_follow}`);
  } else {
    // replace button
    let parent = this.parentElement;
    parent.innerHTML = htmlFollowing;

    // set event listener for unfollow button
    let newBtn = parent.children[1].children[0].children[0];
    newBtn.addEventListener("click", handleUnfollow);
    newBtn.user_to_unfollow = user_to_follow;
  }
}

async function handleUnfollow(event) {
  let user_to_unfollow = event.currentTarget.user_to_unfollow;
  let result = await unfollow(user_to_unfollow);
  if (!result) {
    alert(`Error occurs when unfollowing ${user_to_unfollow}`);
  } else {
    // replace button
    let divParent = this.parentElement.parentElement.parentElement;
    divParent.innerHTML = htmlNotFollow;

    // set event listener for follow button
    let newBtn = divParent.children[0];
    newBtn.addEventListener("click", handleFollow);
    newBtn.user_to_follow = user_to_unfollow;
  }
}

let follow_btns = document.getElementsByName("follow");
let unfollow_btns = document.getElementsByName("unfollow");

for (let i = 0; i < follow_btns.length; i++) {
  follow_btns[i].addEventListener("click", handleFollow);
  let user_to_follow = follow_btns[i].parentElement.getAttribute('user');
  console.log(user_to_follow)
  follow_btns[i].user_to_follow = user_to_follow;
  //console.log(follow_btns[i].user_to_follow)
}

for (let i = 0; i < unfollow_btns.length; i++) {
  unfollow_btns[i].addEventListener("click", handleUnfollow);
  let user_to_unfollow = unfollow_btns[i].parentElement.parentElement.parentElement.getAttribute('user');
  console.log(user_to_unfollow)
  unfollow_btns[i].user_to_unfollow = user_to_unfollow;
  //console.log(unfollow_btns[i].user_to_unfollow)
}

async function follow(user_to_follow) {
  return await fetch("/profile/follow", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ user_to_follow: user_to_follow }),
  })
    .then((res) => res.json())
    .then((data_received) => {
      if (data_received.result == 1) {
        console.log(`start following ${user_to_follow}`);
        return true;
      } else {
        console.log(`error occurs when try to follow ${user_to_follow}`);
        return false;
      }
    });
}

async function unfollow(user_to_unfollow) {
  return await fetch("/profile/unfollow", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ user_to_unfollow: user_to_unfollow }),
  })
    .then((res) => res.json())
    .then((data_received) => {
      if (data_received.result == 1) {
        console.log(`unfollow ${user_to_unfollow}`);
        return true;
      } else {
        console.log(`error occurs when try to unfollow ${user_to_unfollow}`);
        return false;
      }
    });
}