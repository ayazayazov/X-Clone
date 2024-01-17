let data = [];

const posts = document.querySelector('#posts');

function newPostBtn(){
    document.querySelector('.container1').style.display = 'none';
    document.querySelector('.container2').style.display = 'block';
}

function backBtn(){
    document.querySelector('.container2').style.display = 'none';
    document.querySelector('.container1').style.display = 'block';
}

function profileSideOnBtn() {
    console.log('click');
    document.querySelector('#personInfo').style.animation = 'sideBarOn 0.5s';
    setTimeout(() => {
        document.querySelector('#personInfo').style.left = 0;
    }, 80);
}

function profileSideOfBtn() {
    document.querySelector('#personInfo').style.animation = 'sideBarOff 0.5s';
    setTimeout(() => {
        document.querySelector('#personInfo').style.left = '-280px';
    }, 85);
}


let isDarkMode = false;

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    const body = document.body;
    const personInfo = document.getElementById('personInfo');
    const container1 = document.querySelector('.container1');
    const container2 = document.querySelector('.container2');

    

    if (isDarkMode) {
        body.classList.add('dark-mode');
        setTimeout(()=>{
            personInfo.classList.add('dark-mode');
            container1.classList.add('dark-mode');
            container2.classList.add('dark-mode');
        }, 10)
    } else {
        body.classList.remove('dark-mode');
        personInfo.classList.remove('dark-mode');
        container1.classList.remove('dark-mode');
        container2.classList.remove('dark-mode');
    }
}


// let isDarkMode = false;

// function toggleDarkMode() {
//     const body = document.body;
//     isDarkMode = !isDarkMode;

//     if (isDarkMode) {
//         body.classList.add('dark-mode');
//     } else {
//         body.classList.remove('dark-mode');
//     }
// }


// function profileSideOnBtn(){
//     console.log('click')
//     document.querySelector('#personInfo').style.animation = 'sideBarOn 0.5s';
//     setTimeout(() => {
//     document.querySelector('#personInfo').style.left = 0;
//       }, "400");

// }

// function profileSideOfBtn(){
//     document.querySelector('#personInfo').style.animation = 'sideBarOff 0.5s';
//     setTimeout(() => {
//         document.querySelector('#personInfo').style.left = '-280px';
//           }, "400");

// }

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

async function deletePost(id){
    try{
        const response = await fetch(`https://blog-api-t6u0.onrender.com/posts/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        });
        const data = await response.json();
        return data;
    }catch(err){
        console.log("err", err);
    }
};

// showPosts();
// createPost({title: 'Jimmy McGill', body: 'API test create'})
// updatePost(1, {title: "John Doe", body: "Lorem IMPSUM"});
// deletePost(5);

async function renderElements(data){
    posts.innerHTML = data.map((post, index) =>{

    // if(index < 101){
    //     data = data.reverse();
    // }
    // if (index < 101) return null;

    return `
    <div class="post" id="post">
        <div class="profilePhoto"><img src="./assets/imgs/profile.png" width="35px" alt="" /></div>
        <div class="postContent">
          <div class="postContentHeader">
            <div class="username">${post.title}</div>
            <div class="threeDot"><button><img src="./assets/imgs/threeDot.png" width="35px" alt=""></button></div>
          </div>
          <div class="postContentBody">${post.body}</div>
          <img class="postImage" src="https://loremflickr.com/640/480/${index}" alt="">
          <div class="postContentFooter">comment repost like view share</div>
        </div>
      </div>
    `}).join('');
}

async function App(){
    data = await showPosts();

    renderElements(data.reverse());
}

App()

// new codes

// const postInput = document.querySelector('#postInput');

async function postBtn(){
    let bodyContent = document.querySelector('#postInput').value;
    const newPost = await createPost({title: 'John Doe', body: `${bodyContent}`})

    data = [newPost, ...data];

    document.querySelector('.container2').style.display = 'none';
    document.querySelector('.container1').style.display = 'block';

    renderElements(data);

    // App()

    // console.log('click');
}