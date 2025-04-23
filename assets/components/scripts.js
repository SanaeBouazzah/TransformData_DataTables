window.addEventListener('DOMContentLoaded', event => {
    var myModal = document.getElementById('myModal');
    if (myModal) {
        myModal.addEventListener('shown.bs.modal', function () {
            myInput.focus();
        });
    }

});





