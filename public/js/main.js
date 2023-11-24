const blogPlaceholder = document.querySelector('#blogPlaceholder');
const form = document.querySelector('#myForm');
const blogtitle = form.querySelector('#title');
const blogauthor = form.querySelector('#author');
const blogcontent = form.querySelector('#content');
const submitbtn = form.querySelector('#submitbtn');
submitbtn.addEventListener('click', postBlogs);
blogPlaceholder.addEventListener('click',addComment);
blogPlaceholder.addEventListener('click',deleteComment);


function ShowBlogs(response) {
    blogPlaceholder.innerHTML = "";
    response.data.forEach(async (ele) => {
        try {
            const htmlBlog = `
                        <div class="col-md-12 mb-2">
                            <div class="card">
                                <div class="card-header bg-warning text-center d-flex justify-content-between">
                                    <div class="col-4 d-flex justify-content-start">
                                        <h4>${ele.title}</h4>
                                    </div>
                                    <div class="lead col-4 d-flex justify-content-start">
                                        <strong>by <span class="fst-italic">${ele.author}</span></strong>
                                    </div>
                                    <div class="col-4 d-flex justify-content-end">
                                        <button class="btn btn-outline-primary" data-bs-toggle="collapse" data-bs-target="#${ele.id}"
                                        aria-expanded="true" aria-controls="${ele.id}">+</button>
                                    </div>
                                </div>
                                <div class="card-body collapse" id="${ele.id}">
                                    <div class="text-center m-2">
                                        <p style="text-align: justify;">${ele.content}</p>               
                                    </div>
                                    <div class="comment-form">
                                        <form>
                                            <div class="input-group">
                                                <input type="text" class="form-control" name="comment" placeholder="Write comment" id="comment" required>
                                                <button type="submit" class="btn btn-success comment" id ="${ele.id}">&#10148;</button>
                                            </div>               
                                        </form>
                                    </div>
                                <div class="mt-1">
                                    <ul class="list-group" id="commentPlaceholder${ele.id}">
                                `;
            let htmlComments = ""
            const comments = await axios.get(`user/get-commentsbyId/${ele.id}`);
            comments.data.forEach(val => {
                const singleComment = `
                        <li class="list-group-item">
                            <div class="d-flex justify-content-between align-items-center">
                                <p style="text-align: justify;" class="pe-1">${val.comment}</p>
                            </div>                           
                                <button class="btn btn-danger btn-sm delete" id="${val.id}">Delete</button>      
                        </li>
                            `;
                htmlComments += singleComment;
            });
            const htmlend = `</ul>
                            </div>
                        </div>
                    </div>
                </div>
            `
            blogPlaceholder.innerHTML += htmlBlog + htmlComments + htmlend;


        } catch (error) {
            console.log(error);
        }
    })

}

async function postBlogs(e) {   
try {
    if(e.target && form.checkValidity()){
        e.preventDefault();
        const data = {
            title: blogtitle.value,
            author: blogauthor.value,
            content: blogcontent.value
        }
        let url = 'user/post-blog';
        const response = await axios.post(url, data);
        const{id,title,author,content} = response.data.blog;
    
        const blog = `
    <div class="col-md-12 mb-2">
        <div class="card">
            <div class="card-header bg-warning text-center d-flex justify-content-between">
                <div class="col-4 d-flex justify-content-start">
                    <h4>${title}</h4>
                </div>
                <div class="lead col-4">
                     <strong>by <span class="fst-italic">${author}</span></strong>
                </div>
                <div class="col-4 d-flex justify-content-end">
                    <button class="btn btn-outline-primary" data-bs-toggle="collapse" data-bs-target="#${id}"
                    aria-expanded="true" aria-controls="${id}">+</button>
                </div>
            </div>
            <div class="card-body collapse show " id="${id}">
                <div class="text-center m-2">
                    <p style="text-align: justify;">${content}</p>
    
    
                </div>
                <div class="comment-form">
                    <form id= "commentfrom${id}">
                        <div class="input-group">
                            <input type="text" class="form-control" name="comment" placeholder="Write comment" id="comment"
                                required>
                            <button type="submit" class="btn btn-success comment" id ="${id}">&#10148;</button>
                        </div>
    
                    </form>
                </div>
                <div class="mt-1">
                    <ul class="list-group" id="commentPlaceholder${id}">
                    </ul>
                </div>
    
            </div>
        </div>
    </div>      
                     `;
        blogPlaceholder.innerHTML += blog;
        blogtitle.value = "";
        blogauthor.value = "";
        blogcontent.value = "";
    }
    
} catch (error) {
    console.log(error);
}

}

async function addComment(e){    
    let commentform = e.target.parentElement.parentElement
    try {
        if(e.target && e.target.classList.contains("comment") && commentform.checkValidity()){  e.preventDefault();         
            blogId = e.target.id;
            const data = {
                comment: e.target.previousElementSibling.value
            }
            const commentresponse = await axios.post(`user/post-comment/${blogId}`,data);
            const{id,comment} = commentresponse.data.comment;
            const commentHTML = `
            <li class="list-group-item">
                <div class="d-flex justify-content-between align-items-center">
                    <p style="text-align: justify;" class="pe-1">${comment}</p>
                </div>                           
                    <button class="btn btn-danger btn-sm delete" id="${id}">Delete</button>      
            </li>
                `;
            blogPlaceholder.querySelector(`#commentPlaceholder${blogId}`).innerHTML+=commentHTML;
            e.target.previousElementSibling.value='';
        }
        
    } catch (error) {
        console.log(error);
    }  
}
async function deleteComment(e){
    try {
        if(e.target && e.target.classList.contains("delete")){  
            e.preventDefault();         
            commentId = e.target.id;
            await axios.post(`user/delete-comment/${commentId}`);
            e.target.parentElement.remove();
            
        }
        
    } catch (error) {
        console.log(error);
    }     
}

async function refresh() {
    try {
        let url = 'http://192.168.29.221:9090/user/get-blogs';
        const response = await axios.get(url);
        ShowBlogs(response);

    } catch (error) {
        console.log(error);
    }
}
refresh();
