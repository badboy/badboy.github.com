$(function() {
	var limit = 20;       // how many repos to list
	var login = 'badboy'; // your username

	$.getJSON('http://github.com/api/v2/json/repos/show/' + login + '?callback=?', function(data) {
		var repos = $.grep(data.repositories, function(repo) {
			return !repo.fork;
		});

		repos.sort(function(a, b) {
			return ( (+new Date(a.pushed_at)) < (+new Date(b.pushed_at)) ? 1 : -1 );
		});
		
		var len = repos.length;
		if(len > limit) len = limit;

		$('#repos').text('');
		$.each(repos.slice(0, len), function(ind, val) {
            if(val.name == 'badboy.github.com') return;
			if(ind+1 == len)
				$('#repos').append('<li><a href="' + val.url + '">&quot;' + val.name + '&quot;</a></li>');
			else
				$('#repos').append('<li><a href="' + val.url + '">&quot;' + val.name + '&quot;</a>,</li>');
		});
	});
});