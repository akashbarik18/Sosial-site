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
       const likeBtn = post.querySelector('.like-btn');
likeBtn.addEventListener('click', function () {
    const icon = this.querySelector('i');
    const countSpan = this.querySelector('span');
    let count = parseInt(countSpan.textContent);

    if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas'); // liked
        countSpan.textContent = count + 1;
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far'); // unliked
        countSpan.textContent = count - 1;
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

    // Post URL to share — replace this with your actual post link
    const postUrl = encodeURIComponent(window.location.href);
    const postText = encodeURIComponent("Check this out!");

    let shareOptions = this.nextElementSibling;
    if (!shareOptions || !shareOptions.classList.contains('share-options')) {
        shareOptions = document.createElement('div');
        shareOptions.className = 'share-options';
        shareOptions.innerHTML = `
            <div class="share-option" data-platform="facebook">
                <i class="fab fa-facebook"></i>
                <span>Share on Facebook</span>
            </div>
            <div class="share-option" data-platform="twitter">
                <i class="fab fa-twitter"></i>
                <span>Share on Twitter</span>
            </div>
            <div class="share-option" data-platform="linkedin">
                <i class="fab fa-linkedin"></i>
                <span>Share on LinkedIn</span>
            </div>
            <div class="share-option" data-platform="copy">
                <i class="fas fa-link"></i>
                <span>Copy Link</span>
            </div>
        `;
        this.parentNode.insertBefore(shareOptions, this.nextSibling);

        // Add click listeners to each share option
        shareOptions.querySelectorAll('.share-option').forEach(option => {
            option.addEventListener('click', function(e) {
                e.stopPropagation();
                const platform = this.getAttribute('data-platform');

                let shareUrl = '';
                switch (platform) {
                    case 'facebook':
                        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${postUrl}`;
                        break;
                    case 'twitter':
                        shareUrl = `https://twitter.com/intent/tweet?url=${postUrl}&text=${postText}`;
                        break;
                    case 'linkedin':
                        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${postUrl}`;
                        break;
                    case 'copy':
                        navigator.clipboard.writeText(window.location.href);
                        alert("✅ Link copied to clipboard!");
                        return;
                }

                if (shareUrl) {
                    window.open(shareUrl, '_blank', 'width=600,height=500');
                }
            });
        });
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

  //accept friend
  document.addEventListener('DOMContentLoaded', function() {
    // Handle friend request accept/decline
    document.querySelectorAll('.accept-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const userId = this.getAttribute('data-user-id');
            acceptFriendRequest(userId);
            this.closest('.request').remove();
        });
    });

    document.querySelectorAll('.decline-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const userId = this.getAttribute('data-user-id');
            declineFriendRequest(userId);
            this.closest('.request').remove();
        });
    });

    // Handle add friend suggestions
    document.querySelectorAll('.add-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const userId = this.getAttribute('data-user-id');
            sendFriendRequest(userId);
            this.textContent = 'Request Sent';
            this.style.backgroundColor = '#e4e6eb';
            this.style.color = '#4b4f56';
            this.disabled = true;
        });
    });

    // Example functions (would connect to your backend in real app)
    function acceptFriendRequest(userId) {
        console.log(`Accepted friend request from ${userId}`);
        // In a real app: fetch('/api/accept-friend', { method: 'POST', body: JSON.stringify({userId}) })
    }

    function declineFriendRequest(userId) {
        console.log(`Declined friend request from ${userId}`);
        // In a real app: fetch('/api/decline-friend', { method: 'POST', body: JSON.stringify({userId}) })
    }

    function sendFriendRequest(userId) {
        console.log(`Sent friend request to ${userId}`);
        // In a real app: fetch('/api/send-request', { method: 'POST', body: JSON.stringify({userId}) })
    }
});

// =====LIKE COUNT========
document.addEventListener('DOMContentLoaded', function() {
    // Get all like buttons
    const likeButtons = document.querySelectorAll('.like-btn');
    
    // Add click event to each like button
    likeButtons.forEach(button => {
        // Track liked state for each button
        let isLiked = false;
        
        button.addEventListener('click', function() {
            // Find the span element that contains the like count
            const likeCountSpan = this.querySelector('span');
            const icon = this.querySelector('i');
            
            // Get the current like count
            let likeCount = parseInt(likeCountSpan.textContent);
            
            if (!isLiked) {
                // Like the post
                likeCountSpan.textContent = likeCount + 1;
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.style.color = '#ff0000';
                isLiked = true;
            } else {
                // Unlike the post
                likeCountSpan.textContent = likeCount - 1;
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.style.color = ''; // Reset to default color
                isLiked = false;
            }
        });
    });
});

//=========== #TRENDING TAGS=============
document.addEventListener('DOMContentLoaded', function() {
    // Sample content database
    const trendContent = {
        "GPT-5": {
            title: "GPT-5 Rumors",
            posts: [
                "OpenAI insiders suggest multimodal capabilities beyond text",
                "Expected to handle 1M+ token context windows",
                "Potential release at DevDay 2024"
            ],
            color: "#10a37f" // OpenAI green
        },
        "AppleVision": {
            title: "Apple Vision Pro Dev Kits",
            posts: [
                "First developer units shipping this week",
                "New visionOS beta includes hand tracking improvements",
                "500+ apps already confirmed for launch"
            ],
            color: "#000000" // Apple black
        },
        "Web3": {
            title: "EU Web3 Regulations",
            posts: [
                "New MiCA laws taking effect next month",
                "Stablecoin requirements causing industry shifts",
                "How this affects NFT marketplaces"
            ],
            color: "#f7931a" // Crypto orange
        },
        "RustLang": {
            title: "Rust in Linux",
            posts: [
                "Kernel 6.8 includes first Rust components",
                "Performance benchmarks vs C",
                "Why Torvalds changed his mind"
            ],
            color: "#dea584" // Rust orange
        },
        "AR": {
            title: "Meta AR Glasses",
            posts: [
                "Project Nazare prototype leaks",
                "Hands-free interface demonstrated",
                "Potential 2026 consumer release"
            ],
            color: "#1877f2" // Meta blue
        }
    };

    // Handle clicks
    document.querySelectorAll('.hashtag-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const hashtag = this.getAttribute('data-hashtag');
            const content = trendContent[hashtag];
            
            // Create stylish alert
            showStyledAlert(content.title, content.posts, content.color || "#1d9bf0");
            
            // Update UI
            document.querySelector('.trending h3').textContent = `#${hashtag} • Trending`;
            document.querySelector('.trending h3').style.color = content.color || "#1d9bf0";
        });
    });

    // Custom styled alert function
    function showStyledAlert(title, posts, color) {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
        overlay.style.zIndex = '1000';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        
        // Create alert box
        const alertBox = document.createElement('div');
        alertBox.style.backgroundColor = 'white';
        alertBox.style.borderRadius = '12px';
        alertBox.style.padding = '20px';
        alertBox.style.width = '80%';
        alertBox.style.maxWidth = '500px';
        alertBox.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        
        // Create title
        const titleEl = document.createElement('h3');
        titleEl.textContent = `TRENDING: ${title}`;
        titleEl.style.margin = '0 0 15px 0';
        titleEl.style.color = color;
        titleEl.style.fontSize = '1.2rem';
        
        // Create posts list
        const postsList = document.createElement('div');
        posts.forEach(post => {
            const postEl = document.createElement('p');
            postEl.textContent = `• ${post}`;
            postEl.style.margin = '8px 0';
            postEl.style.color = '#333';
            postsList.appendChild(postEl);
        });
        
        // Create footer
        const footer = document.createElement('p');
        footer.textContent = '(Would normally display full content feed)';
        footer.style.margin = '15px 0 0 0';
        footer.style.color = '#666';
        footer.style.fontSize = '0.9rem';
        footer.style.fontStyle = 'italic';
        
        // Create close button
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Close';
        closeBtn.style.marginTop = '15px';
        closeBtn.style.padding = '8px 16px';
        closeBtn.style.backgroundColor = color;
        closeBtn.style.color = 'white';
        closeBtn.style.border = 'none';
        closeBtn.style.borderRadius = '20px';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.float = 'right';
        
        // Assemble components
        alertBox.appendChild(titleEl);
        alertBox.appendChild(postsList);
        alertBox.appendChild(footer);
        alertBox.appendChild(closeBtn);
        overlay.appendChild(alertBox);
        document.body.appendChild(overlay);
        
        // Close functionality
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(overlay);
        });
        
        overlay.addEventListener('click', (e) => {
            if(e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });
    }
});

//=======PROFILE STATS ------ FOLLOWERS ...==================
document.addEventListener('DOMContentLoaded', function() {
    // Sample data
    const contentData = {
        posts: {
            title: "Recent Posts (245)",
            items: [
                { image: "https://cdn.pixabay.com/photo/2020/01/29/06/39/boy-4801688_640.jpg", caption: "Sunset at the beach 🌅" },
                { image: "https://cdn.pixabay.com/photo/2022/11/03/15/24/coffee-7567749_640.jpg", caption: "Working on a new project!" },
                { image: "https://cdn.pixabay.com/photo/2020/04/01/18/01/espresso-4992122_640.jpg", caption: "Morning coffee ☕" },
                { image: "https://cdn.pixabay.com/photo/2017/08/07/20/48/animals-2607704_640.jpg", caption: "Meet my new buddy!" },
                { image: "https://cdn.pixabay.com/photo/2018/09/27/17/34/seafood-dinner-3707538_640.jpg", caption: "Delicious dinner 🍽️" },
                { image: "https://cdn.pixabay.com/photo/2021/05/01/13/32/road-6221011_640.jpg", caption: "Exploring new places" }
            ]
        },
        followers: {
            title: "Followers (1,234)",
            items: [
                { avatar: "https://randomuser.me/api/portraits/women/33.jpg", name: "Sophia Turner", username: "sophiat" },
                { avatar: "https://randomuser.me/api/portraits/men/22.jpg", name: "Robert Downey", username: "robertd" },
                { avatar: "https://randomuser.me/api/portraits/women/22.jpg", name: "Sarah Johnson", username: "sarahj" },
                { avatar: "https://randomuser.me/api/portraits/men/45.jpg", name: "Michael Scott", username: "michaels" },
                { avatar: "https://randomuser.me/api/portraits/women/55.jpg", name: "Emily Clark", username: "emilyc" }
            ]
        },
        following: {
            title: "Following (543)",
            items: [
                { avatar: "https://randomuser.me/api/portraits/women/65.jpg", name: "Emma Watson", username: "emmawatson" },
                { avatar: "https://randomuser.me/api/portraits/men/85.jpg", name: "Chris Evans", username: "chrisevans" },
                { avatar: "https://randomuser.me/api/portraits/women/44.jpg", name: "Jessica Parker", username: "jessicap" },
                { avatar: "https://randomuser.me/api/portraits/men/32.jpg", name: "John Smith", username: "johns" },
                { avatar: "https://randomuser.me/api/portraits/women/28.jpg", name: "Lisa Ray", username: "lisar" }
            ]
        }
    };

    // DOM elements
    const modal = document.getElementById('stats-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.close-modal');

    // Handle stat clicks
    document.querySelectorAll('.stat-item').forEach(item => {
        item.addEventListener('click', function() {
            const contentType = this.getAttribute('data-content');
            showModal(contentType);
        });
    });

    // Close modal
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Show modal function
    function showModal(type) {
        const data = contentData[type];
        modalTitle.textContent = data.title;
        
        if (type === 'posts') {
            modalBody.innerHTML = `
                <div class="posts-grid">
                    ${data.items.map(post => `
                        <div class="post-item">
                            <img src="${post.image}" alt="Post" class="post-thumbnail">
                            <p class="post-caption">${post.caption}</p>
                        </div>
                    `).join('')}
                </div>
            `;
        } else {
            modalBody.innerHTML = `
                <div class="user-list">
                    ${data.items.map(user => `
                        <div class="user-item">
                            <img src="${user.avatar}" alt="${user.name}" class="user-avatar">
                            <div class="user-info">
                                <div class="user-name">${user.name}</div>
                                <div class="user-username">@${user.username}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    }

    // Close modal function
    function closeModal() {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
});

//===========3dot tougle in post============
document.addEventListener('DOMContentLoaded', function() {
    // Get all ellipsis icons
    const optionButtons = document.querySelectorAll('.fa-ellipsis-h');
    
    // Close any open menus when clicking elsewhere
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.post-options')) {
            document.querySelectorAll('.options-menu').forEach(menu => {
                menu.classList.remove('active');
            });
        }
    });
    
    // Add click handler to each options button
    optionButtons.forEach(button => {
        // Wrap the icon in a container
        const container = document.createElement('div');
        container.className = 'post-options';
        button.parentNode.insertBefore(container, button);
        container.appendChild(button);
        
        // Create the options menu
        const menu = document.createElement('div');
        menu.className = 'options-menu';
        menu.innerHTML = `
            <div class="option-item">
                <i class="fas fa-bookmark"></i>
                <span>Save post</span>
            </div>
            <div class="option-item">
                <i class="fas fa-bell"></i>
                <span>Turn on notifications</span>
            </div>
            <div class="option-item">
                <i class="fas fa-link"></i>
                <span>Copy link</span>
            </div>
            <div class="option-item delete">
                <i class="fas fa-trash"></i>
                <span>Delete post</span>
            </div>
        `;
        container.appendChild(menu);
        
        // Toggle menu on click
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Close all other menus first
            document.querySelectorAll('.options-menu').forEach(m => {
                if (m !== menu) m.classList.remove('active');
            });
            
            // Toggle this menu
            menu.classList.toggle('active');
        });
        
        // Add functionality to menu items
        menu.querySelectorAll('.option-item').forEach(item => {
            item.addEventListener('click', function() {
                const action = this.querySelector('span').textContent;
                alert(`Action: ${action}`);
                menu.classList.remove('active');
                
                // Add actual functionality here
                if (action === 'Delete post') {
                    if (confirm('Are you sure you want to delete this post?')) {
                        item.closest('.post').remove();
                    }
                }
            });
        });
    });
});

// ==============PROFILE EDIT==================
  document.addEventListener('DOMContentLoaded', function() {
            // Get elements
            const editBtn = document.getElementById('edit-profile-btn');
            const editPanel = document.getElementById('edit-profile-panel');
            const closeBtn = document.querySelector('.panel-close-btn');
            const profileForm = document.getElementById('profile-form');
            
            // Open panel when edit button is clicked
            if (editBtn) {
                editBtn.addEventListener('click', function() {
                    console.log("Edit button clicked");
                    editPanel.style.display = 'block';
                });
            }
            
            // Close panel when X is clicked
            if (closeBtn) {
                closeBtn.addEventListener('click', function() {
                    editPanel.style.display = 'none';
                });
            }
            
            // Close panel when clicking outside
            window.addEventListener('click', function(event) {
                if (event.target === editPanel) {
                    editPanel.style.display = 'none';
                }
            });
            
            // Handle form submission
            if (profileForm) {
                profileForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    // Update profile information
                    document.getElementById('profile-name').textContent = document.getElementById('name').value;
                    document.getElementById('profile-username').textContent = document.getElementById('username').value;
                    document.getElementById('profile-bio').textContent = document.getElementById('bio').value;
                    document.getElementById('location').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${document.getElementById('location-input').value}`;
                    document.getElementById('website').innerHTML = `<i class="fas fa-link"></i> ${document.getElementById('website-input').value}`;
                    document.getElementById('profile-img').src = document.getElementById('profile-pic').value;
                    document.getElementById('cover-photo-img').src = document.getElementById('cover-photo').value;
                    
                    // Update website links in posts
                    document.querySelectorAll('.website-link').forEach(el => {
                        el.textContent = document.getElementById('website-input').value;
                    });
                    
                    // Close panel
                    editPanel.style.display = 'none';
                });
            }
        });
        
        // ==========profile post -media-likes==========
        document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and panes
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Show corresponding tab content
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});