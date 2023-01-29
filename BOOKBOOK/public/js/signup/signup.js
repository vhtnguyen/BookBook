let form = document.getElementById("signup-form")

let inputs = document.querySelectorAll("input")

// validate input
inputs.forEach((input) => {
   input.addEventListener("input", () => {
      switch(input.name) {
         case "fullname":
            checkFullname(input)
            break
         case "username":
            checkUsername(input)
            break
         case "password":
            checkPassword(input)
            break
         case "confirm_pw":
            checkConfirmPw(input)
            break
         case "email":
            checkEmail(input)
            break
      }
   })
})

form.addEventListener('submit', async function (event) {
   event.preventDefault()
   event.stopPropagation()
   let username = document.getElementById("username")
   
   // if validate successfully
   if (form.checkValidity()) {
      
      // check if username has already been registered
      let data_received = await fetch('/signup', {
         method: 'post',
         headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
         },
         body: JSON.stringify({ todo: "checkusername", username: username.value })
      }).then(res => res.json())

      // if username hasn't been registered
      if (data_received.result == 1) {
         username.setCustomValidity("")
         document.getElementById("un-fb").innerHTML = "<small>Not begin with a digit and contain at least 6 characters, including alphabet letters, numbers or _ (underscore)</small>"
         signUp(form)
      }

      // if username has been registered
      else {
         username.setCustomValidity("Invalid")
         document.getElementById("un-fb").innerHTML = "<small>This username has been used</small>"
      }
   }

   form.classList.add('was-validated')
}, false)


const fullname_regex = /^[A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ][a-zàáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]*(?: [A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ][a-zàáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]*)*$/
const username_regex = /^(?!\d)(\w){6,}$/
const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// user sign up
async function signUp(form) {
   let data_send = {
      todo: "signup",
      username: form.username.value,
      password: form.password.value,
      fullname: form.fullname.value,
      dob: form.dob.value,
      email: form.email.value,
      gender: form.gender.value,
      secretkey: form.secretkey.value,
   }
   //console.log(data_send)
   let data_received = await fetch('/signup', {
      method: 'post',
      headers: {
         "Content-Type": "application/json",
         Accept: "application/json",
      },
      body: JSON.stringify(data_send)
   }).then(res => res.json())

   // if sign up successfully
   if (data_received.result == 1) {
      window.location.href = '/login'
   }
   // if fail to sign up 
   else {
      alert("Error occurs while creating new account, please try again!")
   }
}

function checkFullname(fullname) {
   if (fullname_regex.test(fullname.value)) {
      fullname.setCustomValidity("")
   }
   else {
      fullname.setCustomValidity("Invalid")
   }
}

function checkUsername(username) {
   document.getElementById("un-fb").innerHTML = "<small>Not begin with a digit and contain at least 6 characters, including alphabet letters, numbers or _ (underscore)</small>"
   if (username_regex.test(username.value)) {
      username.setCustomValidity("")
      return true
   }
   else {
      username.setCustomValidity("Invalid")
      return false
   }
}

function checkPassword(password) {
   if (password_regex.test(password.value)) {
      password.setCustomValidity("")
   }
   else {
      password.setCustomValidity("Invalid")
   }
}

function checkConfirmPw(confirm_pw) {
   let password = document.getElementById("password")
   if (password_regex.test(confirm_pw.value) && confirm_pw.value == password.value) {
      confirm_pw.setCustomValidity("")
   }
   else {
      confirm_pw.setCustomValidity("Invalid")
   } if (password_regex.test(password.value)) {
      password.setCustomValidity("")
   }
   else {
      password.setCustomValidity("Invalid")
   }
}


function checkEmail(email) {
   if (email_regex.test(email.value)) {
      email.setCustomValidity("")
   }
   else {
      email.setCustomValidity("Invalid")
   }
}