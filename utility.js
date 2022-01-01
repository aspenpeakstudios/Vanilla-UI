// Needs Axios for this to work.
// <script src="https://unpkg.com/axios/dist/axios.min.js"></script>


// Example of retrieving images from Unsplash API
async function fetchImages()
{
    const client_id = "av09GaKOAUKnW63ETkzEGg6gOiahgjuxP1F78MPYssk";
    const category = "mountains";
    const url = "https://api.unsplash.com/search/photos?query=" + category + "&orientation=landscape&per_page=20&client_id=" + client_id;

    const response = await axios.get(url);
    //console.log(response);
    return response;
}

async function loadImages(imageArray)
{
    const count = imageArray.count;

    // Display loading spinners                
    var $figures = document.querySelectorAll('figure');   
    // imageArray.forEach((figure, i) => 
    // {
    //     figure.classList.add("loader");
    //     figure.classList.add("is-loading");
    // })

    // Make a call out to service to retrieve images
    const results = await fetchImages().then(resp =>
    {  
        var images = [];
        
        // Shrink the dataset down and grab only the fields we want.
        var subset = resp.data.results.slice(0, count).forEach((item) => {
            const image = { "link" : item.urls.small, 
                            "home" : item.links.html, 
                            "description" : item.description ?? item.alt_description, 
                            "user" : item.user.name }
            images.push(image);
        });                    

        //console.log(images);

        // Update the image containers on the page.
        renderImages(imageArray, images);                    
    }); 
}

function renderImages(imageArray, images)
{
    // Get images 
    //var $imageRow = document.querySelectorAll('figure img');                
    //var $linkRow = document.querySelectorAll('figure a');                

    imageArray.forEach((item, i) =>
    {      
        //debugger
        //console.log(item, images[i]);
        //let imageHtml = `<img src="${images[i].link}" />`;
        //item.innerHTML = imageHtml; 
        let backgroundUrl = `url('${images[i].link}')`;
        item.style.backgroundImage=backgroundUrl;
        console.log(backgroundUrl);
        //image.src = model[i].link;
        //image.title = model[i].user + ": " + model[i].description;
        //image.parentElement.href = model[i].home;

        // Remove the loading spinner
       // item.parentElement.parentElement.classList.remove("loader");
        //item.parentElement.parentElement.classList.remove("is-loading");
    })
}
