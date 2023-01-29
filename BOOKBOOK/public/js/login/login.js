let form = document.getElementById("login-form")
let username = document.getElementById("username")
let password = document.getElementById("password")
let error_un = document.getElementById("errorUn")
let error_pw = document.getElementById("errorPw")

const username_regex = /^(?!\d)(\w){6,}$/
const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/


if (error_un.innerText != "") {
   alert(error_un.innerText)
}
if (error_pw.innerText != "") {
   alert(error_pw.innerText)
}


let inputs = document.querySelectorAll("input")
inputs.forEach((input) => {
   input.addEventListener("input", () => {
      switch(input.name) {
         case "username":
            checkUsername(input)
            break
         case "password":
            checkPassword(input)
            break
      }
   })
})

   
form.addEventListener('submit', function (event) {

   if (!form.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
   }

   form.classList.add('was-validated')
}, false)


function checkUsername(username) {
   if (username_regex.test(username.value)) {
      username.setCustomValidity("")
   }
   else {
      username.setCustomValidity("Invalid")
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