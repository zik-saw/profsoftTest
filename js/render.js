var actions = '<td data-field="actions">' +
        '<a class="add" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>'+
        '<a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>' +
        '<a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>' +
        '</td>';

function renderTable()
{
    var table = "";
    //Запрашиваются данные из backend
    //Требуемые данныз из backend - { id : string, name : string, typeUser: string, numberUser: string}
    // $.ajax({
    //     type: 'POST',
    //     //url: 'https://text/getUsers',
    //     contentType: 'application/json; charset=utf-8',
    //     dataType: 'json',
    //     cache: false,
    //     success: function(data) {  listUsers = JSON.parse(data.users)  },
    //     error: function(data) { },
    // });
    for(var i = 0; i < listUsers.length; i++)
    {
        table += '<tr>' +
            '<td data-field="id">'+listUsers[i].id+'</td>' +
            '<td data-field="name">'+listUsers[i].name+'</td>' +
            '<td data-field="typeUser" title="'+listTypeUsers[listUsers[i].typeUser].long+'" data-type-user="'+listUsers[i].typeUser+'">'+listTypeUsers[listUsers[i].typeUser].short+'</td>' +
            '<td data-field="numberUser">'+listUsers[i].numberUser+'</td>'+
            actions+
            '</tr>';
    }
    $('table.table-bordered tbody').html(table);

}

function createSelect()
{
    return '<select class="form-control"><option value = "-1">Не указан</option><option value="0">Физическое лицо</option><option value="1">Юридическое лицо</option></select>';
}
