/**
 * A list of posts with details for a mock social media application. Each post includes information
 * such as the profile image of the poster, the author's name, the location where the post was made,
 * the main image of the post, icons for interacting with the post (like, comment, send),
 * the number of likes, comments from friends, and arrays to hold new comments and their authors.
 */
let posts = [
  {
    profileImage: "./img/Me-img-instagram-DA.png",
    author: "Erdal",
    location: "Antalya",
    picturePost: "./img/image-post-antalya.png",
    loveIconWhite: "./img/love-white-icon.png",
    loveIconRed: "./img/love-red-icon.png",
    commentsIcon: "./img/comments-icon.png",
    sendIcon: "./img/send-icon.png",
    likes: "127",
    friendname: ["Susanna"],
    friendPost: ["Wow! Sieht ja lecker aus!"],
    newComment: [],
    newCommentAuthor: ["Erdal", "Susanna", "Sefa", "Burcu"],
  },
  {
    profileImage: "./img/story-pic-1.png",
    author: "Antje",
    location: "New York",
    picturePost: "./img/2.jpg",
    loveIconWhite: "./img/love-white-icon.png",
    loveIconRed: "./img/love-red-icon.png",
    commentsIcon: "./img/comments-icon.png",
    sendIcon: "./img/send-icon.png",
    likes: "34",
    friendname: ["Erdal"],
    friendPost: ["Sehr schönes Foto!"],
    newComment: [],
    newCommentAuthor: ["Erdal", "Susanna", "Sefa", "Burcu"],
  },
  {
    profileImage: "./img/story-pic-2.png",
    author: "Ajala",
    location: "Andalusien",
    picturePost: "./img/7.jpg",
    loveIconWhite: "./img/love-white-icon.png",
    loveIconRed: "./img/love-red-icon.png",
    commentsIcon: "./img/comments-icon.png",
    sendIcon: "./img/send-icon.png",
    likes: "97",
    author: "Ajala",
    friendname: ["Ajala"],
    friendPost: [
      "Die Alhambra in Granada auf dem Sabikah-Hügel ist die berühmteste Sehenswürdigkeit in Andalusien",
    ],
    newComment: [],
    newCommentAuthor: ["Erdal", "Susanna", "Sefa", "Burcu"],
  },
  {
    profileImage: "./img/story-pic-3.jpg",
    author: "Charu",
    location: "",
    picturePost: "./img/3.jpg",
    loveIconWhite: "./img/love-white-icon.png",
    loveIconRed: "./img/love-red-icon.png",
    commentsIcon: "./img/comments-icon.png",
    sendIcon: "./img/send-icon.png",
    likes: "24",
    friendname: ["Ajala"],
    friendPost: ["Cool :)"],
    newComment: [],
    newCommentAuthor: ["Erdal", "Susanna", "Sefa", "Burcu"],
  },
];

/**
 * Saves the current state of `posts` to local storage. This function ensures that the posts
 * are available even after the page is refreshed, by converting the `posts` array to a JSON string
 * and storing it under the key "posts".
 */
function savePostsToLocalStorage() {
  localStorage.setItem("posts", JSON.stringify(posts));
}

/**
 * Loads posts from local storage and updates the `posts` array. This function checks if there
 * are any saved posts in local storage. If saved posts are found and they form a valid array,
 * the `posts` variable is updated with these posts. This ensures that the application can maintain
 * state across page reloads.
 */
function loadPostsFromLocalStorage() {
  const savedPosts = JSON.parse(localStorage.getItem("posts"));
  if (savedPosts && Array.isArray(savedPosts)) {
    posts = savedPosts;
  }
}

/**
 * Renders the posts in the `posts` array to the HTML document. This function clears the current
 * content and iterates over the `posts` array, adding HTML for each post. It also handles the
 * display of any new comments that have been added to the posts.
 */
function render() {
  let content = document.getElementById("content");
  content.innerHTML = "";
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    content.innerHTML += createPostTemplate(post, i);

    let newComment = document.getElementById(`newComment${i}`);
    for (let j = 0; j < post["newComment"].length; j++) {
      const newCommentAuthor = post["newCommentAuthor"][j];
      const comment = post["newComment"][j];
      newComment.innerHTML += `<div class="comments"><b>${newCommentAuthor}</b>${comment}</div>`;
    }
  }
}

/**
 * Adds a new comment to a post. The function takes the index of the post in the `posts` array
 * and adds a new comment from the corresponding input field. If the comment is not empty,
 * it updates the post's comments and saves the updated posts to local storage.
 * @param {number} index - The index of the post to which the comment is being added.
 */
function addNewComment(index) {
  let input = document.getElementById(`input${index}`);
  let comment = input.value;
  if (comment.trim() !== "") {
    posts[index]["newComment"].push(comment);
    savePostsToLocalStorage();
    render();
  } else {
    alert("Ein leerer Kommentar kann nicht hinzugefügt werden.");
  }
}

/**
 * Toggles the like state of a post and updates the like counter. This function changes the
 * like icon from white to red (and vice versa) and updates the number of likes for the post.
 * It also ensures that these changes are saved to local storage.
 * @param {number} i - The index of the post in the `posts` array.
 */
function addLike(i) {
  let loveImg = document.getElementById(`loveImg${i}`);
  let loveWhite = "./img/love-white-icon.png";
  let loveRed = "./img/love-red-icon.png";
  let likes = document.getElementById(`likeCounter${i}`);

  if (loveImg.getAttribute("src") === loveWhite) {
    loveImg.setAttribute("src", loveRed);
    let currentLikes = parseInt(likes.innerText);
    likes.innerText = currentLikes + 1;
  } else {
    loveImg.src = loveWhite;
    let currentLikes = parseInt(likes.innerText);
    likes.innerText = currentLikes - 1;
  }
  savePostsToLocalStorage();
}

/**
 * Toggles the bookmark state of a post. This function changes the bookmark icon from white to black
 * (and vice versa). The changes are saved to local storage to ensure persistence.
 * @param {number} i - The index of the post in the `posts` array.
 */
function addBookmark(i) {
  let bookmarkImg = document.getElementById(`bookmark${i}`);
  let bookmarkWhite = "./img/bookmark-white-icon.png";
  let bookmarkBlack = "./img/bookmark-black-icon.png";

  if (bookmarkImg.getAttribute("src") === bookmarkWhite) {
    bookmarkImg.setAttribute("src", bookmarkBlack);
  } else {
    bookmarkImg.src = bookmarkWhite;
  }
  savePostsToLocalStorage();
}

/**
 * Creates the HTML template for a post. This function generates a string of HTML based on the details
 * of a post object and the index of the post in the `posts` array. The template includes sections for
 * the post's author, image, interaction icons (like, comment, bookmark), and comments.
 * @param {Object} post - The post object containing details for the post.
 * @param {number} i - The index of the post in the `posts` array.
 * @returns {string} The HTML string for the post's template.
 */
function createPostTemplate(post, i) {
  return `
        <div class="Post">
            <div class="post-author">
                <div class="author">
                    <img src="${post["profileImage"]}" alt="">
                    <span><b>${post["author"]}</b><br>${post["location"]}</span>
                </div>
                <img class="dots" src="./img/dots-icon.png" alt="">
            </div>

            <div class="picture-profile-1 image-profile">
                <img src="${post["picturePost"]}" alt="">
            </div>

            <div class="vote-section-container">
                <div>
                    <img onclick="addLike(${i})" id="loveImg${i}" src="./img/love-white-icon.png" alt="">
                    <img src="./img/comments-icon.png" alt="">
                    <img src="./img/send-icon.png" alt="">
                </div>
                <div>
                    <img onclick="addBookmark(${i})" id="bookmark${i}" src="./img/bookmark-white-icon.png" alt="">
                </div>
            </div>

            <div class="likes-section">
                <b>
                    <p>Gefällt</p>
                    <span id="likeCounter${i}">${post["likes"]}</span>
                    <p>Mal</p>
                </b>
            </div>

            <div class="comments">
                <p><b>${post["friendname"]}</b></p>
                <p>${post["friendPost"]}</p>
            </div>

            <div id="newComment${i}"></div>

            <div class="new-comment">                
                <input id="input${i}" type="text" size="50" style='width: 420px;' placeholder="Kommentar...">
                <button onclick="addNewComment(${i})">Posten</button>                
            </div>
        </div>
    `;
}

loadPostsFromLocalStorage();
