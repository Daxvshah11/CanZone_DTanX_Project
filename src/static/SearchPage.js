const typingText = "Find your JAM!!";
const typingDelay = 100; // in milliseconds
let index = 0;
const typingEl = document.getElementById("typing");

function type() {
    typingEl.textContent += typingText[index];

    if (++index < typingText.length) {
        setTimeout(type, typingDelay);
    }
}

setTimeout(type, typingDelay);

/*













*/

// iTunes Search part
const searchBar = document.getElementById('search-bar');
const toggleExplicit = document.getElementById('toggle-explicit');
const resultsContainer = document.getElementById('results-container');
const maxDurationInput = document.getElementById('max-duration-input');

searchBar.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        // Clear previous results
        resultsContainer.innerHTML = '';

        const query = searchBar.value;
        const explicit = toggleExplicit.checked ? 'yes' : 'no';
        const maxDuration = parseInt(maxDurationInput.value) || 100;;

        // Make API request
        fetch(`https://itunes.apple.com/search?term=${query}&entity=song&explicit=${explicit}`)
            .then(response => response.json())
            .then(data => {
                const results = data.results.filter(result => {
                    const durationInMinutes = result.trackTimeMillis / 60000;
                    return durationInMinutes <= maxDuration;
                }).slice(0, 10);

                // checking if the result is empty or not
                if (results.length === 0) {
                    const noResultsDiv = document.createElement('div');
                    noResultsDiv.textContent = 'No matches found!';
                    noResultsDiv.style.fontWeight = 'bold';
                    noResultsDiv.style.fontSize = '40px';
                    resultsContainer.appendChild(noResultsDiv);
                }
                else {
                    results.forEach(result => {
                        const resultDiv = document.createElement('div');
                        resultDiv.classList.add('result');

                        const artworkImg = document.createElement('img');
                        artworkImg.classList.add('artwork');
                        artworkImg.src = result.artworkUrl60;

                        const detailsDiv = document.createElement('div');
                        detailsDiv.classList.add('details');

                        const songName = document.createElement('div');
                        songName.classList.add('song-name');
                        songName.textContent = result.trackName;

                        const artistName = document.createElement('div');
                        artistName.classList.add('artist-name');
                        artistName.textContent = result.artistName;

                        const duration = document.createElement('div');
                        duration.classList.add('duration');
                        const minutes = Math.floor(result.trackTimeMillis / 60000);
                        const seconds = Math.floor((result.trackTimeMillis % 60000) / 1000);
                        duration.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

                        const previewButton = document.createElement('button');
                        previewButton.classList.add('preview-button');
                        previewButton.innerHTML = '<span class="play-icon"></span>';

                        previewButton.addEventListener('click', function () {
                            const previewAudio = new Audio(result.previewUrl);
                            previewAudio.play();
                        });

                        detailsDiv.append(songName, artistName, duration, previewButton);
                        resultDiv.append(artworkImg, detailsDiv);
                        resultsContainer.append(resultDiv);
                    });
                }
            })
            .catch(error => console.error(error));
    }
});

const clearFiltersButton = document.getElementById('clear-filters-button');

clearFiltersButton.addEventListener('click', function () {
    toggleExplicit.checked = false;
    maxDurationInput.value = '';
});