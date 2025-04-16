document.addEventListener('DOMContentLoaded', function () {
    var myModal = document.getElementById('myModal');
    if (myModal) {
        myModal.addEventListener('shown.bs.modal', function () {
            myInput.focus();
        });
    }
});