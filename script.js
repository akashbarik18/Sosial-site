document.addEventListener('DOMContentLoaded', function() {
    // Like button functionality
    const likeButtons = document.querySelectorAll('.like-btn');
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const countSpan = this.querySelector('span');
            
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas', 'liked');
                this.classList.add('liked');
                
                // Increment like count
                let count = parseInt(countSpan.textContent);
                countSpan.textContent = count + 1;
            } else {
                icon.classList.remove('fas', 'liked');
                icon.classList.add('far');
                this.classList.remove('liked');
                
                // Decrement like count
                let count = parseInt(countSpan.textContent);
                countSpan.textContent = count - 1;
            }
        });
    });

    // Comment button functionality
    const commentButtons = document.querySelectorAll('.comment-btn');
    commentButtons.forEach(button => {
        button.addEventListener('click', function() {
            const post = this.closest('.post');
            const commentsSection = post.querySelector('.comments-section');
            
            if (commentsSection.style.display === 'none' || !commentsSection.style.display) {
                commentsSection.style.display = 'block';
            } else {
                commentsSection.style.display = 'none';
            }
        });
    });

    // Create new post functionality
    const postBtn = document.getElementById('post-btn');
    const postContent = document.getElementById('post-content');
    
    postBtn.addEventListener('click', function() {
        if (postContent.value.trim() !== '') {
            createNewPost(postContent.value);
            postContent.value = '';
        }
    });
    
    postContent.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && postContent.value.trim() !== '') {
            createNewPost(postContent.value);
            postContent.value = '';
        }
    });

    function createNewPost(content) {
        const postsContainer = document.querySelector('.posts');
        const newPost = document.createElement('div');
        newPost.className = 'post';
        
        const currentTime = new Date();
        const hoursAgo = Math.floor(Math.random() * 5) + 1; // Random time between 1-5 hours
        
        newPost.innerHTML = `
            <div class="post-header">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" class="profile-img">
                <div class="post-user">
                    <h4>John Doe</h4>
                    <p>@johndoe · ${hoursAgo}h ago</p>
                </div>
                <i class="fas fa-ellipsis-h"></i>
            </div>
            <div class="post-content">
                <p>${content}</p>
            </div>
            <div class="post-actions">
                <button class="like-btn"><i class="far fa-heart"></i> <span>0</span></button>
                <button class="comment-btn"><i class="far fa-comment"></i> <span>0</span></button>
                <button class="share-btn"><i class="far fa-share-square"></i> <span>Share</span></button>
            </div>
        `;
        
        postsContainer.prepend(newPost);
        
        // Add event listeners to the new post's buttons
        const newLikeBtn = newPost.querySelector('.like-btn');
        newLikeBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const countSpan = this.querySelector('span');
            
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas', 'liked');
                this.classList.add('liked');
                
                let count = parseInt(countSpan.textContent);
                countSpan.textContent = count + 1;
            } else {
                icon.classList.remove('fas', 'liked');
                icon.classList.add('far');
                this.classList.remove('liked');
                
                let count = parseInt(countSpan.textContent);
                countSpan.textContent = count - 1;
            }
        });
        
        const newCommentBtn = newPost.querySelector('.comment-btn');
        newCommentBtn.addEventListener('click', function() {
            const post = this.closest('.post');
            let commentsSection = post.querySelector('.comments-section');
            
            if (!commentsSection) {
                commentsSection = document.createElement('div');
                commentsSection.className = 'comments-section';
                commentsSection.style.display = 'none';
                commentsSection.innerHTML = `
                    <div class="add-comment">
                        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" class="profile-img">
                        <input type="text" placeholder="Write a comment...">
                    </div>
                `;
                post.appendChild(commentsSection);
            }
            
            if (commentsSection.style.display === 'none' || !commentsSection.style.display) {
                commentsSection.style.display = 'block';
            } else {
                commentsSection.style.display = 'none';
            }
        });
    }

    // Friend request buttons
    const acceptButtons = document.querySelectorAll('.accept-btn');
    const declineButtons = document.querySelectorAll('.decline-btn');
    
    acceptButtons.forEach(button => {
        button.addEventListener('click', function() {
            const request = this.closest('.request');
            request.remove();
            // In a real app, you would also update the database
        });
    });
    
    declineButtons.forEach(button => {
        button.addEventListener('click', function() {
            const request = this.closest('.request');
            request.remove();
            // In a real app, you would also update the database
        });
    });

    // Add friend buttons
    const addButtons = document.querySelectorAll('.add-btn');
    
    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            const suggestion = this.closest('.suggestion');
            suggestion.remove();
            // In a real app, you would send a friend request
        });
    });

    // Dropdown menu functionality
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            const dropdowns = document.querySelectorAll('.dropdown-content');
            dropdowns.forEach(dropdown => {
                dropdown.style.display = 'none';
            });
        }
    });

    // Simulate loading more posts when scrolling
    window.addEventListener('scroll', function() {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
            // In a real app, you would fetch more posts from the server
            console.log('Load more posts...');
        }
    });
});