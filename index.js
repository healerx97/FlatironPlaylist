// SPOTIFY SEARCH FUNCTIONS
const client_ID = 'badf019474334b82a55c72dbb75f3739'
const client_secret = '9dc25589bf2f4c9e9d2e30edbc9b1556'
const token = 'BQBP_sGIBcl5vYKTWx8qzHbjpL3ozm2H9YFCA0XckmFCXRR9MSJhnDjXwnOPiUMF4b0z85VW-qyTVokSDMI2wknhmfdUl091a_4HIVf1gN-Ii4uGWWUoLw8O7xIkwVOKXf_tfGPqnaZzegNg6NBiYic2lu304hq4F2c70dCYCbR_n-O4rF3pWYwNd9UCV56S_58bV2-xdNC_6i9TLCGEOVPtOJ8MqcBVaX_aAtSZPS8C6wMj-2CMr35WTBm-Xtod-shQwBhvhntg2hoqEtQSqaM'

function searchSpotify(search) {
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
        //data organization into labels
        trackList.forEach(track => {
            let trackName = track.name
            let artists = []
            track.artists.forEach(artist => {
                artists.push(artist.name)
            })
            let albumName = track.album.name
            let albumImageURL = track.album.images[0].url
            let trackDuration = track['duration_ms']
            let obj = {
                "track name" : trackName,
                "artists" : artists,
                "album" : albumName,
                "image" : albumImageURL,
                "duration" : trackDuration
            }
            console.log(obj)
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