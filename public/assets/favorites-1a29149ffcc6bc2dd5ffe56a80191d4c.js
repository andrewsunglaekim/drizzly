$("#new_favorite").on("submit", function(event){
	event.preventDefault();
	var city = $("#city h2").html();
	var state = $("#state h2").html();
	$("#favorite_city").val(city);
	$("#favorite_state").val(state);
	this.submit();
})

$("#delete_favorite").on("click", function(event){
	event.preventDefault();
	var favoriteId = $(":selected").attr("name");
	console.log(favoriteId)
	var currentUserId = $("#current_user_id").val()
	var url = ("/users/"+currentUserId+"/favorites/" + favoriteId)
	$.ajax({
		type: "DELETE",
		dataType: "json",
		url: url,
		data: {favorite: {id: favoriteId}},
		success: function(response, status, jqXHR){
			var favoriteElementId = "#favorite" + favoriteId
			$(favoriteElementId).remove();
		},
		error: function(){
			alert("couldn't delete favorite");
		}
	})
})

;
