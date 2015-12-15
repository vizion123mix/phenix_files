/--Modernizr --/

if(!Modernizr.svg) {

    $('img[src*="svg"]').attr('src', function() {
        return $(this).attr('src').replace('.svg', '.png');
    });

}
$(function(){
	$('#gitSubmit').on('click', function(e){
		e.preventDefault();
		$('#gitData').html('<div id="loader"></div>');
	
		var username = $('#gitUser').val();
		var gitUser   = 'https://api.github.com/users/'+username;
		var gitRepo  = 'https://api.github.com/users/'+username+'/repos';
		
		requestJSON(gitUser, function(json) {
			if(json.message == "Not Found" || username == '') {
				$('#gitData').html("<h2>No User Info Found</h2>");
			}
	
			else {
				var fullname   = json.name;
				var username   = json.login;
				var avatarurl     = json.avatar_url;
				var profileurl = json.html_url;
				var location   = json.location;
				var followersnum = json.followers;
				var followingnum = json.following;
				var reposnum     = json.public_repos;
		
				if(fullname == undefined) { fullname = username; }
		
				var outhtml = '<div class="userNames"><h2>'+fullname+' <span class="smallname">(@<a href="'+profileurl+'" target="_blank">'+username+'</a>)</span></h2></div>';
				outhtml = outhtml + '<div class="userAvatar"><a href="'+profileurl+'" target="_blank"><img src="'+avatarurl+'" width="80" height="80" alt="'+username+'"></a></div>';
				outhtml = outhtml + '<p class="userData">Followers: '+followersnum+' - Following: '+followingnum+'<br>Repos: '+reposnum+'</p>';
				outhtml = outhtml + '<div class="repolist clearfix">';
		
				var repositories;
				$.getJSON(gitRepo, function(json){
					repositories = json;   
					outputPageContent();                
				});          
		
				function outputPageContent() {
					if(repositories.length == 0) { outhtml = outhtml + '<p>No repos!</p></div>'; }
					else {
						outhtml = outhtml + '<h3>Repos List:</h3> <ul>';
						$.each(repositories, function(index) {
							outhtml = outhtml + '<li><a href="'+repositories[index].html_url+'" target="_blank">'+repositories[index].name + '</a></li>';
						});
						outhtml = outhtml + '</ul></div>'; 
					}
					
					$('#gitData').html(outhtml);
				} 
			} 
		});
	}); 
	
	function requestJSON(url, callback) {
		$.ajax({
			url: url,
			complete: function(xhr) {
				callback.call(null, xhr.responseJSON);
			}
		});
	}
});


/--Main --/