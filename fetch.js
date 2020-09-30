const thePromise = fetch("posts/2020/posts.json");
thePromise.then((res)=>{
    return res.json();
}).then((jsonData)=>{
    console.log(jsonData.posts);
    jsonData.posts.forEach((post)=>{
        //console.log(post);
        let values = Object.values(post.locale);
        console.log(values);
        values.forEach((value)=>{
            //console.log(value.body);
            let regex = /(?<=<img.*)(?<=src="|src=')(?!http)[^'"]+(?='|")/mg;
            let matched = value.body.match(regex);
            value.body = value.body.replace(regex, "./posts/2020/" + matched);

            let newThumbnailUrl = "";
            if(value.thumbnail_url != ""){
                newThumbnailUrl = value.thumbnail_url.replace(/.*/, `<img class="post-thumbnail" src="./posts/2020/${value.thumbnail_url}" alt="thumbnail" />`);
            }

            document.querySelector("#post-container").innerHTML += `
                ${newThumbnailUrl}
                <div class="post-title">${value.title}</div>
                <div class="post">${value.body}</div>
            `;
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