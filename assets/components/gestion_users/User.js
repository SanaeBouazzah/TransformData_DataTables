// Client Side 
// $(document).ready(function () {
//     const table = $('#datatablesSimple').DataTable();
//     $('#submitUser').click(function () {
//         const userData = {
//             nom: $('#nom').val(),
//             prenom: $('#prenom').val(),
//             username: $('#username').val(),
//             password: $('#password').val(),
//             position: $('#position').val(),
//             adresse: $('#adresse').val(),
//             Tel1: $('#Tel1').val(),
//             Tel2: $('#Tel2').val(),
//             roles: assignRoles(),
//             DateCreation: new Date().toISOString(),
//         };
//         $.ajax({
//             url: Routing.generate('app_user_new'),
//             method: 'POST',
//             contentType: 'application/json',
//             data: JSON.stringify(userData),
//             success: function (response) {
//                 toastr.success("User Created successfully", "success");
//                 table.clear().destroy();
//                 $('#datatablesSimple tbody').html(response.html);
//                 $('#datatablesSimple').DataTable();
//                 $('#exampleModal').modal('hide');
//                 $('#exampleModal input').val('');
//             },
//             error: function (xhr, status, error) {
//                 toastr.error("Failed to create user", "Error");
//                 console.error('Error creating user:', error);
//             }
//         });
//     });

//     function assignRoles() {
//         return ['ROLE_USER'];
//     }

//     function openEditModal(userId) {
//         $.ajax({
//             url: Routing.generate('app_user_get', { id: userId }),
//             method: 'GET',
//             success: function (response) {
//                 const user = response.data;

//                 $('#EditModal #edit_prenom').val(user.prenom);
//                 $('#EditModal #edit_nom').val(user.nom);
//                 $('#EditModal #edit_username').val(user.username);
//                 $('#EditModal #edit_password').val(user.username);
//                 $('#EditModal #edit_position').val(user.position);
//                 $('#EditModal #edit_adresse').val(user.adresse);
//                 $('#EditModal #edit_Tel1').val(user.Tel1);
//                 $('#EditModal #edit_Tel2').val(user.Tel2);
//             },
//             error: function () {
//                 toastr.error("Failed to get user", "Error");
//             }
//         });

//         $('#submitEditBtn').click(function () {
//             const updateData = {
//                 nom: $('#edit_nom').val(),
//                 prenom: $('#edit_prenom').val(),
//                 username: $('#edit_username').val(),
//                 password: $('#edit_password').val(),
//                 position: $('#edit_position').val(),
//                 adresse: $('#edit_adresse').val(),
//                 Tel1: $('#edit_Tel1').val(),
//                 Tel2: $('#edit_Tel2').val(),
//             }
//             $.ajax({
//                 url: Routing.generate('app_user_edit', { id: userId }),
//                 method: 'POST',
//                 contentType: 'application/json',
//                 data: JSON.stringify(updateData),
//                 success: function (response) {
//                     toastr.success("User Updated successfully", "success");
//                     const table = $('#datatablesSimple').DataTable();
//                     table.clear().destroy();
//                     $('#datatablesSimple tbody').html(response.html);
//                     $('#datatablesSimple').DataTable();
//                     $('#EditModal').modal('hide');
//                     $('#EditModal').modal('hide');
//                 },
//                 error: function (xhr, status, error) {
//                     toastr.error("Failed to Update user", "Error");
//                     console.error('Error Updated user:', error);
//                 }
//             })
//         })
//     }
//     window.openEditModal = openEditModal;

//     $(document).on('click', '.SupprimerBtn', function () {
//         const userId = $(this).data('user-id');
//         $.ajax({
//             url: '/users/' + userId + '/delete',
//             method: 'POST',
//             success: function (response) {
//                 if (response.success) {
//                     const table = $('#datatablesSimple').DataTable();
//                     table.rows().every(function () {
//                         const rowData = this.data();
//                         if (rowData[0] == userId) {
//                             this.remove();
//                         }
//                     });
//                     table.draw();
//                     toastr.success("User deleted successfully");
//                 }
//             },
//             error: function (xhr, status, error) {
//                 toastr.error("Failed to delete user");
//                 console.error("Error response:", error);
//             }
//         });
//     });


// });


// Server  Side
document.addEventListener("DOMContentLoaded", function () {
    var table = $('#datatablesSimple').DataTable({
        processing: true,
        serverSide: true,
        ajax: {
            url: Routing.generate('app_user_list'),
            data: function (d) {
                d.draw = d.draw || 0;
                d.start = d.start || 0;
                d.length = d.length || 15;
            }
        },
        order: [[0, 'asc']],
        columns: [
            { name: 'u.id', data: 'id', orderable: true, searchable: true },
            { name: 'u.nom', data: 'nom', orderable: true, searchable: true },
            { name: 'u.prenom', data: 'prenom', orderable: true, searchable: true },
            { name: 'u.username', data: 'username', orderable: true, searchable: true },
            {
                name: 'u.roles',
                data: 'roles',
                orderable: false,
                searchable: false,
                render: function (data) {
                    const roleLabels = {
                        'ROLE_USER': 'User',
                        'ROLE_ADMIN': 'Admin',
                        'ROLE_SUPERADMIN': 'SuperAdmin'
                    };
                    const readableRoles = data.map(role => roleLabels[role] || role);
                    return readableRoles.join(', ') || 'No Role';
                }
            },
            { name: 'u.position', data: 'position', orderable: true, searchable: true },
            { name: 'u.adresse', data: 'adresse', orderable: true, searchable: true },
            { name: 'u.Tel1', data: 'Tel1', orderable: true, searchable: true },
            { name: 'u.Tel2', data: 'Tel2', orderable: true, searchable: true },
            { name: 'u.dateCreation', data: 'dateCreation' },
            {
                name: 'Op',
                data: 'id', render: function (data, type, row) {
                    var ModifierButton = `<li><button class="dropdown-item" data-user-id="${data}" onclick="openEditModal(${data})" data-bs-toggle="modal" data-bs-target="#EditModal">Modifier</button></li>`;
                    var SupprimerButton = `<li><button class="dropdown-item SupprimerBtn" data-user-id="${data}" href="#">Supprimer</button></li>`;
                    var ConsulterButton = `<li><button class="dropdown-item" data-user-id="${data}" onclick="ShowUser(${data})">Consulter</button></li>`;
                    var dropdown = `<ul class="navbar-nav order-1 d-flex justify-content-center w-100 align-items-center">
	                                    <li class="nav-item dropdown">
                                       		<a class="nav-link dropdown-toggle d-flex align-items-center" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
		                                      	</a>
                                        	<ul class="dropdown-menu dropdown-menu-end rounded-0" aria-labelledby="navbarDropdown">
                                            ${ConsulterButton}
                                            ${ModifierButton}
                                            ${SupprimerButton}
                                            </ul></li></ul>`;
                    return dropdown;
                }
            },
        ],
    });

    $(document).on('click', '#CreateButton', function () {
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
        };

        $.ajax({
            url: Routing.generate('app_user_new'),
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(userData),
            success: function (response) {
                toastr.success("Utilisateur créé avec succès");
                $('#exampleModal').modal('hide');
                $('#exampleModal input').val('');
                $('#datatablesSimple').DataTable().ajax.reload();
            },
            error: function (xhr) {
                const errorMsg = xhr.responseJSON?.message || "Failed to create user";
                toastr.error(errorMsg);
            }
        });
    });
    function assignRoles() {
        const roles = [];
        if ($('#role_superadmin').is(':checked')) {
            $('#role_admin').prop('checked', false);
            $('#role_user').prop('checked', false);
            return ['ROLE_SUPERADMIN'];
        } else if ($('#role_admin').is(':checked')) {
            $('#role_superadmin').prop('checked', false);
            $('#role_user').prop('checked', false);
            return ['ROLE_ADMIN'];
        } else {
            $('#role_superadmin').prop('checked', false);
            $('#role_admin').prop('checked', false);
            return ['ROLE_USER'];
        }
    }

    function ShowUser(userId) {
        $.ajax({
            url: Routing.generate('app_user_show', { id: userId }),
            method: 'GET',
            success: function (response) {
                if (response && response.user) {
                    const user = response.user;
                    $('#showUserModal #user_nom').text(user.nom);
                    $('#showUserModal #user_prenom').text(user.prenom);
                    $('#showUserModal #user_username').text(user.username);
                    $('#showUserModal #user_position').text(user.position);
                    $('#showUserModal #user_adresse').text(user.adresse);
                    $('#showUserModal #user_Tel1').text(user.Tel1);
                    $('#showUserModal #user_Tel2').text(user.Tel2);
                    $('#showUserModal #user_roles').text(user.roles);
                    $('#editbtn').off('click').on('click', function () {
                        $('#showUserModal').modal('hide');
                        if (user.id) {
                            openEditModal(user.id);
                        }
                    });
                    $('#showUserModal').modal('show');
                } else {
                    toastr.error("User data not found.");
                }
                $('#showUserModal').modal('show');
            },
            error: function () {
                toastr.error('Error, Somthing Wrong!!');
            }
        })
    }
    window.ShowUser = ShowUser;
    function openEditModal(userId) {
        $.ajax({
            url: Routing.generate('app_user_get', { id: userId }),
            method: 'GET',
            success: function (response) {
                const user = response.data;

                $('#EditModal #edit_prenom').val(user.prenom);
                $('#EditModal #edit_nom').val(user.nom);
                $('#EditModal #edit_username').val(user.username);
                $('#EditModal #edit_password').val(user.username);
                $('#EditModal #edit_position').val(user.position);
                $('#EditModal #edit_adresse').val(user.adresse);
                $('#EditModal #edit_Tel1').val(user.Tel1);
                $('#EditModal #edit_Tel2').val(user.Tel2);
                $('#EditModal input[type=checkbox][id^=edit_role_]').prop('checked', false);
                if (Array.isArray(user.roles) && user.roles.length > 0) {
                    if (user.roles.includes('ROLE_SUPER_ADMIN')) {
                        $('#edit_role_superadmin').prop('checked', true);
                    } else if (user.roles.includes('ROLE_ADMIN')) {
                        $('#edit_role_admin').prop('checked', true);
                    } else if (user.roles.includes('ROLE_USER')) {
                        $('#edit_role_user').prop('checked', true);
                    }
                }
            },
            error: function () {
                toastr.error("Failed to get user", "Error");
            }
        });
        $('#EditModal').modal('show');
        $('#submitEditBtn').click(function () {
            const selectedRole = $('input[name="role"]:checked').val();
            const updateData = {
                nom: $('#edit_nom').val(),
                prenom: $('#edit_prenom').val(),
                username: $('#edit_username').val(),
                password: $('#edit_password').val(),
                position: $('#edit_position').val(),
                adresse: $('#edit_adresse').val(),
                Tel1: $('#edit_Tel1').val(),
                Tel2: $('#edit_Tel2').val(),
                roles: selectedRole ? [selectedRole] : ['ROLE_USER'],
            }
            $.ajax({
                url: Routing.generate('app_user_edit', { id: userId }),
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(updateData),
                success: function (response) {
                    toastr.success("Utilisateur mis à jour avec succès");
                    table.ajax.reload();
                    $('#EditModal').modal('hide');
                },
                error: function (xhr, status, error) {
                    toastr.error("Failed to Update user", "Error");
                    console.error('Error Updated user:', error);
                }
            })
        })
    }
    window.openEditModal = openEditModal;
    $(document).on('click', '.openEditBtn', function () {
        const userId = $(this).data('user-id');
        openEditModal(userId);
    });
    $(document).on('click', '.SupprimerBtn', function () {
        const userId = $(this).data('user-id');
        // showing message with sweet alert2
        Swal.fire({
            title: 'Êtes-vous sûr ?',
            text: "Cette action est irréversible !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Oui, supprimer',
            cancelButtonText: 'Annuler'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: '/users/' + userId + '/delete',
                    method: 'POST',
                    success: function (response) {
                        if (response.success) {
                            table.ajax.reload();
                            toastr.success("Utilisateur supprimé avec succès");
                        }
                    },
                    error: function (xhr, status, error) {
                        toastr.error("Failed to delete user");
                        console.error("Error response:", error);
                    }
                });
            }
        });
    })
});









