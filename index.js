// SPOTIFY SEARCH FUNCTIONS


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
        console.log(trackList[0])
        let grid = document.querySelector('.return_search')
        //resetting ul everytime search is clicked
        grid.innerHTML = ""

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
            grid.append(artworkCell,titleArtistCell,albumNameCell,durationCell)



        }
        //displays all search results
        trackList.forEach(track => {
            renderSearch(track)
            
            //creating click function for each track
            function showTrack() {
                
            }
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

