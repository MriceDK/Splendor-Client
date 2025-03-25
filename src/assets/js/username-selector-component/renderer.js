function changeUsernameText(){

    const username = JSON.parse(localStorage.getItem("myUsername")); 
    document.querySelector("#username").innerText = username;



}

export { changeUsernameText }