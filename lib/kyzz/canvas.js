import { kyzzGet, kyzzPostMultipart, appendMedia } from './client.js'

export async function fakeFfDuo(user1, user2, template) {
    if (!user1) throw new Error('user1 is required')
    if (!user2) throw new Error('user2 is required')

    const params = { user1, user2 }
    if (template) params.template = template

    return kyzzGet('/api/canvas/ffduo', params)
}

export async function fakeFfGirl(username, template) {
    if (!username) throw new Error('username is required')

    const params = { username }
    if (template) params.template = template

    return kyzzGet('/api/canvas/ffgirl', params)
}

export async function fakeFf(username, lobby) {
    if (!username) throw new Error('username is required')

    const params = { username }
    if (lobby) params.lobby = lobby

    return kyzzGet('/api/canvas/fake-ff', params)
}

export async function fakeGopay({ saldo, koin, terpakai, bulan } = {}) {
    if (saldo === undefined || saldo === null || saldo === '') {
        throw new Error('saldo is required')
    }

    const params = { saldo }
    if (koin !== undefined) params.koin = koin
    if (terpakai !== undefined) params.terpakai = terpakai
    if (bulan !== undefined) params.bulan = bulan

    return kyzzGet('/api/canvas/fake-gopay', params)
}

export async function fakeMl({ avatar, username, rank, border } = {}) {
    const params = {}
    if (avatar) params.avatar = avatar
    if (username) params.username = username
    if (rank) params.rank = rank
    if (border) params.border = border

    return kyzzGet('/api/canvas/fake-ml', params)
}

export async function fakeNgl(text) {
    if (!text) throw new Error('text is required')

    return kyzzGet('/api/canvas/fake-ngl', { text })
}

export async function fakeOvo(saldo) {
    if (saldo === undefined || saldo === null || saldo === '') {
        throw new Error('saldo is required')
    }

    return kyzzGet('/api/canvas/fake-ovo', { saldo })
}

export async function fakePakUstadz(text) {
    if (!text) throw new Error('text is required')

    return kyzzGet('/api/canvas/pak-ustadz', { text })
}

export async function goodbyeCard({
    pp,
    avatar,
    image,
    file,
    media,
    background,
    bg,
    name,
    group,
    member
} = {}) {
    const form = new FormData()

    appendMedia(form, 'pp', pp)
    appendMedia(form, 'avatar', avatar)
    appendMedia(form, 'image', image)
    appendMedia(form, 'file', file)
    appendMedia(form, 'media', media)
    if (background) form.append('background', background)
    if (bg) form.append('bg', bg)
    if (name) form.append('name', name)
    if (group) form.append('group', group)
    if (member) form.append('member', member)

    return kyzzPostMultipart('/api/canvas/goodbye', form)
}

export async function qcwa({ avatar, text, username, phone, tag, mode } = {}) {
    const form = new FormData()

    appendMedia(form, 'avatar', avatar)
    if (text) form.append('text', text)
    if (username) form.append('username', username)
    if (phone) form.append('phone', phone)
    if (tag) form.append('tag', tag)
    if (mode) form.append('mode', mode)

    return kyzzPostMultipart('/api/canvas/qcwa', form)
}