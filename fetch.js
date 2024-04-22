document.addEventListener("DOMContentLoaded", () => {
    if (window.location.search) {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const urlQuery = urlParams.get('URL');
        searchURL(urlQuery);
    } else {
        const form = document.getElementById("sendURL");
    
        if (form !== null){
            const url = document.getElementById("URL");
    
            form.addEventListener("submit", (event) => {
                event.preventDefault();
    
                if (url.value){
                    searchURL(url.value);
                }
            });
        }else{
            console.error("Form element not found.")
        }
    }
}
);

function searchURL(url){
    const urlProxy = 'https://corsproxy.io/?' + encodeURIComponent(url);
    let final = [];

    fetch(urlProxy).then(response => response.text()).then(htmlContent => {
        let imgRegex = /<img([\w\W]+?)>/g;
        let srcRegex = /src="([^"]*)"/g; 
        let extensionRegex = /\.(jpg|jpeg|png|gif)"$/i;
        let val = htmlContent.match(imgRegex);
        let srcArr = [];
        

        for (let each in val){
            let src = val[each].match(srcRegex);
            let strSrc = src.join("");
            
            if (strSrc.match(extensionRegex) && strSrc.match(/\.com/i)){
                srcArr.push(strSrc);
            }
        }

        let https = srcArr.map(image => image.match(/src="https:\/\//i));
        let slash = srcArr.map(image => image.match(/src="\/\//i));

        if(https){
            srcArr = srcArr.map(image => image.replace('src="https://', ""));
            srcArr = srcArr.map(image => image.replace('"', ""));  
        }else if (slash){
            srcArr = srcArr.map(image => image.replace('src="//', ""));
            srcArr = srcArr.map(image => image.replace('"', ""));
        }else{
            console.error(`The images on ${url} are hosted localy and cannot be retrieved by their url.`)
        }


        post(srcArr);
    }).catch(error => post("", error));
}

function post(imgArr, ...error){
    const postIMG = document.getElementById("myDiv");
    postIMG.innerHTML = `<div id="error"><div>`;

    if (error.length>0){
        error.map(e => console.log(e));
        postIMG.innerHTML += `<div id="error" style="padding: 10px">Failed to Fech Images do to Cross-Origin Resource Sharing (CORS) Blockage.</div>`;
        postIMG.innerHTML += `<div id="error" style="padding: 10px">${error}</div>`;
    }else{
        let count = 0;
        imgArr.map((src) => {
            postIMG.innerHTML += `<div id="img${count}" style="padding: 10px"><img src="https://${src}" style="max-width: 300px; max-height: 300px;"></div>`;
            postIMG.innerHTML += `<button><a href="https://${src}" target="_blank">Open Image on a new Tab</a></button>`;
            count++;
        });
    }
}
