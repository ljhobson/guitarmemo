window.onload = function(event) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", window.location.href + "posts");
	xhr.onload = function() {
		if (xhr.status === 200) {
			var posts = JSON.parse(xhr.response);
			
			var element = document.getElementsByClassName("posts")[0];
			
			for (var i = 0; i < posts.length; i++) {
				element.innerHTML += (generatePost(posts[i]));
			}
		}
	}
	xhr.send();
}

function generatePost(post) {
	
	var string = `
		<div class="post">
			<a class="caption">${post.caption}</a>
			<img src="${post.media_url}" style="width:100%;">
		</div>`;
	return string;
}
