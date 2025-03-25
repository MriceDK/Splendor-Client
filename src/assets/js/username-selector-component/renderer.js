function changeUsername(e){
    e.preventDefault();

    const $usernameForm = document.querySelector("#username-text")
    const $username = document.querySelector("#username");
    $username.innerText = $usernameForm.value;

}

export { changeUsername }