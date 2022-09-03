
const loadNews = async (id, categoryName) => {
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
        
            <a id="categoryName" class="nav-link" href="#" onclick="loadNewsDEtails(${element.category_id})">${element.category_name}</a>
        `;
        newsCategoryContainer.appendChild(newsList);
    });


}

//clicking news category show details
const loadNewsDEtails = async (id) => {
    try {

        toggleSpinner(true);
        const url = `https://openapi.programming-hero.com/api/news/category/0${id}`;

        const res = await fetch(url);
        const data = await res.json();
        displayNewsDetails(data.data);

    }
    catch (error) {
        console.log(error);
    }


}

const displayNewsDetails = (newsDetails) => {



    const categoryName = document.getElementById('categoryName');
    const categoryNameText = categoryName.innerText;
    const categoryDetailsContainer = document.getElementById('card-container');
    categoryDetailsContainer.textContent = '';

    // number of news in a category will show here

    const numberOfCategoryFound = document.getElementById('numberOfCategory');
    numberOfCategoryFound.innerHTML = `
        <h4> ${newsDetails.length} items found for category Entertainment </h4>
    `;


    newsDetails.sort(function (a, b) { return b.total_view - a.total_view });
    newsDetails.forEach(element => {

        // console.log(element);

        const card = document.createElement('div');

        card.innerHTML = `
            <div class="card mb-3 rounded" style="max-width: 800px;">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="${element.thumbnail_url}" class="img-fluid rounded" alt="...">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">${element.title ? element.title : 'No Title'}</h5>
                                    <p class="card-text text-muted"
                                        style="max-width: 290px;">${element.details.length > 100 ? element.details.slice(0, 100) + '...' : element.details}
                                        </p>
                                    <div class="row d-flex justify-content-between align-items-center p-2 mt-3">
                                        <div class="col-md-5 col-sm-12 d-flex justify-content-start align-items-center">
                                            <img src="${element.author.img ? element.author.img : 'No images'}" class="rounded-circle me-2" alt="..." style="width: 50px;">
                                            <h6 id="author'sName">${element.author.name ? element.author.name : 'No name'}</h6>
                                        </div>
                                        <div class="col-md-3 col-sm-6  d-flex justify-content-center align-items-center ">
                                            <i class="fa-regular fa-eye p-1"></i>
                                            <h6 id="viewarsNUmber" class="p-2 mt-1">${element.total_view ? element.total_view : 'No views'}</h6>
                                        </div>
                                         <div class="col-md-4 col-sm-6  d-flex justify-content-center align-items-center ">
                                         <button onclick ="loadNewsDEtailsModal('${element._id}')" href="#" class="btn btn-white" data-bs-toggle="modal" data-bs-target="#showDetailsModal">   <i class="fa-sharp fa-solid fa-arrow-right text-success"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        `;
        categoryDetailsContainer.appendChild(card);

    });
    toggleSpinner(false);

}

//clicking news icon show details modal starts here
const loadNewsDEtailsModal = async (id) => {
    try {

        const url = ` https://openapi.programming-hero.com/api/news/${id} `;
        const res = await fetch(url);
        const data = await res.json();
        displayNewsDetailsModal(data.data[0]);

    }
    catch (error) {
        console.log(error);
    }


}

const displayNewsDetailsModal = (newsDetails) => {

    console.log(newsDetails);

    const modalTitle = document.getElementById('showDetailsModalLabel');
    modalTitle.innerHTML = `
        <h5 class="modal-title" >${newsDetails.title}</h5>
    `;
    const modalDetailslBody = document.getElementById('newsDetails');
    modalDetailslBody.innerHTML = `
        <div class="card mb-3 rounded" style="max-width: 800px;">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="${newsDetails.thumbnail_url}" class="img-fluid rounded" alt="...">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <p class="card-text text-muted"
                                        style="max-width: 290px;">${newsDetails.details}
                                        </p>
                                    <div class="row d-flex justify-content-between align-items-center p-2 mt-3">
                                        <div class="col-md-12 col-sm-12 d-flex justify-content-around align-items-center">
                                            <div>
                                            <img src="${newsDetails.author.img ? newsDetails.author.img : 'No image found'}" class="rounded-circle me-2" alt="..." style="width: 60px;">
                                            </div>

                                           <div>
                                            <h6 id="author'sName" class="p-2">${newsDetails.author.name ? newsDetails.author.name : 'No author name found'}</h6>
                                            <h6 class="ms-2" id="author'sName">Published date: ${newsDetails.author.published_date ? newsDetails.author.published_date : 'No published date found'}</h6>
                                           </div>
                                        </div>
                                        <div class="col-md-12 col-sm-6  d-flex justify-content-center align-items-center ">
                                            <i class="fa-regular fa-eye p-1"></i>
                                            <h6 id="viewarsNUmber" class="p-2 mt-1">${newsDetails.total_view ? newsDetails.total_view : 'No views'}</h6>
                                        </div>
                                        <div class="col-md-12 col-sm-6  d-flex justify-content-center align-items-center ">
                                            <h6 id="" class="p-2 mt-1">Authors rating : ${newsDetails.rating.number ? newsDetails.rating.number : 'No ratings'}</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    `;

}
//clicking news icon show details modal starts here

//for spninner
const toggleSpinner = isLoading => {
    const spinnerSection = document.getElementById('loader');

    if (isLoading) {

        spinnerSection.classList.remove('d-none');

    }
    else {
        spinnerSection.classList.add('d-none');
    }
}

loadNews();
loadNewsDEtails(01);