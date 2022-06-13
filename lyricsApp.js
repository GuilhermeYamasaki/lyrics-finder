function findLyrics(artist, song) {
  return fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`)
}

const form = document.querySelector('#lyrics_form')
form.addEventListener('submit', el => {
    el.preventDefault()
    doSubmit()
})

async function doSubmit() {
    const lyrics_el = document.querySelector('#lyrics')
    const artist = document.querySelector('#artist')
    const song = document.querySelector('#song')

    lyrics_el.innerText = '<div class="spinner-grow" role="status"><span class="sr-only">Loading...</span></div>'

    try {
        const lyricsResponse = await findLyrics(artist.value, song.value)
        const data = await lyricsResponse.json()
        if(data.lyrics){
            lyrics_el.innerText = data.lyrics
        } else {
            lyrics_el.innerText = data.error
        }
    } catch (err) {
        console.log(err)
    }
}