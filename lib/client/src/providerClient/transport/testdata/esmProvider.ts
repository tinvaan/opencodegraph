import type { Provider } from '@openctx/provider'

const provider: Provider = {
    meta: () => ({ selector: [{ path: 'foo' }], name: 'foo' }),
    annotations: () => [],
}

export default provider
