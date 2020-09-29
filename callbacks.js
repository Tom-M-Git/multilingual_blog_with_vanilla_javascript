const posts = [
    { 
        locale: "en",
        author: "Tom-M-Git",
        title: "Post One",
        body: "This is post one",
    },
    { 
        locale: "en",
        author: "Tom-M-Git",
        title: "Post Two",
        body: "This is post two",
    },
]

function getPosts () {
    setTimeout( () => {
        let output = "";
        posts.forEach( (post, index) => {
            output += `<li>${post.title}</li>`;
        });
        document.body.innerHTML = output;
    }, 1000);
}

function createPost (post, callback) {
    setTimeout(()=>{
        posts.push(post);
        callback();
    }, 2000);
}

createPost({
    locale: "en",
    author: "Tom-M-Git",
    title: "Post Three",
    body: "This is post three",
}, getPosts);