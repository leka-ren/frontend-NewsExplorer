class ArticleCard {
  constructor() {}
  _createCard() {
    const card = `
    <div class="resoult__card">
        <div class="resoult__card-save-content">
            <p class="resoult__card-alert-text">Войдите, чтобы сохранять статьи</p>
            <button class="resoult__card-save-button">
                <img class="resoult__card-svg-save" src="<%=require('./images/save.svg')%>"
                alt="кнопка сохранения статьи">
            </button>
        </div>
        <a href="https://lentach.media/" target="_blank">
            <img class="resoult__card-image" src="<%=require('./images/card.jpg')%>"
                alt="Новостное изображение">
            <div class="resoult__card-text-content">
                <p class="resoult__card-data">2 августа, 2019</p>
                <h3 class="resoult__card-title">Национальное достояние – парки</h3>
                <!-- При рендере карточек через js, тег р будет заменен на article, если понадобится -->
                <p class="resoult__card-text">В 2016 году Америка отмечала важный юбилей: сто
                    лет
                    назад
                    здесь
                    начала складываться система национальных парков – охраняемых территорий, где
                    и
                    сегодня
                    каждый может приобщиться к природе.</p>
                <p class="resoult__card-resourse">Лента.ру</p>
            </div>
        </a>
    </div>
    `;
    return card;
  }
}
