const thePromise = fetch("../posts/2020/posts.json");
thePromise.then((res)=>{
    return res.json();
}).then((jsonData)=>{
    //console.log(jsonData.posts);
    const lang = document.querySelector("html").getAttribute("lang");
    //console.log(lang);
    jsonData.posts.forEach((post)=>{
        let entries = Object.entries(post.locale);
        //console.log(entries);

        /* Making Permalinks --------------------------------- */
        let englishTitle = post.locale.en.title;
        englishTitle = englishTitle.toLowerCase();
        englishTitle = englishTitle.replace(/[\W_\s]+/igm, "_");
        let postDate = post.date.replace(/-/g, "_");
        let permalink = postDate + "_" + englishTitle;
        console.log(permalink);
        /* Permalinks End ------------------------------------- */

        /* A FUNCTION TO INSERT CONTENT TO DOM ---------------- */
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
                        <h2 class="post-title"><a href="#${permalink}">${value.title}</a></h2>
                        <span class="post-author">By ${value.author}</span>
                        <span class="post-date">${value.date_local}</span>
                    </div>
                    <div class="post-body">${value.body}</div>
                </div>
            `;
        }
        /* THE FUNCTION ENDS --------------------------- */
        //console.log(post.locale.en);
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
    /* NO CONTENT END -------------------------------------- */

    // let postImg = document.querySelectorAll(".post img[src^='img']");
    // for (let i=0;i<postImg.length;i++){
    //     let postImgSource = postImg[i].attributes.getNamedItem("src").value;
    //     postImgSource = "./posts/2020/" + postImgSource;
    //     console.log(postImgSource);
    //     postImg[i].setAttribute("src", postImgSource);
    // }
});