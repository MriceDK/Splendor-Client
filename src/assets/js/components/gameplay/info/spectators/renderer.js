function renderSpectators(spectators) {
    if (spectators.length > 0) {
        document.querySelector("#spectator-count").textContent = spectators.length;
        const spectatorList = document.querySelector("#spectator-names");
        spectatorList.innerHTML = "";
        spectators.forEach(spectator => {
            spectatorList.insertAdjacentHTML("beforeend", `<li class="spectator">${spectator}</li>`);
        });
    } else {
        document.querySelector("#spectator-count").textContent = "0";
    }
}

export {renderSpectators};