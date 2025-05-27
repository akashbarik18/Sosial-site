document.addEventListener('DOMContentLoaded', function() {
    // Navigation between sections
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.feed');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section') + '-feed';
            
            // Remove active class from all links and sections
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active-section'));
            
            // Add active class to clicked link and corresponding section
            this.classList.add('active');
            document.getElementById(sectionId).classList.add('active-section');
        });
    });

    // Post functionality
    const postBtn = document.getElementById('post-btn');
    const postContent = document.getElementById('post-content');
    const postsContainer = document.querySelector('.posts');
    
    postBtn.addEventListener('click', function() {
        if (postContent.value.trim() !== '') {
            createPost(postContent.value);
            postContent.value = '';
        }
    });
    
    postContent.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            if (postContent.value.trim() !== '') {
                createPost(postContent.value);
                postContent.value = '';
            }
        }
    });
    
    function createPost(content) {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        
        const now = new Date();
        const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
        
        postDiv.innerHTML = `
            <div class="post-header">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" class="profile-img">
                <div class="post-user">
                    <h4>John Doe</h4>
                    <p>@johndoe · Just now</p>
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
            <div class="comments-section">
                <div class="add-comment">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" class="profile-img">
                    <input type="text" placeholder="Write a comment...">
                </div>
            </div>
        `;
        
        postsContainer.insertBefore(postDiv, postsContainer.firstChild);
        
        // Add event listeners to new post
        addPostFunctionality(postDiv);
    }
    
    function addPostFunctionality(post) {
        // Like button
        const likeBtn = post.querySelector('.like-btn');
        likeBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const countSpan = this.querySelector('span');
            
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                countSpan.textContent = parseInt(countSpan.textContent) + 1;
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                countSpan.textContent = parseInt(countSpan.textContent) - 1;
            }
        });
        
        // Comment button
        const commentBtn = post.querySelector('.comment-btn');
        commentBtn.addEventListener('click', function() {
            const commentsSection = post.querySelector('.comments-section');
            commentsSection.classList.toggle('expanded');
            
            document.querySelectorAll('.comments-section.expanded').forEach(section => {
                if (section !== commentsSection) {
                    section.classList.remove('expanded');
                }
            });
        });
        
        // Share button
        const shareBtn = post.querySelector('.share-btn');
        shareBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            let shareOptions = this.nextElementSibling;
            if (!shareOptions || !shareOptions.classList.contains('share-options')) {
                shareOptions = document.createElement('div');
                shareOptions.className = 'share-options';
                shareOptions.innerHTML = `
                    <div class="share-option">
                        <i class="fab fa-facebook"></i>
                        <span>Share on Facebook</span>
                    </div>
                    <div class="share-option">
                        <i class="fab fa-twitter"></i>
                        <span>Share on Twitter</span>
                    </div>
                    <div class="share-option">
                        <i class="fab fa-linkedin"></i>
                        <span>Share on LinkedIn</span>
                    </div>
                    <div class="share-option">
                        <i class="fas fa-link"></i>
                        <span>Copy Link</span>
                    </div>
                `;
                this.parentNode.insertBefore(shareOptions, this.nextSibling);
            }
            
            shareOptions.classList.toggle('show');
            
            document.querySelectorAll('.share-options.show').forEach(options => {
                if (options !== shareOptions) {
                    options.classList.remove('show');
                }
            });
        });
        
        // Add comment functionality
        const commentInput = post.querySelector('.add-comment input');
        commentInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && this.value.trim() !== '') {
                addComment(this);
            }
        });
    }
    
    function addComment(input) {
        const commentSection = input.closest('.comments-section');
        const currentUserImg = input.previousElementSibling.src;
        const commentText = input.value;
        
        const newComment = document.createElement('div');
        newComment.className = 'comment';
        newComment.innerHTML = `
            <img src="${currentUserImg}" alt="User" class="profile-img">
            <div>
                <h5>You <span>Just now</span></h5>
                <p>${commentText}</p>
                <button class="like-btn"><i class="far fa-heart"></i> 0</button>
            </div>
        `;
        
        commentSection.insertBefore(newComment, commentSection.querySelector('.add-comment'));
        input.value = '';
        
        newComment.querySelector('.like-btn').addEventListener('click', function() {
            this.classList.toggle('liked');
            const icon = this.querySelector('i');
            const count = parseInt(this.textContent) || 0;
            
            if (this.classList.contains('liked')) {
                icon.classList.replace('far', 'fas');
                this.innerHTML = `<i class="fas fa-heart"></i> ${count + 1}`;
            } else {
                icon.classList.replace('fas', 'far');
                this.innerHTML = `<i class="far fa-heart"></i> ${count - 1}`;
            }
        });
    }
    
    // Initialize functionality for existing posts
    document.querySelectorAll('.post').forEach(post => {
        addPostFunctionality(post);
    });
    
    // Media upload sections
    document.getElementById('photo-btn').addEventListener('click', function() {
        document.getElementById('photo-upload').style.display = 'block';
        document.getElementById('video-upload').style.display = 'none';
        document.getElementById('location-select').style.display = 'none';
    });
    
    document.getElementById('video-btn').addEventListener('click', function() {
        document.getElementById('video-upload').style.display = 'block';
        document.getElementById('photo-upload').style.display = 'none';
        document.getElementById('location-select').style.display = 'none';
    });
    
    document.getElementById('location-btn').addEventListener('click', function() {
        document.getElementById('location-select').style.display = 'block';
        document.getElementById('photo-upload').style.display = 'none';
        document.getElementById('video-upload').style.display = 'none';
    });
    
    // Close buttons
    document.querySelectorAll('.close-upload, .cancel-btn').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.upload-section').style.display = 'none';
        });
    });
    
    // Photo preview
    document.getElementById('photo-input').addEventListener('change', function(e) {
        const preview = document.getElementById('photo-preview');
        preview.innerHTML = '';
        
        for (let file of e.target.files) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const img = document.createElement('img');
                img.src = event.target.result;
                preview.appendChild(img);
            }
            reader.readAsDataURL(file);
        }
    });
    
    // Video preview
    document.getElementById('video-input').addEventListener('change', function(e) {
        const preview = document.getElementById('video-preview');
        preview.innerHTML = '';
        
        const file = e.target.files[0];
        if (file) {
            const video = document.createElement('video');
            video.controls = true;
            video.src = URL.createObjectURL(file);
            preview.appendChild(video);
        }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.comment-btn') && !e.target.closest('.comments-section')) {
            document.querySelectorAll('.comments-section.expanded').forEach(section => {
                section.classList.remove('expanded');
            });
        }
        
        if (!e.target.closest('.share-btn') && !e.target.closest('.share-options')) {
            document.querySelectorAll('.share-options.show').forEach(options => {
                options.classList.remove('show');
            });
        }
    });
});

// ===============VD /LOC /PHP /PO=====================

document.addEventListener('DOMContentLoaded', function() {
    // Get all the necessary elements
    const photoBtn = document.getElementById('photo-btn');
    const videoBtn = document.getElementById('video-btn');
    const locationBtn = document.getElementById('location-btn');
    const photoUpload = document.getElementById('photo-upload');
    const videoUpload = document.getElementById('video-upload');
    const locationSelect = document.getElementById('location-select');
    const closeButtons = document.querySelectorAll('.close-upload, .cancel-btn');

    // Show photo upload section
    photoBtn.addEventListener('click', function() {
        photoUpload.style.display = 'block';
        videoUpload.style.display = 'none';
        locationSelect.style.display = 'none';
    });

    // Show video upload section
    videoBtn.addEventListener('click', function() {
        videoUpload.style.display = 'block';
        photoUpload.style.display = 'none';
        locationSelect.style.display = 'none';
    });

    // Show location select section
    locationBtn.addEventListener('click', function() {
        locationSelect.style.display = 'block';
        photoUpload.style.display = 'none';
        videoUpload.style.display = 'none';
    });

    // Close all upload sections
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            photoUpload.style.display = 'none';
            videoUpload.style.display = 'none';
            locationSelect.style.display = 'none';
        });
    });

    // Handle file selection for photos
    const photoInput = document.getElementById('photo-input');
    const photoPreview = document.getElementById('photo-preview');
    
    photoInput.addEventListener('change', function(e) {
        photoPreview.innerHTML = '';
        const files = e.target.files;
        
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (!file.type.match('image.*')) continue;
            
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                photoPreview.appendChild(img);
            }
            reader.readAsDataURL(file);
        }
    });

    // Handle file selection for video
    const videoInput = document.getElementById('video-input');
    const videoPreview = document.getElementById('video-preview');
    
    videoInput.addEventListener('change', function(e) {
        videoPreview.innerHTML = '';
        const file = e.target.files[0];
        if (!file.type.match('video.*')) return;
        
        const video = document.createElement('video');
        video.controls = true;
        video.src = URL.createObjectURL(file);
        videoPreview.appendChild(video);
    });
});

// =======================COMENT SECTION===============

document.addEventListener('DOMContentLoaded', function() {
    // Handle comment submission for all posts
    document.querySelectorAll('.post-comment-btn').forEach(button => {
        button.addEventListener('click', function() {
            const commentInput = this.previousElementSibling;
            const commentText = commentInput.value.trim();
            
            if (commentText) {
                const post = this.closest('.post');
                const commentsSection = post.querySelector('.comments-section');
                const currentUserImg = post.querySelector('.add-comment img').src;
                
                // Create new comment element
                const newComment = document.createElement('div');
                newComment.className = 'comment';
                newComment.innerHTML = `
                    <img src="${currentUserImg}" alt="User" class="profile-img">
                    <div>
                        <h5>John Doe <span>@johndoe · just now</span></h5>
                        <p>${commentText}</p>
                        <button class="like-btn"><i class="far fa-heart"></i> 0</button>
                    </div>
                `;
                
                // Insert the new comment before the "add comment" section
                commentsSection.insertBefore(newComment, commentsSection.querySelector('.add-comment'));
                
                // Clear the input field
                commentInput.value = '';
                
                // Add event listener to the new comment's like button
                newComment.querySelector('.like-btn').addEventListener('click', function() {
                    toggleLike(this);
                });
            }
        });
    });
    
    // Also allow pressing Enter to submit comments
    document.querySelectorAll('.add-comment input').forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                this.nextElementSibling.click(); // Trigger the post button click
            }
        });
    });
    
    // Function to handle like button toggling
    function toggleLike(button) {
        const icon = button.querySelector('i');
        const countSpan = button.querySelector('span') || button.nextElementSibling;
        
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            if (countSpan) {
                const currentCount = parseInt(countSpan.textContent) || 0;
                countSpan.textContent = currentCount + 1;
            }
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            if (countSpan) {
                const currentCount = parseInt(countSpan.textContent) || 1;
                countSpan.textContent = Math.max(0, currentCount - 1);
            }
        }
    }
    
    // Add event listeners to all existing like buttons
    document.querySelectorAll('.like-btn').forEach(button => {
        button.addEventListener('click', function() {
            toggleLike(this);
        });
    });
});

//logout
const cancelBtn = document.getElementById("cancelLogoutBtn");
  const confirmBtn = document.getElementById("confirmLogoutBtn");
  const warningMsg = document.getElementById("logoutWarning");

  // Show warning on logout button click
  confirmBtn.addEventListener("click", function () {
    warningMsg.style.display = "block";

    // Optional: add a short delay before redirecting
    setTimeout(() => {
      window.location.href = "lg.html"; // Redirect to your logout page
    }, 2000); // 2 seconds delay to read the warning
  });

  // Cancel logout warning
  cancelBtn.addEventListener("click", function () {
    warningMsg.style.display = "none";
  });


