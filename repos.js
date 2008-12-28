$(function() {
	var limit = 10        // how many repos to list
	var login = 'badboy' // your username

	$.getJSON('http://github.com/api/v1/json/' + login + '?callback=?', function(data) {
		var repos = $.grep(data.user.repositories, function() {
			return !this.fork
		})

		repos.sort(function(a, b) {
			return a.watchers - b.watchers
		})
		
		//repos = $.makeArray(repos);
		//alert(repos[0].url);
		//var nrepos = $.map(repos, function(e) {
		//	return '<li><a href="' + e.url + '">&quot;' + e.name + '&quot;</a></li>'
		//})
		//alert(nrepos[0]);
		var i = 0;
		var len = repos.length
		if(len > limit) len = limit;

		$('#repos').text('');
		$.each(repos.slice(0, len), function(ind, val) {
			if(ind+1 == len)
				$('#repos').append('<li><a href="' + val.url + '">&quot;' + val.name + '&quot;</a></li>')
			else
				$('#repos').append('<li><a href="' + val.url + '">&quot;' + val.name + '&quot;</a>,</li>')
		})
	})
})
