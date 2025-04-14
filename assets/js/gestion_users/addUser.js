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
            nom: $('#nom').val(data.nom),
            prenom: $('#prenom').val(data.prenom),
            username: $('#username').val(data.username),
            password: $('#password').val(data.password),
            position: $('#position').val(data.position),
            adresse: $('#adresse').val(data.adresse),
            Tel1: $('#Tel1').val(data.Tel1),
            Tel2: $('#Tel2').val(data.Tel2),
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