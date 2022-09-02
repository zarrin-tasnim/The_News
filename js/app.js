
const loadNews = async () => {
    const url = ` https://openapi.programming-hero.com/api/news/categories`;

    const res = await fetch(url);

    const data = await res.json();

    displayNews(data.data.news_category);



}
const displayNews = (news) => {


    news.forEach(element => {


        const newsCategoryContainer = document.getElementById('news-catagory-container');
        const newsList = document.createElement('a');
        newsList.classList.add('nav-link');
        newsList.innerHTML = `
        
            <a class="nav-link" href="#">${element.category_name}</a>
        `;
        newsCategoryContainer.appendChild(newsList);
    });


}

loadNews();