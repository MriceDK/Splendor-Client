function changeUsernameText(){
    const username = JSON.parse(localStorage.getItem("myUsername"));
    const usernameElement = document.querySelector("#username")
    usernameElement.innerHTML = username;


}

export { changeUsernameText }