async function showPosts(){
    try{
        const response = await fetch("https://blog-api-t6u0.onrender.com/posts", {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        });
        const data = await response.json();
        console.log(data);
        return data
    }catch(err){
        console.log("err", err);
    }
}

async function createPost(form){
    try {
        const response = await fetch('https://blog-api-t6u0.onrender.com/posts', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(form)
        })
        
        const data = await response.json();
        console.log(data);
        return data;
    } catch (err) {
        console.log('err', err);
    }
}


async function updatePost(id, form){
    try {
        const response = await fetch(`https://blog-api-t6u0.onrender.com/posts/${id}`, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(form)
        })
        
        const data = await response.json();
        console.log((data));
        return data;
    } catch (err) {
        console.log('err', err);
    }
}

// showPosts();
// createPost({title: 'Jimmy McGill', body: 'API test create'})
// updatePost(1, {title: "John Doe", body: "Lorem IMPSUM"});