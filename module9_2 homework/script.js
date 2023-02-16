//Создаем функцию которая осуществляет запрос
function useRequest(url, callback) {
  //создаем экземпляр класса XMLHttpRequest
  let xhr = new XMLHttpRequest();

  //инициализируем запрос
  xhr.open('Get', url, true);

  //добавляем обработчик ответа сервера
  xhr.onload = function () {
      if (xhr.status != 200) {
          console.log('Статус ответа: ', xhr.status);
      } else {
          const result = JSON.parse(xhr.response);
          if (callback) {
              callback(result);
          }
      }
  };
  //добавляем обрабодчик ошибки
  xhr.onerror = function () {
      console.log('Ошибка! Статус ответа:', xhr.status);
  };
  //Отправляем запрос
  xhr.send();
}

//Ищем куда вставляем результат
const rezultRez = document.querySelector('.rezult-rerezult');

//Найдем кнопку для запроса
const btnRez = document.querySelector('.btn-request');

//Найдем поле ввода input
const input = document.querySelector('input');

////Функция обработки получения результат

function displayResult() {
  
  if (!Number(input.value) || Number(input.value) > 10 || Number(input.value) < 1) {
      rezultRez.innerHTML = "Число в недиапазоне от 1 до 10";
  } else {
      useRequest(`https://picsum.photos/v2/list/?limit=${parseInt(input.value)}`, (result) => {
          let cards = ``;
          result.map(item => {
              const cardBlock = `
                <div class="card">
                  <img
                    src="${item.download_url}"
                    class="card-image"
                  />
                  <p>${item.author}</p>
                </div>
              `;
              cards = cards + cardBlock;
          });
          rezultRez.innerHTML = cards;
      });
  }
};
btnRez.addEventListener('click', () => {
  displayResult()
});