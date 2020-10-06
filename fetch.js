const thePromise = fetch("posts/2020/posts.json");
thePromise.then((res)=>{
    return res.json();
}).then((jsonData)=>{
    console.log(jsonData.posts);
    const lang = document.querySelector("html").getAttribute("lang");
    console.log(lang);
    jsonData.posts.forEach((post)=>{
        let entries = Object.entries(post.locale);
        console.log(entries);
        entries.forEach( ([key, value]) => {
            if(key == lang){
                let regex = /(?<=<img.*)(?<=src="|src=')(?!http)[^'"]+(?='|")/img;
                let matched = value.body.match(regex);
                value.body = value.body.replace(regex, "./posts/2020/" + matched);

                let newThumbnailUrl = "";
                if(value.thumbnail_url != ""){
                    newThumbnailUrl = value.thumbnail_url.replace(/.*/, `<img class="post-thumbnail" src="./posts/2020/${value.thumbnail_url}" alt="thumbnail" />`);
                }

                document.querySelector("#post-container").innerHTML += `
                    <div class="post">
                        <div class="post-header">
                            ${newThumbnailUrl}
                            <h2 class="post-title">${value.title}</h2>
                            <span class="post-author">By ${value.author}</span>
                            <span class="post-date">${value.date_local}</span>
                        </div>
                        <div class="post-body">${value.body}</div>
                    </div>
                `;
            }
        });
    });
    // let postImg = document.querySelectorAll(".post img[src^='img']");
    // for (let i=0;i<postImg.length;i++){
    //     let postImgSource = postImg[i].attributes.getNamedItem("src").value;
    //     postImgSource = "./posts/2020/" + postImgSource;
    //     console.log(postImgSource);
    //     postImg[i].setAttribute("src", postImgSource);
    // }
});