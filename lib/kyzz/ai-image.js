import { kyzzPostMultipart, appendMedia } from './client.js'

export async function editImage(media, prompt) {
    if (!media) throw new Error('media is required')
    if (!prompt) throw new Error('prompt is required')

    const form = new FormData()
    appendMedia(form, 'media', media)
    form.append('prompt', prompt)

    return kyzzPostMultipart('/api/ai-image/edit-image', form)
}