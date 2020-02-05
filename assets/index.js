document.addEventListener('DOMContentLoaded', () => {
  const authToken = document.querySelector('meta[name="movie-db-token"]').getAttribute('content');
  const apiKey = document.querySelector('meta[name="movie-db-key"]').getAttribute('content');
  const resultList = document.querySelector('.result-list');
  fetch(`https://api.themoviedb.org/4/list/3?api_key=${apiKey}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer ${authToken}`,
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  })
    .then(response => response.json())
    .then(response => {
      if (Array.isArray(response.results)) {
        resultList.innerHTML = response.results.map(result => `
          <div class="movie">
            <div class="cover">
              <img src="https://image.tmdb.org/t/p/w500/${result.poster_path}" alt="${result.title}" />
              <div class="popularity">${parseInt(result.popularity)}%</div>
            </div>
            <div class="meta">
              <div class="content">
                <div class="title">${result.title}</div>
                <div class="overview">${result.overview}</div>
              </div>
            </div>
            <div class="controls">
              <div class="button">More info</div>
            </div>
          </div>
        `).join('\n');
      } else {
        resultList.innerHTML = '';
      }
    })
    .catch(error => {
      console.log('Looks like there was a problem: \n', error);
    });
});
