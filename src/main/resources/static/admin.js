const url = 'http://localhost:8080/api/users/';
const urlRoles = 'http://localhost:8080/api/roles/';
const container = document.querySelector('.usersTbody');
const newUserForm = document.getElementById('newUserForm');
const editUserForm = document.getElementById('editUserForm');
const deleteUserForm = document.getElementById('deleteUserForm');
const btnCreate = document.getElementById('new-user-tab');
const newRoles = document.getElementById('newRoles');
let result = '';

var editUserModal = new bootstrap.Modal(document.getElementById('editUserModal'));
var deleteUserModal = new bootstrap.Modal(document.getElementById('deleteUserModal'));
const editId = document.getElementById('editId');
const editName = document.getElementById('editName');
const editSurname = document.getElementById('editSurname');
const editAge = document.getElementById('editAge');
const editCity = document.getElementById('editCity');
const editUsername = document.getElementById('editUsername');
const editPassword = document.getElementById('editPassword');
const editRoles = document.getElementById('editRoles');

const delId = document.getElementById('delId');
const delName = document.getElementById('delName');
const delSurname = document.getElementById('delSurname');
const delAge = document.getElementById('delAge');
const delCity = document.getElementById('delCity');
const delUsername = document.getElementById('delUsername');
const delRoles = document.getElementById('delRoles');

const newName = document.getElementById('newName');
const newSurname = document.getElementById('newSurname');
const newAge = document.getElementById('newAge');
const newCity = document.getElementById('newCity');
const newUsername = document.getElementById('newUsername');
const newPassword = document.getElementById('newPassword');

let rolesArr = [];

const renderUsers = (users) => {
    users.forEach(user => {
        let roles = '';
        user.roles.forEach(
            role => {
                r = role.name.substring(5);
                roles += r + ' ';
            }
        );
        result += `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.surname}</td>
                <td>${user.age}</td>
                <td>${user.city}</td>
                <td>${user.username}</td>
                <td>
                 ${roles}
                </td>
                <td><a class="btnEdit btn btn-sm btn-info text-white">Edit</a></td>
                <td><a class="btnDelete btn btn-danger btn-sm">Delete</a></td>
            </tr>
            `
    })
    container.innerHTML = result;
}

const renderRoles = (roles) => {
    rolesOptions = '';
    roles.forEach(role => {
        rolesOptions += `
            <option value = ${role.id}>${role.name.substring(5)}</option>
            `
        rolesArr.push(role);
    })
    newRoles.innerHTML = rolesOptions;
    editRoles.innerHTML = rolesOptions;
    delRoles.innerHTML = rolesOptions;
}


fetch(url)
    .then(res => res.json())
    .then(data => renderUsers(data))
    .catch(error => console.log(error));

var allRoles;

fetch(urlRoles)
    .then(res => res.json())
    .then(data => {
        allRoles = data;
        renderRoles(allRoles)
    });


const refreshListOfUsers = () => {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            result = '';
            renderUsers(data)
        })
}

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}



on(document, 'click', '.btnDelete', e => {
    const row = e.target.parentNode.parentNode;
    idForm = row.children[0].innerHTML;
    const nameForm = row.children[1].innerHTML;
    const surnameForm = row.children[2].innerHTML;
    const ageForm = row.children[3].innerHTML;
    const cityForm = row.children[4].innerHTML;
    const usernameForm = row.children[5].innerHTML;

    delId.value = idForm;
    delName.value = nameForm;
    delSurname.value = surnameForm;
    delAge.value = ageForm;
    delCity.value = cityForm;
    delUsername.value = usernameForm;
    deleteUserModal.show();
})



let idForm = 0;
on(document, 'click', '.btnEdit', e => {
    const row = e.target.parentNode.parentNode;
    idForm = row.children[0].innerHTML;
    const nameForm = row.children[1].innerHTML;
    const surnameForm = row.children[2].innerHTML;
    const ageForm = row.children[3].innerHTML;
    const cityForm = row.children[4].innerHTML;
    const usernameForm = row.children[5].innerHTML;

    editId.value = idForm;
    editName.value = nameForm;
    editSurname.value = surnameForm;
    editAge.value = ageForm;
    editCity.value = cityForm;
    editUsername.value = usernameForm;
    editPassword.value = ''
    editRoles.options.selectedIndex = -1;
    editUserModal.show();

})



btnCreate.addEventListener('click', () => {
    newName.value = ''
    newSurname.value = '';
    newAge.value = '';
    newCity.value = '';
    newUsername.value = '';
    newPassword.value = ''
    newRoles.options.selectedIndex = -1;
});




deleteUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(url + delId.value, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
    })
        .then(res => res.json())
        .catch(err => console.log(err))
        .then(refreshListOfUsers);
    deleteUserModal.hide();
});



newUserForm.addEventListener('submit', (e) => {
    let rolesJ = [];
    e.preventDefault();
    const selectedOpts = [...newRoles.options]
        .filter(x => x.selected)
        .map(x => x.value);

    selectedOpts.forEach(
        role => {
            rolesJ.push(rolesArr[role - 1])
        }
    );

    const fetchFunction = async () => {
        const fetchedData = await
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: newName.value,
                    surname: newSurname.value,
                    age: newAge.value,
                    city: newCity.value,
                    username: newUsername.value,
                    password: newPassword.value,
                    roles: rolesJ
                })
            });

        if (!fetchedData.ok) {
            fetchedData.json()
                .then(data => alert(data.message))
        }
        return fetchedData;
    }

    fetchFunction()
        .then(response => response.json())
        .catch(err => console.log(err))
        .then(refreshListOfUsers);
    const navtab1 = document.getElementById('all-users-tab');
    const navtab2 = document.getElementById('new-user-tab');
    const tab1 = document.getElementById('all-users');
    const tab2 = document.getElementById('new-user');

    navtab1.setAttribute("class", "nav-link active");
    navtab2.setAttribute("class", "nav-link");
    tab1.setAttribute("class", "tab-pane fade active show");
    tab2.setAttribute("class", "tab-pane fade");

})



editUserForm.addEventListener('submit', (e) => {
    let rolesJ = [];
    e.preventDefault();
    const selectedOpts = [...editRoles.options]
        .filter(x => x.selected)
        .map(x => x.value);

    selectedOpts.forEach(
        role => {
            rolesJ.push(rolesArr[role - 1])
        }
    );

    const fetchFunction = async () => {
        const fetchedData = await fetch(url + idForm, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: editId.value,
                name: editName.value,
                surname: editSurname.value,
                age: editAge.value,
                city: editCity.value,
                username: editUsername.value,
                password: editPassword.value,
                roles: rolesJ
            })
        });

        if (!fetchedData.ok) {
            fetchedData.json()
                .then(data => alert(data.message))
        }
        return fetchedData;
    }
    fetchFunction()
        .then(response => response.json)
        .then(refreshListOfUsers)
    editUserModal.hide();
})