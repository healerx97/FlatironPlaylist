// SPOTIFY SEARCH FUNCTIONS
const client_ID = 'badf019474334b82a55c72dbb75f3739'
const client_secret = '9dc25589bf2f4c9e9d2e30edbc9b1556'
const token = 'BQCQP4ScuCfNBkl8og3tpk7OzqneFoAA_ikz8hdoSB-qWZcF4PyLxX8y21npuvUpmhdgw0dB1CjUQveGSWDD1mHcrs1U7XICzlrf1DHeBzATpKgAX3V4zqs7wuDlGWvzorOEVRuX4KL6l8EbH5yiW_YQ7FKHUb9wN66TUPYPoDVayYIt2AeAvoxR6fAkqLQC_BD42_8KmpbqE4KzFVJDQf5_9yj2KcqgYLz4glGT_5WzNyL8VaqRfuuPptSt-mcwrSgT0AtBs_rIlDF3wol8qV8'

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
            let trackDuration = resultTrack['duration_ms']

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
            searchRow.dataset.img = albumImageURL
            searchRow.dataset.title = trackName
            searchRow.dataset.artist = artists
            searchRow.dataset.album = albumName
            searchRow.dataset.dur = trackDuration
            searchRow.addEventListener('click', showTrack)
            grid.append(searchRow)

            //creating click function for each track
            function showTrack(e) {
                let centerImage = document.querySelector('.center_img')
                let centerTitle = document.querySelector('.center_track')
                let centerArtist = document.querySelector('.center_artist')
                let centerAlbum = document.querySelector('.center_album')
                let centerDuration = document.querySelector('.center_duration')
                centerImage.src = albumImageURL
                centerTitle.textContent = trackName
                centerArtist.textContent = artists
                centerAlbum.textContent = albumName
                centerDuration.textContent = trackDuration
            }


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

//Figure Out HTML

// 1. Search Bar: Hidden 'li' that are css styled to display search results
// 2. Adding relevant id-tags to html
// 3. On the very bottom (footer?)
//   -- double click on a result => play
// 4. On the right
//   -- playlist (rendering data from db.json)
// 5. In the Middle
//   -- click on a search result => display in more detail

