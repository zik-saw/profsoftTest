
function checkFieldName(input)
{

    if( input.val() == "")
    {
        input.addClass('field-error');
        input.after('<label class="error">Поле не должно быть пустым.</label>');
        return false;
    }

    if( input.val().length >= 255 )
    {
        input.addClass('field-error');
        input.after('<label class="error">Длина поля не должно превышать 255 символов.</label>');
        return false;
    }

    return true;

}

function checkFieldTypeUser (select)
{
    if( select.val() < 0 )
    {
        select.after('<label class="error">Нужно выбрать тип пользователя.</label>');
        return false;
    }
    return true;
}

function checkFieldNumberUser(input)
{
    if( !input.val().match(/^[0-9]+$/) )
    {
        input.after('<label class="error">Поле должно состоять только из цифр.</label>');
        return false;
    }
    if( input.val().length != 13)
    {
        input.after('<label class="error">Длина поля должна быть ровно 13 символов.</label>');
        return false;
    }
    return true;
}

function validateTable(td)
{
    var type = td.attr('data-field');
    var field = "";

    switch(type)
    {
        case "name" :
            field= td.find('input');
            field.next().remove();
            field.removeClass('field-error');
            checkFieldName(field);
            break;
        case "typeUser" :
            field = td.find('select');
            field.next().remove();
            checkFieldTypeUser(field);
            break;
        case "numberUser" :
            field= td.find('input');
            field.next().remove();
            field.removeClass('field-error');
            checkFieldNumberUser(field);
            break;
    }

}