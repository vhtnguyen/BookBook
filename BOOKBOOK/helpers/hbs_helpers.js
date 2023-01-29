module.exports = {
  gender: (gender) => {
    if (gender === "male") {
      return (
        '<div class="form-check">' +
        '<input class="form-check-input" type="radio" name="gender" id="male"' +
        'value="male" required checked />' +
        '<label class="form-check-label" for="gender1">' +
        "Male" +
        "</label>" +
        "</div>" +
        '<div class="form-check">' +
        '<input class="form-check-input" type="radio" name="gender"' +
        'value="female" id="female" />' +
        '<label class="form-check-label" for="gender2">' +
        "Female" +
        "</label>" +
        "</div>"
      );
    } else {
      return (
        '<div class="form-check">' +
        '<input class="form-check-input" type="radio" name="gender" id="male"' +
        'value="male" required/>' +
        '<label class="form-check-label" for="gender1">' +
        "Male" +
        "</label>" +
        "</div>" +
        '<div class="form-check">' +
        '<input class="form-check-input" type="radio" name="gender"' +
        'value="female" id="female" checked />' +
        '<label class="form-check-label" for="gender2">' +
        "Female" +
        "</label>" +
        "</div>"
      );
    }
  },
  eq: (str1, str2) => {
    return str1 === str2;
  },
  notEq: (str1, str2) => {
    return str1 !== str2;
  },
  isFollowedByUser: (username, followedByUser) => {
    if (followedByUser) {
      for (let i = 0; i < followedByUser.length; i++) {
        if (username === followedByUser[i].dataValues.usr_followed) {
          return true;
        }
      }
    }

    return false;
  },
  smallFollowersList: (followers) => {
    let arr = [];
    if (followers) {
      for (let i = followers.length - 1; i >= 0; i--) {
        if (i == followers.length - 1 - 5) {
          break;
        }
        arr.push(followers[i].dataValues.usr_follow_user_profile.dataValues);
      }
    }
    return arr;
  },
  smallFollowingList: (following) => {
    let arr = [];
    if (following) {
      for (let i = following.length - 1; i >= 0; i--) {
        if (i == following.length - 1 - 5) {
          break;
        }
        arr.push(following[i].dataValues.usr_followed_user_profile.dataValues);
      }
    }
    return arr;
  },
  displayVND: (money) => {
    return money.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
  },
  notAdmin: (permission) => {
    if (permission == 1) {
      return false
    }
    return true
  }
};
