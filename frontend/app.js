/* ================= MINI SOCIAL JAVASCRIPT ================= */


/* ================= TOAST ================= */

function showToast(message) {

    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toastMessage");

    toastMessage.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}


/* ================= NAVIGATION ================= */

function showSection(section) {

    const buttons = document.querySelectorAll(".nav-item");

    buttons.forEach(button => {
        button.classList.remove("active");
    });

    if (section === "home") {

        document.querySelector(".nav-item").classList.add("active");

        showToast("Home feed loaded");

    }

    else if (section === "explore") {

        showToast("Explore page coming soon");

    }

}


/* ================= LIKE ================= */

function toggleLike(button) {

    const post = button.closest(".post-card");

    const countElement = post.querySelector(".like-count");

    let count = parseInt(countElement.textContent);

    if (button.classList.contains("liked")) {

        button.classList.remove("liked");

        button.innerHTML = `
            <i class="fa-regular fa-heart"></i>
            Like
        `;

        count--;

    } else {

        button.classList.add("liked");

        button.innerHTML = `
            <i class="fa-solid fa-heart"></i>
            Liked
        `;

        count++;

    }

    countElement.textContent = count;

}


/* ================= SAVE POST ================= */

function savePost(button) {

    button.classList.toggle("saved");

    const icon = button.querySelector("i");

    if (button.classList.contains("saved")) {

        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");

        showToast("Post saved");

    } else {

        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");

        showToast("Post removed from saved");

    }

}


/* ================= SHARE ================= */

function sharePost() {

    if (navigator.share) {

        navigator.share({
            title: "Mini Social",
            text: "Check out this post on Mini Social!"
        });

    } else {

        showToast("Post link copied!");

    }

}


/* ================= FOLLOW ================= */

function toggleFollow(button) {

    if (button.classList.contains("following")) {

        button.classList.remove("following");

        button.textContent = "Follow";

        showToast("Unfollowed");

    } else {

        button.classList.add("following");

        button.textContent = "Following";

        showToast("Now following!");

    }

}


/* ================= COMMENTS ================= */

function focusComment(button) {

    const post = button.closest(".post-card");

    const input = post.querySelector(".comment-input input");

    if (input) {

        input.focus();

        input.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }

}


function submitComment(event) {

    if (event.key !== "Enter") {
        return;
    }

    const input = event.target;

    const text = input.value.trim();

    if (text === "") {
        return;
    }

    const commentsSection =
        input.closest(".comments-section");

    const comment = document.createElement("div");

    comment.className = "comment";

    comment.innerHTML = `

        <img
            src="https://i.pravatar.cc/50?img=47"
            alt="You"
        >

        <div class="comment-content">

            <strong>You</strong>

            <p>${escapeHTML(text)}</p>

        </div>

    `;

    commentsSection.insertBefore(
        comment,
        commentsSection.querySelector(".comment-input")
    );

    input.value = "";

    showToast("Comment added");

}


/* ================= CREATE POST ================= */

function createPost() {

    const input = document.getElementById("postInput");

    const text = input.value.trim();

    if (text === "") {

        showToast("Write something first!");

        return;

    }

    const postsContainer =
        document.getElementById("postsContainer");

    const article = document.createElement("article");

    article.className = "post-card";

    article.innerHTML = `

        <div class="post-header">

            <img
                src="https://i.pravatar.cc/100?img=47"
                alt="Alex Morgan"
            >

            <div class="post-user">

                <h3>Alex Morgan</h3>

                <span>
                    @alexmorgan · Just now
                    <i class="fa-solid fa-earth-americas"></i>
                </span>

            </div>

            <button class="post-menu">
                <i class="fa-solid fa-ellipsis"></i>
            </button>

        </div>


        <div class="post-content">

            <p>${escapeHTML(text)}</p>

        </div>


        <div class="post-stats">

            <span>
                <i class="fa-solid fa-heart"></i>
                <span class="like-count">0</span> likes
            </span>

            <span>
                0 comments · 0 shares
            </span>

        </div>


        <div class="post-actions">

            <button onclick="toggleLike(this)">

                <i class="fa-regular fa-heart"></i>
                Like

            </button>

            <button onclick="focusComment(this)">

                <i class="fa-regular fa-comment"></i>
                Comment

            </button>

            <button onclick="sharePost()">

                <i class="fa-solid fa-share"></i>
                Share

            </button>

            <button onclick="savePost(this)">

                <i class="fa-regular fa-bookmark"></i>

            </button>

        </div>


        <div class="comments-section">

            <div class="comment-input">

                <img
                    src="https://i.pravatar.cc/50?img=47"
                    alt="You"
                >

                <input
                    type="text"
                    placeholder="Write a comment..."
                    onkeydown="submitComment(event)"
                >

            </div>

        </div>

    `;

    postsContainer.prepend(article);

    input.value = "";

    showToast("Your post has been published!");

}


/* ================= POST OPTIONS ================= */

function selectPostOption(type) {

    if (type === "photo") {

        showToast("Photo upload selected");

    }

    else if (type === "video") {

        showToast("Video upload selected");

    }

    else if (type === "feeling") {

        showToast("Feeling selector opened");

    }

}


/* ================= STORIES ================= */

function createStory() {

    showToast("Story creator opened");

}


function viewAllStories() {

    showToast("Showing all stories");

}


/* ================= NOTIFICATIONS ================= */

function showNotifications() {

    document
        .getElementById("notificationPanel")
        .classList.add("show");

}


function closeNotifications(event) {

    if (
        !event ||
        event.target === document.getElementById("notificationPanel")
    ) {

        document
            .getElementById("notificationPanel")
            .classList.remove("show");

    }

}


/* ================= MESSAGES ================= */

function showMessages() {

    showToast("Messages feature opened");

}


/* ================= PROFILE ================= */

function openProfile() {

    showToast("Profile page opened");

}


function toggleProfileMenu() {

    showToast("Profile menu");

}


/* ================= PEOPLE ================= */

function showAllPeople() {

    showToast("Showing all suggestions");

}


/* ================= SEARCH ================= */

const searchInput =
    document.getElementById("searchInput");

searchInput.addEventListener("input", function () {

    const searchTerm =
        this.value.toLowerCase().trim();

    const posts =
        document.querySelectorAll(".post-card");

    posts.forEach(post => {

        const text =
            post.textContent.toLowerCase();

        if (text.includes(searchTerm)) {

            post.style.display = "";

        } else {

            post.style.display = "none";

        }

    });

});


/* ================= ESCAPE HTML ================= */

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


/* ================= KEYBOARD SHORTCUT ================= */

document.addEventListener("keydown", function(event) {

    if (
        event.key === "/" &&
        document.activeElement.tagName !== "INPUT" &&
        document.activeElement.tagName !== "TEXTAREA"
    ) {

        event.preventDefault();

        searchInput.focus();

    }

});


/* ================= INITIALIZATION ================= */

document.addEventListener("DOMContentLoaded", function() {

    console.log("Mini Social loaded successfully.");

});