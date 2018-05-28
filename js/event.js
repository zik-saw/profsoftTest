function addRow(result)
{
    var newID = "";
    //if(result.status)
    //{
    newID = getRandomInt();
    //newID = result.data.ID;

    $('.add-new').attr("disabled", "disabled");
    var index = $("table tbody tr:last-child").index();
    var row = '<tr>' +
        '<td data-field="id">'+newID+'</td>' +
        '<td data-field="name"><input type="text" class="form-control" name="name" id="name"></td>' +
        '<td data-field="typeUser" data-type-user = "-1">'+createSelect()+'</td>' +
        '<td data-field="numberUser"><input type="number" class="form-control" name="numberUser" ></td>' +
        actions +
        '</tr>';
    $("table").append(row);
    $("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
    $('[data-toggle="tooltip"]').tooltip();
    // }

}
function errorAddRow(result)
{
    addRow(result);
}

function deleteRow(result , button)
{
    button.parents("tr").remove();
    $(".add-new").removeAttr("disabled");
}
function errorDeleteRow(result , button)
{
    deleteRow(result , button);
}

$(document).ready( function () {
    //инициализация строки
    $(".add-new").click(function(){

        //Получение id от сервера в формате JSON {id : string}
        $.ajax({
            type: 'POST',
            //url: 'https://text/getID',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            success: addRow,
            error: errorAddRow,

        });


    });

// удаление строки
    $(document).on("click", ".delete", function(){

        var button = $(this);
        //var data = { id:  $(this).parents('tr').find('td:first-child').text()};
        //посылается id пользователя, чтобы удалить из БД в формате JSON
        $.ajax({
            type: 'POST',
            //url: 'https://text/remove',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
           // data : data,
            cache: false,
            success: function(data) { deleteRow(data , button) },
            error: function(data) { errorDeleteRow(data, button)},
        });

    });

// событие на редактирование строки
    $(document).on("click", ".edit", function(){
        $(this).parents("tr").find("td:not(:last-child):not(:first-child)").each(function(){
            if($(this).attr('data-type-user')) {
                $(this).html(createSelect);
                $(this).find('option[value="'+parseInt($(this).attr('data-type-user'))+'"]').prop("selected", true);
            }
            else
            {
                if($(this).attr('data-field') == "numberUser")
                    $(this).html('<input type="number" class="form-control" value="' + $(this).text() + '">');
                else
                    $(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
            }

        });
        $(this).parents("tr").find(".add, .edit").toggle();
        $(".add-new").attr("disabled", "disabled");
    });

// проверка на валидацию и отправка актуальных данных на сервер
    $(document).on("click", ".add", function(){
        var empty = false,
            button = $(this),
            fields = button.parents("tr").find("td:not(:last-child):not(:first-child)");
        fields.each(function(){
            validateTable($(this));
        });

        if(! button.parents("tr").find(".error").length)
        {
            var dataObjects = {};
            fields.each(function(){
                var field = $(this).find('input,select');
                dataObjects[field.parent('td').attr('data-field')] = field.val();
                if(field.is('select'))
                    field.parent("td").attr('data-type-user' , field.val()).attr('title', listTypeUsers[parseInt(field.val())].long ).html(listTypeUsers[parseInt(field.val())].short);
                else
                    field.parent("td").html(field.val());
                field.remove();
            });
            dataObjects['id'] = $(this).parents('tr').find('td:first-child').text();

            $(this).parents("tr").find(".add, .edit").toggle();
            $(".add-new").removeAttr("disabled");

            //Добавление строки, которая прошла валидацию на сервер в формате JSON
            //Формат отправляемых данных: { id : string, name : string, typeUser: string, numberUser: string}
            // $.ajax({
            //     type: 'POST',
            //     //url: 'https://text/editRow',
            //     contentType: 'application/json; charset=utf-8',
            //     dataType: 'json',
            //     //data : JSON.stringify(dataObjects),
            //     cache: false,
            //     success: function(){ editRow(button) },
            //     error: function () { errorEditRow(button) },
            //
            // });
        }


    });

//фильтр
    $(document).on('change' , '[name="filter-type-row"]' , function(){
        var valueSelect = $(this).val();
        if( valueSelect < 0 )
            $("table tbody tr").filter(function() {
                $(this).show()
            });
        else
        {
            $('table tbody tr').filter( function (value) {
                if( !$(this).find('td[data-type-user="'+parseInt(valueSelect)+'"]').length )
                    $(this).hide();
                else
                    $(this).show();
            });
        }
    })
});
