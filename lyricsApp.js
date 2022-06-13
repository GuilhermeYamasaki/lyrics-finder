function findLyrics(artist, song) {
  return fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`)
}

const form = document.querySelector('#lyrics_form')
form.addEventListener('submit', el => {
    el.preventDefault()
    doSubmit()
})

async function doSubmit() {
    const loading = document.querySelector('#loading')
    const lyrics_el = document.querySelector('#lyrics')
    const artist = document.querySelector('#artist')
    const song = document.querySelector('#song')
    const btnSubmit = document.querySelector('form button[type="submit"]')

    loading.hidden = false
    btnSubmit.disabled = true
    lyrics_el.innerHTML = ''

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