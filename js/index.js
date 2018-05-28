
var listUsers = [
    { id : 3224423 , name : "Jonh R." , typeUser : 0, numberUser: 1111111111222  },
    { id : 322442313 , name : "Виктор Иванов" , typeUser : 0, numberUser: 1111111111223  },
    { id : 32244231133 , name : "Алан Тьюринг" , typeUser : 1, numberUser: 1111111111224  },
    { id : 322442343423 , name : "Джон Сноу" , typeUser : 0, numberUser: 1111111111225  },
    { id : 325231343423 , name : "Илон Маск" , typeUser : 1, numberUser: 1111111111227  },
];

var listTypeUsers = [
  {
      long : "Физическое лицо",
      short : "Ф."
  },
  {
      long : "Юридическое лицо",
      short : "Ю."
  },
];

//создание случайного номера пользователя
function getRandomInt()
{
    var min = 10000000000000;
    var max = 20000000000000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(document).ready( function () {
    renderTable();
});

