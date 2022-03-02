
//Made button clickable and load data via API
const searchBtn = () =>{
        const searchText = document.getElementById('search-fild').value.toLowerCase();

    if(searchText === '' ){
        document.getElementById('empty-error').style.display = 'block';
    }
    else if(!isNaN(searchText)){
        document.getElementById('empty-error').style.display = 'block';
        const detailsBox = document.getElementById('details-card');
        detailsBox.textContent = '';
    }
    else{
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
        .then(res => res.json())
        .then(data => showPhonesData(data.data))
        document.getElementById('empty-error').style.display = 'none';
        document.getElementById('spinner-box').style.display = 'block'; 
          
    }
    
}

//getting all the data and shown them in the UI
const showPhonesData = datas =>{
    const detailsBox = document.getElementById('details-card');
     if(datas.length === 0){
        document.getElementById('invalid-error').style.display = 'block';
        detailsBox.textContent = '';
        document.getElementById('spinner-box').style.display = 'none';
     }
    else{
    const data = datas.slice(0, 20);
    document.getElementById('spinner-box').style.display = 'none';
    document.getElementById('invalid-error').style.display = 'none';
    detailsBox.textContent = '';
    data.forEach(data => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card rounded-3 border-0 text-center">
                 <img src="${data.image}" class="card-img-top mt-2 w-75 h-auto mx-auto img-fluid" alt="..." >
                 <div class="card-body">
                 <h5 class="card-title">Brand: ${data.brand}</h5>
                 <h5 class="card-title">Name: ${data.phone_name}</h5>
                 <button onclick="fullDetails('${data.slug}')" type="button" class="btn btn-primary"       data-bs-toggle="modal" data-bs-target="#staticBackdrop">Full Details</button>
                 </div>
             </div>
            `;
        detailsBox.appendChild(div);
        
    });
    }
}


//getting full details data vaia API 
const fullDetails = getPhoneInfo =>{
        const url =` https://openapi.programming-hero.com/api/phone/${getPhoneInfo}`
        fetch(url)
        .then(res => res.json())
        .then(data => showingFullData(data.data))
}

        //showing full details in a modal
        const showingFullData = showPhoneInfo =>{
    
        //distructuring
        const {storage, displaySize, chipSet, memory, sensors} = showPhoneInfo.mainFeatures;
        const {name, image, releaseDate, others} = showPhoneInfo;

        const modalImg = document.getElementById('modal-img');
        modalImg.setAttribute('src', `${image}`);

        const modalDetails = document.getElementById('modal-details');
        modalDetails.textContent = '';
        modalDetails.innerHTML = `
        
            <h3 class="mt-2  ">${name}</h3> 
            <h5 class="">Release Date: ${releaseDate ? releaseDate : 'Not Found'}</h5>
            <p><b>Storage: </b>${storage}</p> 
            <p><b>Display Size:</b> ${displaySize}</p>
            <p><b>Chipset: </b>${chipSet}</p> 
            <p><b><p>Memory: </b>${memory}</p>
            <div><b>Sensors:</b><p id="sensor-details"></p></div>
            <div><b>Other Details:</b> <p id="others-details"></p></div>

        `;

        //for of loop for getting all the sensor data
      
        for(const sensor of sensors){
            const sensorId = document.getElementById('sensor-details');
            const p = document.createElement('p');
            p.innerText = `${sensor}: Available`;
            sensorId.appendChild(p);
        }

        //for in loop for getting all the sensor data

        for (const other in others){
             const otherDetails = document.getElementById('others-details');
             const p = document.createElement('p');
             p.innerText = `
                    ${other} : Available.
             `;
             otherDetails.appendChild(p);
        }     
}
