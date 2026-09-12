import { kyzzGet, kyzzPostJson } from './client.js'

export async function getUserProfile() {
    return kyzzGet('/api/user/profile')
}

export async function renewMembership({ role, days, couponCode, trx_id, trxId } = {}) {
    const body = {}

    if (role !== undefined) body.role = role
    if (days !== undefined) body.days = days
    if (couponCode !== undefined) body.couponCode = couponCode
    if (trx_id !== undefined) body.trx_id = trx_id
    if (trxId !== undefined) body.trxId = trxId

    return kyzzPostJson('/api/user/renew', body)
}

export async function getUserStats() {
    return kyzzGet('/api/user/stats')
}