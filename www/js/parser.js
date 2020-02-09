
function updatePage(id) {
	location.href = 'http://randomizer/index.php?path=kino&id=' + id;
}

if (document.location.search.slice(0,10) === '?path=kino') {
	let params = window.location.search
    .replace('?','')
    .split('&')
    .reduce(
        function(p,e){
            var a = e.split('=');
            p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
            return p;
        },
        {}
    );

	console.log(params);
	
	let nextID = params.id;
	nextID++;
	console.log(nextID);
	
	setInterval(updatePage(nextID), 10000);
	// 'https://www.kinopoisk.ru/film/299/'

}

