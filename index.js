// SPOTIFY SEARCH FUNCTIONS
const client_ID = 'badf019474334b82a55c72dbb75f3739'
const client_secret = '9dc25589bf2f4c9e9d2e30edbc9b1556'
const token = 'BQBOo0m77_ll84bOWYXAo2w0u5MAZA55wLLGRPvwupR_uu_zjqh5vI6zGziWGJ82F0Tu4vaG4JY-VANB4uswocpoqU30RtRTL1fMLD4ITudK4t5NJRd89_0d5E3sGyxUJuUdAM-y8o6X9eubUarqcBSDXXUgXrMq7XBZFFQ-UodLJX_itBuhiFJedo81M4RdBg1B_bQdzRZExthUVpFxNdjQMXgLLxiOlsm0A2uuL7Vzlpbovm6l1JEI9_HmG05_Vsf8cyN_lJGfF72nvTZ-S68'

function searchSpotify(search) {
    fetch(`https://api.spotify.com/v1/search?q=${search}&type=track&limit=10`, {
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    })
    .then(res=>res.json())
    .then(console.log)
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