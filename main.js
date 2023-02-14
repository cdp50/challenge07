function convertToJson(response){
    if(response.ok){
        return response.json();
    }
    else{
        throw new Error("bad response");
    }
}

async function getData(url, callback){
    const data = await fetch(url);
    const json = await convertToJson(data);
    console.log(json)
    if(callback){
        callback(json);
    }
}

window.addEventListener("load", () =>{
    getData("https://api.inaturalist.org/v1/observations?photos=true&sounds=true&per_page=100&order=desc&order_by=species_guess", renderTypeList);

    document.getElementById("typeList");
});

function renderTypeList(list){
    
    const element = document.getElementById("typeList");
    const cleanList = cleanTypeList(list.results);
    for (let i = 0; i < cleanList.length; i++) {
    // console.log(cleanList[0][0]);
    const audio = new Audio(cleanList[i][2]);
    const li = document.createElement("li");
    li.setAttribute("class", "li_element");
    li.addEventListener("click", () => { audio.play()});
    const img = document.createElement("img");
    img.src = cleanList[i][0];
    img.setAttribute("alt", "photo");
    img.setAttribute("class", "resize");
    li.appendChild(img);
    element.appendChild(li);
    const name = document.createElement("h3");
    name.innerHTML = cleanList[i][1];
    li.appendChild(name);
    }
}


function cleanTypeList(list){
    const cleanList = [];
    const name = [];

    for (let i = 0; i < list.length; i++) {
        if(list[i].taxon.preferred_common_name != null && list[i].taxon.preferred_common_name != undefined && list[i].sounds[0].file_url != null && list[i].sounds[0].file_url != undefined && !name.includes(list[i].taxon.preferred_common_name) ) {
            cleanList.push([list[i].taxon.default_photo.url, list[i].taxon.preferred_common_name, list[i].sounds[0].file_url]);
            name.push(list[i].taxon.preferred_common_name);
        }
    }
    console.log(cleanList);
    return cleanList;
}

965110115


// object/results/[0]/taxon/default_photo/medium_url: (the url of the photo)
// object/results/[0]/taxon/preferred_common_name: (the name of the animal in the image)
// object/results/sounds/file_url