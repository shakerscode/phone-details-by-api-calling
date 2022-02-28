const emptyError = document.getElementById('empty-error').style.display = 'none';
const searchBtn = () =>{

    const searchText = document.getElementById('search-fild').value.toLowerCase();
    if(searchText == '' ){
        const emptyError = document.getElementById('empty-error').style.display = 'block';
    }
    else{
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
        .then(res => res.json())
        .then(data => showPhonesData(data.data));
        const emptyError = document.getElementById('empty-error').style.display = 'none';
       
    }
}

const showPhonesData = datas =>{
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
                <h5 class="card-title">${data.phone_name}</h5>
                <button type="button" class="btn btn-primary">Full Details</button>
                </div>
            </div>
        `;
        detailsBox.appendChild(div);
        
    });
}