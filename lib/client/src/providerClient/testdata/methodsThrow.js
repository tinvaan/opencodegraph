/** @type {import('@openctx/provider').Provider} */
export default {
    meta() {
        return {}
    },
    items() {
        throw new Error('itemsThrow')
    },
    annotations() {
        throw new Error('annotationsThrow')
    },
}
