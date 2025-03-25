function changeUsername(e){
    e.preventDefault();


    
    const $usernameForm = document.querySelector("#username-text")
    
    

    localStorage.setItem("myUsername", JSON.stringify($usernameForm.value));

}

export { changeUsername }