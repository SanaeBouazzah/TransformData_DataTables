$(document).ready(function() {
    const userTable = $('#datatables').DataTable({
        ajax: {
            url: '/users',
            method: 'POST',
            dataSrc: 'users'
        },
        columns: [
            { data: 'nom' },
            { data: 'prenom' },
            { data: 'username' },
            { data: 'password' },
            { data: 'position' },
            { data: 'adresse' },
            { data: 'Tel1' },
            { data: 'Tel2' },
            {
                data: null,
                render: function(data, type, row) {
                    return '<button class="edit">Edit</button>';
                }
            }
        ]
    });

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
        };

        $.ajax({
            url: '/users',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(userData),
            success: function(response) {
                userTable.ajax.reload(); 
                $('#userForm')[0].reset(); 
                console.log(response);
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
            }
        });
    });
});