const avatars = [
    "ar.jpg",
    "au.jpg",
    "be.jpg",
    "br.jpg",
    "cd.jpg",
    "ch.jpg",
    "cn.jpg",
    "de.jpg",
    "eg.jpg",
    "fr.jpg",
    "gl.jpg",
    "hk.jpg",
    "il.jpg",
    "jp.jpg",
    "mm.jpg",
    "ps.jpg",
    "ru.jpg",
    "sa.jpg",
    "tw.jpg",
    "ua.jpg",
    "un.jpg",
    "us.jpg",
    "za.jpg"
]

function renderAvatars(){
    const $container = document.querySelector("#avatar-selector-container");
    const $template = document.querySelector("#avatar-template").content.firstElementChild.cloneNode(true);
    avatars.forEach(avatar => {
        const countryCode = avatar.substring(0, 2);
        $template.querySelector("img").src = `assets/images/avatars/${avatar}`;
        $template.querySelector("img").title = `${countryCode}`;
        $template.querySelector("img").alt = `Avatar for ${countryCode}`;
        $template.addEventListener("click", e => changeAvatar(e, avatar))
        $container.insertAdjacentHTML("beforeend", $template.outerHTML);
    })

}

export { renderAvatars };