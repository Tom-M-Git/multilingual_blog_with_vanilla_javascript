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

function createPost (post) {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            posts.push(post);

            const error = false;

            if(!error) {
                resolve();
            } else {
                reject("Error: Something went wrong");
            }
        }, 2000);
    });
}

createPost(
    { 
        locale: "en",
        author: "Tom-M-Git",
        title: "Post Three",
        body: "This is post three",
    }
)
.then(getPosts)
.catch(err => console.log(err));