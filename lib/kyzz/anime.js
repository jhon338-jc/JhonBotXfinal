import { kyzzGet } from './client.js'

export async function getHanimeTrending() {
    return kyzzGet('/api/anime-hen/hanime/trending')
}

export async function getHentaiTvGenres() {
    return kyzzGet('/api/anime-hen/hentaitv/genres')
}

export async function getHentaiTvTrending() {
    return kyzzGet('/api/anime-hen/hentaitv/trending')
}