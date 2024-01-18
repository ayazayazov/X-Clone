let data = [];

const posts = document.querySelector('#posts');

const editPostBtn = document.querySelector('#editPostBtn');


function newPostBtn(){
    document.querySelector('.container1').style.display = 'none';
    document.querySelector('.editContainer').style.display = 'none';
    document.querySelector('.container2').style.display = 'block';
}



function editBtn(id){
    console.log('id', id);
    document.querySelector('.editContainer').style.display = 'block';
    document.querySelector('.container1').style.display = 'none';
    document.querySelector('.container2').style.display = 'none';

    editPostBtn.addEventListener('click', async function(){
        console.log('click');
        let form = {title: 'John Doe', body: `${document.querySelector('#editPostInput').value}`}
        try{
            await updatePost(id, form);
        
            document.querySelector('.editContainer').style.display = 'none';
            document.querySelector('.container1').style.display = 'block';
            document.querySelector('.container2').style.display = 'none';
            // renderElements(data);
            App();
        
            }catch (err) {
                console.log("err", err);
              }
    })

}

async function deleteBtn(id){
    try{
    await deletePost(id);
    console.log("Ugurla silindi", id);
    data = data.filter((post) => post.id !== id);
    renderElements(data);

    }catch (err) {
        console.log("err", err);
      }
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


    return `
    <div class="post" id="post">
        <div class="profilePhoto"><img src="./assets/imgs/profile.png" width="35px" alt="" /></div>
        <div class="postContent">
          <div class="postContentHeader">
            <div class="username">${post.title}</div>
            <div id="editdelete" class="editdel">
      <div class="editImg">
        <button onclick="deleteBtn(${post.id})" class="deleteBtn"><img class="img_del" width="25px" src="./assets/imgs/icons8-trash-64.png" alt=""></button>
        <button onclick="editBtn(${post.id})" class="editBtn"><img width="20px" src="./assets/imgs/icons8-pencil-64.png" alt=""></button>
      </div>
    </div> 
            
          </div>
          <div class="postContentBody">${post.body}</div>
          <img class="postImage" src="https://loremflickr.com/640/480/${index}" alt="">
          <div class="postContentFooter"><img src="./assets/imgs/cooment.png" alt="">
          <img src="./assets/imgs/repost.png" alt="">
          <img src="./assets/imgs/like.png" alt="">
          <img src="./assets/imgs/view.png" alt="">
          <img src="./assets/imgs/share.png" alt=""></div>
        </div>
      </div>

    `}).join('');


}



async function App(){
    data = await showPosts();

    renderElements(data.reverse());
}

App()



async function postBtn(){
    let bodyContent = document.querySelector('#postInput').value;
    const newPost = await createPost({title: 'John Doe', body: `${bodyContent}`})

    data = [newPost, ...data];

    document.querySelector('.container2').style.display = 'none';
    document.querySelector('.container1').style.display = 'block';

    renderElements(data);

}

async function deleteBtn(id){
    try{
    await deletePost(id);
    console.log("Ugurla silindi", id);
    data = data.filter((post) => post.id !== id);
    renderElements(data);

    }catch (err) {
        console.log("err", err);
      }
}