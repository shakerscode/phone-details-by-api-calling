

const searchBtn = () =>{
    
    const searchText = document.getElementById('search-fild').value.toLowerCase();
     
    if(searchText === '' ){
        document.getElementById('empty-error').style.display = 'block';
    }
    else{
            document.getElementById('empty-error').style.display = 'block';
       
            const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
        .then(res => res.json())
        .then(data => showPhonesData(data.data));
        document.getElementById('empty-error').style.display = 'none';
        document.getElementById('spinner-box').style.display = 'block';
        
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
                <button onclick="fullDetails('${data.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Full Details</button>
                </div>
            </div>
        `;
        detailsBox.appendChild(div);
        
    });
}


//getting full details data
const fullDetails = getPhoneInfo =>{
    const url =` https://openapi.programming-hero.com/api/phone/${getPhoneInfo}`
    fetch(url)
    .then(res => res.json())
    .then(data => showingFullData(data.data))

    // const detailsBox = document.getElementById('full-details').style.display = 'block';
}
//showing full details 
const showingFullData = showPhoneInfo =>{
    
        const {sensors} = showPhoneInfo.mainFeatures;
        
        const {name, image, releaseDate, others} = showPhoneInfo;

        const modalImg = document.getElementById('modal-img');
         modalImg.setAttribute('src', `${image}`);

         const modalDetails = document.getElementById('modal-details');

        modalDetails.textContent = '';
        
         
        modalDetails.innerHTML = `
        
            <h3 class="mt-2 text-center">Name: ${name}</h3> 
            <h5 class="mt-2 text-center">Release Date: ${releaseDate ? releaseDate : 'Not Found'}</h5>
            <div>Sensors:<p id="sensor-details"></p></div>
            <div><b>Other Details:</b> <p id="others-details"></p></div>

        `;
      
        for(const sensor of sensors){
            const sensorId = document.getElementById('sensor-details');
            const p = document.createElement('p');
            p.innerText = `Sensors name: ${sensor}`;
            sensorId.appendChild(p);
        }
        for (const other in others){
             const otherDetails = document.getElementById('others-details');
             const p = document.createElement('p');
             p.innerText = `
                    Others Details: ${other};
             `;
             otherDetails.appendChild(p);
        }

       

        
        
}






