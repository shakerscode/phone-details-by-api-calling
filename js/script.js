//Error style
const emptyError = document.getElementById('empty-error').style.display = 'none';
//details box hiding stytle
const detailsBox = document.getElementById('full-details').style.display = 'none';
//Spinners style
const spinners = document.getElementById('spinner-box').style.display = 'none';



const searchBtn = () =>{
    
    
    const searchText = document.getElementById('search-fild').value.toLowerCase();
    if(searchText == ''){
        const emptyError = document.getElementById('empty-error').style.display = 'block';
    }
    else{
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
        .then(res => res.json())
        .then(data => showPhonesData(data.data));
        const emptyError = document.getElementById('empty-error').style.display = 'none';
        const spinners = document.getElementById('spinner-box').style.display = 'block';
    }
}

const showPhonesData = datas =>{
    const spinners = document.getElementById('spinner-box').style.display = 'none';
    const detailsBox = document.getElementById('details-card');
    detailsBox.textContent = '';
    datas.forEach(data => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card text-center">
                <img src="${data.image}" class="card-img-top img-fluid" alt="..." height="300px">
                <div class="card-body">
                <h5 class="card-title">Brand: ${data.brand}</h5>
                <h5 class="card-title">Name: ${data.phone_name}</h5>
                <button onclick="fullDetails('${data.slug}')" type="button" class="btn btn-primary">Full Details</button>
                </div>
            </div>
        `;
        detailsBox.appendChild(div);
        
    });
}


//full details showing section
const fullDetails = phoneInfo =>{
    const url =` https://openapi.programming-hero.com/api/phone/${phoneInfo}`
    fetch(url)
    .then(res => res.json())
    .then(data => console.log(data.data.brand))


    // const detailsBox = document.getElementById('full-details').style.display = 'block';


}

//Full details closing button section
const closeByX = () =>{
    const detailsBox = document.getElementById('full-details').style.display = 'none';
}
const closeByBtn = () => {
    const detailsBox = document.getElementById('full-details').style.display = 'none';
}