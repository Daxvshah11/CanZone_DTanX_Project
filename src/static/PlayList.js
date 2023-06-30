// const toggleButtons = document.querySelectorAll('.toggle-btn');

// toggleButtons.forEach(button => {
//     button.addEventListener('click', () => {
//         var liElement = button.parentElement;
//         var liElement = liElement.parentElement;
//         const songName = String(liElement.querySelector('span:first-child').textContent);

//         const songDuration = String(liElement.querySelector('span:last-child').textContent);

//         const album = String(document.title);

//         var artist = document.querySelector('.left-columntophits');
//         var artist = artist.querySelector('p');
//         var artist = String(artist.querySelector('b').textContent);

//         const artistID = artist.replace(/\s/g, '');
//         const songid = songName.replace(/\s/g, '');

//         const songID = String(artistID.concat('', songid, ''));

//         fetch('/store_data', {
//             method: 'POST',
//             body: JSON.stringify({ songID: songID, songName: songName, artistName: artist, albumName: album, songDuration: songDuration }),
//             headers: { 'Content-Type': 'application/json' }
//         })
//             .then(response => response.json())
//             .then(Data => {
//                 if (Data.exists) {
//                     alert('The song is already added to your Playlist');
//                 }
//             })
//             .catch(error => console.error(error));
//     });
// });

// const toggleButtons = document.querySelectorAll('.toggle-btn');

// toggleButtons.forEach(button => {
//     button.addEventListener('click', () => {
//         var liElement = button.parentElement;
//         var liElement = liElement.parentElement;
//         const songName = String(liElement.querySelector('span:first-child').textContent);

//         let songDuration = liElement.querySelector('span:last-child').textContent;
//         songDuration = songDuration.replace(/\s/g, '').replace(/\+$/, '');
        

//         const album = String(document.title);

//         var artist = document.querySelector('.left-columntophits');
//         var artist = artist.querySelector('p');
//         var artist = String(artist.querySelector('b').textContent);

//         const artistID = artist;
//         const songid = songName.replace(/\s/g, '');
//         const songID = String(artistID.concat('', songid, '')).replace(/\s/g, '');

//         alert("Song Has been Added");

//         // Send data to server to be stored in database
//         const data = {songName, songDuration, album, artistID, songID};
//         fetch('/store_data', {
//             method: 'POST',
//             body: JSON.stringify(data),
//             headers: {'Content-Type': 'application/json'}
//         });
//     });
// });


const toggleButtons = document.querySelectorAll('.toggle-btn');

toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
        var liElement = button.parentElement;
        var liElement = liElement.parentElement;
        const songName = String(liElement.querySelector('span:first-child').textContent);

        let songDuration = liElement.querySelector('span:last-child').textContent;
        songDuration = songDuration.replace(/\s/g, '').replace(/\+$/, '');

        const album = String(document.title);

        var artist = document.querySelector('.left-columntophits');
        var artist = artist.querySelector('p');
        var artist = String(artist.querySelector('b').textContent);

        const artistID = artist;
        const songid = songName.replace(/\s/g, '');
        const songID = String(artistID.concat('', songid, '')).replace(/\s/g, '');

        // Check if the songID already exists in the playlist.db database
        fetch(`/check_song/${songID}`)
            .then(response => response.json())
            .then(data => {
                if (data.exists) {
                    alert("Song already exists in playlist");
                } else {
                    alert("Song has been added to The Playlist");
                    // Send data to server to be stored in database
                    const data = {songName, songDuration, album, artistID, songID};
                    fetch('/store_data', {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: {'Content-Type': 'application/json'}
                    });
                }
            });
    });
});
