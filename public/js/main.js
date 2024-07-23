document.addEventListener('DOMContentLoaded', () => {
  window.toggleCommentSection = function(blogId) {
    const commentSection = document.getElementById(`comment-section-${blogId}`);
    if (commentSection) {
      commentSection.style.display = commentSection.style.display === 'none' ? 'block' : 'none';
    }
  };
});

function likePost(blogId) {
  fetch(`/blog/like/${blogId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      window.location.reload();
    } else {
      console.error('Error liking the post');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
}
