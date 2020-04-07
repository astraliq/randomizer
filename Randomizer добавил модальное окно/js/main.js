var modal = document.getElementById('myModal');

var btn = document.getElementById("modal-btn");

btn.onclick = function () {
    modal.style.display = "block";
}

window.onclick = function (event) {
    if (event.target == this.modal) {
        this.modal.style.display = "none";
    }
}