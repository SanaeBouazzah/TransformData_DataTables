$(document).ready(function (){
    $('#submitUser').click(function() {
        const userData = {
            nom: $('#nom').val(),
            prenom: $('#prenom').val(),
            username: $('#username').val(),
            password: $('#password').val(),
            position: $('#position').val(),
            adresse: $('#adresse').val(),
            Tel1: $('#Tel1').val(),
            Tel2: $('#Tel2').val(),
            roles: ['ROLE_USER'],
            DateCreation: new Date().toISOString(),
        };
    
        // console.log('User Data:', userData); 
        $.ajax({
            url: Routing.generate('app_user_new'), 
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(userData),
            success: function(response) {
                console.log('Success:', response.message);
                $('#userForm')[0].reset(); 
                toastr.success('User created successfully!');
            },
        });
    });

    //var table = $('#user-datatable').DataTable({});

    window.addEventListener('DOMContentLoaded', event => {
        // Simple-DataTables
        // https://github.com/fiduswriter/Simple-DataTables/wiki
    
        const datatablesSimple = document.getElementById('datatablesSimple');
        if (datatablesSimple) {
            new simpleDatatables.DataTable(datatablesSimple);
        }
    });
})