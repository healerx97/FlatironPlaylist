// SPOTIFY SEARCH FUNCTIONS
const client_ID = 'badf019474334b82a55c72dbb75f3739'
const client_secret = '9dc25589bf2f4c9e9d2e30edbc9b1556'
const token = 'BQBQXoT6dw6wfBJUgdW0s4CUUxSQPdfng3XkdNo_DSixGG0i2xpZ8BesRkSMz6LcqVrnQbYlsIyHRcaVdLhm4Dtb7xEZRwsAAzFzkUW4bMRs62EEgKrIPVwLnnThMPjJIQLsdiSeUpducH9Nhv0nTWy7ylACVlVG9zUB_vwgscOtedRRb1d3UMhD-bVGfmR09JWk5dvEeTXhyGTIPfUC8TNa-QTYb2943YqXmCiTMQ9fg92ZsA4mWZpSvN43rXQhCeHh9Bfdpn3HvFrr4Hhcke8'

document.addEventListener('DOMContentLoaded', initiate)


function initiate() {
    document.getElementsByClassName('searchForm')[0].addEventListener('submit', searchSpotify)
}



function searchSpotify(e) {
    e.preventDefault()
    let search = e.target['search_input'].value
    fetch(`https://api.spotify.com/v1/search?q=${search}&type=track&limit=10`, {
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    })
    .then(res=>res.json())
    .then(data=> {
        let trackList = data.tracks.items
        let grid = document.querySelector('.search_result_div')
        let rightGrid = document.querySelector('.playlist_div')
        //resetting ul everytime search is clicked
        grid.innerHTML = `<div class="return_search">
                            <div class="artwork">album artwork</div>
                            <div class="contain_name_and_artist">
                                <div class="track_name">Track Name</div>
                                <div class="track_artist">Track artist</div>
                            </div>
                            <div class="album_name">Album name</div>
                            <div class="duration">Duration</div>
                        </div>`

        //function for rendering 1 search result
        function renderSearch(resultTrack) {
            let trackName = resultTrack.name
            let artists = []
            resultTrack.artists.forEach(artist => {
                artists.push(artist.name)
            })
            let albumName = resultTrack.album.name
            let albumImageURL = resultTrack.album.images[0].url
            let trackDuration = msToHMS(resultTrack['duration_ms'])

            let searchRow = document.createElement('div')
            let artworkCell = document.createElement('div')
            let titleArtistCell = document.createElement('div')
            let albumNameCell = document.createElement('div')
            let durationCell = document.createElement('div')
            //artwork
            artworkCell.className = "artwork"
            let img = document.createElement('img')
            img.src = albumImageURL
            img.alt = albumImageURL
            img.className = "mini-album-cover"
            artworkCell.appendChild(img)
            //name and artist
            titleArtistCell.className = "contain_name_and_artist"
            let titleCell = document.createElement('div')
            let artistCell = document.createElement('div')
            titleCell.className = "track_name"
            titleCell.textContent = trackName
            artistCell.className = "track_artist"
            artistCell.textContent = artists
            titleArtistCell.append(titleCell, artistCell)
            //album name
            albumNameCell.className = "album_name"
            albumNameCell.textContent = albumName
            //duration
            durationCell.className = "duration"
            durationCell.textContent = trackDuration

            searchRow.className = "return_search"
            searchRow.append(artworkCell,titleArtistCell,albumNameCell,durationCell)
            // searchRow.dataset.img = albumImageURL
            // searchRow.dataset.title = trackName
            // searchRow.dataset.artist = artists
            // searchRow.dataset.album = albumName
            // searchRow.dataset.dur = trackDuration
            searchRow.addEventListener('click', showTrackSearch)
            grid.append(searchRow)

            //creating click function for each track
            function showTrackSearch(e) {
                document.querySelector('.center').innerHTML = `
                    <img class="center_img" src="https://files.radio.co/humorous-skink/staging/default-artwork.png">
                    <h3 class="center_track"></h3>
                    <h4 class="center_artist">ARTIST NAME</h4>
                    <h4 class="center_album">ALBUM NAME</h4>
                    <h5 class="center_duration">DURATION</h5>`
                let centerImage = document.querySelector('.center_img')
                let centerTitle = document.querySelector('.center_track')
                let centerArtist = document.querySelector('.center_artist')
                let centerAlbum = document.querySelector('.center_album')
                let centerDuration = document.querySelector('.center_duration')
                let centerAdd = document.createElement('button')
                centerImage.src = albumImageURL
                centerTitle.textContent = trackName
                centerArtist.textContent = artists
                centerAlbum.textContent = albumName
                centerDuration.textContent = trackDuration
                let trackObj = {
                    "Title" : `${trackName}`,
                    "Artist" : `${artists}`,
                    "Album" : `${albumName}`,
                    "Duration" : `${trackDuration}`,
                    "Url" : `${albumImageURL}`
                }
                centerAdd.className = "center_add"
                centerAdd.textContent = "ADD"
                centerAdd.addEventListener('click', e=>{
                    e.preventDefault()
                    fetch('http://localhost:3000/playlist', {
                        method: "POST",
                        mode: 'cors',
                        headers: {
                            "Content-Type" : "application/json"
                        },
                        body: JSON.stringify(trackObj)
                    })
                    .then(res=>res.json())
                    .then(data=> {
                        renderPlaylist()
                    })
                    .catch(error=> console.log(error))
                    
                })
                document.querySelector('.center').append(centerAdd)
            }


        }
    function renderPlaylist() {
        fetch('http://localhost:3000/playlist')
        .then(res=> res.json())
        .then(tracks=> {
            document.querySelector('.playlist_div').innerHTML = `
                <div class="right_playlist">
                <div class="artwork">
                    <img class="mini-album-cover" src="https://files.radio.co/humorous-skink/staging/default-artwork.png">
                </div>
                <div class="contain_name_and_artist">
                    <div class="track_name">Track Name</div>
                    <div class="track_artist">Track artist</div>
                </div>
                <div class="album_name">Album name</div>
                <div class="duration">Duration</div>`
            tracks.forEach(playlistTrack=>{
                let playlistRow = document.createElement('div')
                let artworkCell = document.createElement('div')
                let titleArtistCell = document.createElement('div')
                let albumNameCell = document.createElement('div')
                let durationCell = document.createElement('div')
                //artwork
                artworkCell.className = "artwork"
                let img = document.createElement('img')
                img.className = "mini-album-cover"
                img.src = playlistTrack.Url
                artworkCell.appendChild(img)
                //name and artist
                titleArtistCell.className = "contain_name_and_artist"
                let titleCell = document.createElement('div')
                let artistCell = document.createElement('div')
                titleCell.className = "track_name"
                titleCell.textContent = playlistTrack.Title
                artistCell.className = "track_artist"
                artistCell.textContent = playlistTrack.Artist
                titleArtistCell.append(titleCell, artistCell)
                //album name
                albumNameCell.className = "album_name"
                albumNameCell.textContent = playlistTrack.Album
                //duration
                durationCell.className = "duration"
                durationCell.textContent = playlistTrack.Duration
                playlistRow.id = playlistTrack.id
                playlistRow.append(artworkCell,titleArtistCell,albumNameCell,durationCell)
                playlistRow.addEventListener('click', showTrackPlaylist)
                rightGrid.append(playlistRow)

                // showing playlist in center
                function showTrackPlaylist(e) {
                    document.querySelector('.center').innerHTML = `
                        <img class="center_img" src="https://files.radio.co/humorous-skink/staging/default-artwork.png">
                        <h3 class="center_track"></h3>
                        <h4 class="center_artist">ARTIST NAME</h4>
                        <h4 class="center_album">ALBUM NAME</h4>
                        <h5 class="center_duration">DURATION</h5>`
                    let trackID = e.target.id
                    let centerImage = document.querySelector('.center_img')
                    let centerTitle = document.querySelector('.center_track')
                    let centerArtist = document.querySelector('.center_artist')
                    let centerAlbum = document.querySelector('.center_album')
                    let centerDuration = document.querySelector('.center_duration')
                    let centerDel = document.createElement('button')
                    centerImage.src = playlistTrack.Url
                    centerTitle.textContent = playlistTrack.Title
                    centerArtist.textContent = playlistTrack.Artist
                    centerAlbum.textContent = playlistTrack.Album
                    centerDuration.textContent = playlistTrack.Duration

                    centerDel.className = "center_Del"
                    centerDel.textContent = "DEL"
                    centerDel.addEventListener('click', ()=>{
                        fetch(`http://localhost:3000/playlist/${playlistTrack.id}`, {
                            method: "DELETE",
                            headers: {
                                "Content-Type" : "application/json"
                            }
                        })
                        .then(res=> res.json())
                        .then(data => {
                            renderPlaylist()
                        })
                    })
                    document.querySelector('.center').append(centerDel)
                }
            })
        })
    }
        //displays all search results
        trackList.forEach(track => {
            renderSearch(track)
            //creating add-to-playlist function for each track
            function addToPlaylist() {

            }




        })
        
    })
    //we need to filter search results
    //display filtered search results on html
    //add button on every track so it displays detailed-view
    //add button on every track so that it sends the data to db.json when clicked
    //things we need: Artist(s), AlbumName, AlbumImageURL, TrackName, Track Duration
}



function msToHMS(ms) {
    let s = Math.floor(ms/1000)%60
    s = s.toString()
    let m = Math.floor(ms/(1000*60))%60
    m = m.toString()
    if (s.length == 1) {
        return m + ":0" + s
    } else {
        return m + ":" + s
    }
}
//Figure Out HTML

// 1. Search Bar: Hidden 'li' that are css styled to display search results
// 2. Adding relevant id-tags to html
// 3. On the very bottom (footer?)
//   -- double click on a result => play
// 4. On the right
//   -- playlist (rendering data from db.json)
// 5. In the Middle
//   -- click on a search result => display in more detail
