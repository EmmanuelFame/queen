document.addEventListener("DOMContentLoaded", () => {
  const postsContainer = document.getElementById("posts")
  const postForm = document.getElementById("postForm")

  if (postsContainer) {
    // Load posts from local storage
    const posts = JSON.parse(localStorage.getItem("posts")) || []
    posts.forEach((post, index) => {
      const postElement = document.createElement("div")
      postElement.classList.add(
        "bg-white",
        "shadow-md",
        "rounded-lg",
        "overflow-hidden",
        "mb-6"
      )

      postElement.innerHTML = `
              <img class="w-full h-48 object-cover" src="${post.image}" alt="Post Image">
              <div class="p-4">
                  <h2 class="text-2xl font-bold mb-2">${post.title}</h2>
                  <p class="text-gray-700 mb-4" id="post-excerpt-${index}">${post.excerpt}</p>
                  <button onclick="toggleContent(${index})" class="text-blue-500 hover:underline" id="read-more-btn-${index}">Read More</button>
                  <p class="text-gray-700 hidden" id="post-content-${index}">${post.content}</p>
              </div>
          `

      postsContainer.appendChild(postElement)
    })
  }

  if (postForm) {
    postForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const title = document.getElementById("title").value
      const content = document.getElementById("content").value
      const imageInput = document.getElementById("image")
      const reader = new FileReader()

      reader.onload = (e) => {
        const image = e.target.result
        const excerpt = content.split(" ").slice(0, 20).join(" ") + "..."

        const newPost = { title, excerpt, content, image }
        const posts = JSON.parse(localStorage.getItem("posts")) || []
        posts.push(newPost)
        localStorage.setItem("posts", JSON.stringify(posts))
        window.location.href = "index.html"
      }

      reader.readAsDataURL(imageInput.files[0])
    })
  }
})

function toggleContent(index) {
  const excerpt = document.getElementById(`post-excerpt-${index}`)
  const content = document.getElementById(`post-content-${index}`)
  const btn = document.getElementById(`read-more-btn-${index}`)

  excerpt.classList.toggle("hidden")
  content.classList.toggle("hidden")

  if (btn.innerText === "Read More") {
    btn.innerText = "Read Less"
  } else {
    btn.innerText = "Read More"
  }
}
