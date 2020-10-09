const lang = document.querySelector("html").getAttribute("lang");

const thePromise = fetch("../posts/2020/posts.json");
thePromise.then((res)=>{
    return res.json();
}).then((jsonData)=>{
    

    jsonData.posts.forEach((post)=>{
        let entries = Object.entries(post.locale);
        

        /* Making Fake Permalinks ================================== */
        let englishTitle = post.locale.en.title;
        englishTitle = englishTitle.toLowerCase();
        englishTitle = englishTitle.replace(/[\W_\s]+/igm, "_");
        let postDate = post.date.replace(/-/g, "_");
        let permalink = postDate + "_" + englishTitle;
        /* Fake Permalinks End ===================================== */

        /* A FUNCTION TO INSERT CONTENT TO DOM ================ */
        function displayPosts(value){

            if(value.body == ""){return;}
            let regex = /(?<=<img.*)(?<=src="|src=')(?!http)[^'"]+(?='|")/img;
            let matched = value.body.match(regex);
            value.body = value.body.replace(regex, "../posts/2020/" + matched);

            let newThumbnailUrl = "";
            if(value.thumbnail_url != ""){
                newThumbnailUrl = value.thumbnail_url.replace(/.*/, `<img class="post-thumbnail" src="../posts/2020/${value.thumbnail_url}" alt="thumbnail" />`);
            }

            let newAuthorIconUrl = "";
            if(value.author_icon_url != ""){
                newAuthorIconUrl = value.author_icon_url.replace(/.*/, `<img class="post-author-icon" src="../posts/2020/${value.author_icon_url}" alt="icon" />`);
            }

            document.querySelector("#post-container").innerHTML += `
                <div class="post" id="${permalink}">
                    <div class="post-header">
                        ${newAuthorIconUrl}
                        <h2 class="post-title"><a href="./post.html#${permalink}">${value.title}</a></h2>
                        <span class="post-author">By ${value.author}</span>
                        <span class="post-date">${value.date_local}</span>
                    </div>
                    <div class="post-body">${value.body}</div>
                </div>
            `;
        }
        /* THE FUNCTION ENDS =================================== */
        
        if(!lang){
            displayPosts(post.locale.en);
        }
        entries.forEach( ([key, value]) => {
            if(key == lang){
                displayPosts(value);
            }
        });
    });
    /* DELETE NO CONTENT MESSAGE IF ANY CONTENT IS AVAILABLE */
    if(!document.querySelector("#post-container .post")){
        let noContent = document.querySelector("#post-container");
        noContent.innerHTML = `<h1 id="no-content">No Content</h1>`;
    }
    /* NO CONTENT END ====================================== */

    /* PAGINATION ========================================== */
    let config = {
        "numOfPosts": Object.entries(jsonData.posts).length,
        "maxPerPage": 2,
        "page": 1
        };
    let numOfPages = Math.ceil( config.numOfPosts / config.maxPerPage);
    let results = [];

    /* NAV LIST ------------ */
    let pageNavList = document.querySelector("#page-nav-list");
    function initPageNav(){
        pageNavList.innerHTML = "";

        pageNavList.innerHTML += `<li id="page-nav-list-first"><button class="btn btn-secondary" data-page="1">1</button></li>`;
        for(let i = 1; i <= numOfPages; i++){
            pageNavList.innerHTML += `<li><button class="page-nav-list-item btn btn-secondary" data-page="${i}">${i}</button></li>`;
        }
        pageNavList.innerHTML += `<li id="page-nav-list-last"><button class="btn btn-secondary" data-page="${numOfPages}">${numOfPages}</button></li>`;

        let currentPage = document.querySelector(`.page-nav-list-item[data-page="${config.page}"]`);
        currentPage.className = currentPage.className.replace("btn-secondary", "btn-primary");
    
    /* NAV LIST END -------- */
    /* BUTTON FUNCTIONALITY -------------- */
    let pageButtons = document.querySelectorAll("#page-nav-list li button");
    pageButtons.forEach( (eachButton) => {
        let pageNumber = eachButton.getAttribute("data-page");
        eachButton.addEventListener("click", function(){
            config.page = pageNumber;
            initPageNav(); //RECURSIVE FUNCTION!
        });
    });
    /* BUTTON FUNCTIONALITY  END --------- */
    }
    initPageNav(); //INIT AT THE BEGINNING

    /* PAGINATION END =======================================*/
});