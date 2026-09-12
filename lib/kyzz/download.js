import { kyzzGet } from './client.js'

export async function downloadFacebook(url) {
    if (!url) throw new Error('url is required')

    return kyzzGet('/api/download/facebook', { url })
}

export async function downloadGithub(repo, ref) {
    if (!repo) throw new Error('repo is required')

    const params = { repo }
    if (ref) params.ref = ref

    return kyzzGet('/api/download/github', params)
}

export async function downloadInstagram(url) {
    if (!url) throw new Error('url is required')

    return kyzzGet('/api/download/instagram', { url })
}

export async function downloadTiktok(url) {
    if (!url) throw new Error('url is required')

    return kyzzGet('/api/download/tiktok', { url })
}