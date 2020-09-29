const thePromise = fetch('https://jsonplaceholder.typicode.com/posts');
thePromise.then((data)=>{
    return data.json();
}).then((jsonData)=>{
    console.log(jsonData);
});