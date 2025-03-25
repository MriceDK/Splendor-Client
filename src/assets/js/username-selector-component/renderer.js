function changeUsernameText(){
    const username = JSON.parse(localStorage.getItem("myUsername"));
    const usernameElement = document.querySelector("#username")
    usernameElement.innerText = username;


}

export { changeUsernameText }