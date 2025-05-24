function renderSpectators(spectators) {
    const spectatorList = document.querySelector("#spectator-names");

    if (spectators.length > 0) {
        document.querySelector("#spectator-count").textContent = spectators.length;
        spectatorList.innerHTML = "";
        spectators.forEach(spectator => {
            spectatorList.insertAdjacentHTML("beforeend", `<li class="spectator">${spectator}</li>`);
        });
    } else {
        document.querySelector("#spectator-count").textContent = "0";
        spectatorList.innerHTML = "<li class='spectator'>No spectators</li>";
    }
}

export {renderSpectators};