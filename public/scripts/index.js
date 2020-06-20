// Aula 3 - 1:20:13

const buttonSearch = document.querySelector("#page-home main a");
const modal = document.querySelector("#modal");
const close = document.querySelector("#modal .header a");

buttonSearch.addEventListener("click", () => { 

    // toglle = se tem apaga se nao ele cria
    modal.classList.remove("hide");

});

close.addEventListener("click", () => {
    modal.classList.add("hide");
})