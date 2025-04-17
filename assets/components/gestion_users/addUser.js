$(document).ready(function () {
    const table = $('#datatablesSimple').DataTable();

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
            roles: assignRoles(),
            DateCreation: new Date().toISOString(),
        };
        $.ajax({
            url: Routing.generate('app_user_new'), 
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(userData),
            success: function(response) {
                const table = $('#datatablesSimple').DataTable();
                table.clear().destroy(); 
                $('#datatablesSimple tbody').html(response.html);
                $('#datatablesSimple').DataTable(); 
                $('#exampleModal').modal('hide');
                $('#exampleModal input').val('');
                toastr.success("User created successfully");
            },
            error: function(xhr, status, error) {
                toastr.error("Failed to create user", "Error");
                console.error('Error creating user:', error);
            }
        });
    });

    function assignRoles() {
        return ['ROLE_USER'];
    }

    console.log(Routing.generate('app_user_get', { id: 1 }));
 function openEditModal(userId) {
    $.ajax({
        url: Routing.generate('app_user_get', { id: userId }),
        method: 'GET',
        success: function(response) {
            $('#EditModal #prenom').val(response.prenom);
            $('#EditModal #nom').val(response.nom);
            $('#EditModal #username').val(response.username);
            $('#EditModal #password').val(response.username);
            $('#EditModal #position').val(response.position);
            $('#EditModal #adresse').val(response.adresse);
            $('#EditModal #Tel1').val(response.Tel1);
            $('#EditModal #Tel2').val(response.Tel2);
            $('#EditModal').modal('show');
        },
        error: function() {
            toastr.error("Erreur lors du chargement de l'utilisateur");
        }
    });
}
window.openEditModal = openEditModal;

});
