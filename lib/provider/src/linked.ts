
import type {
    ItemsResult,
    Mention,
    ProviderSettings,
} from '@openctx/protocol'
import { Provider } from './provider.js'


const extractUrls = require('extract-urls')

export class LinkedContext<S extends {} = ProviderSettings> {
    contextDepth?: number
    context?: ItemsResult

    constructor(S: ProviderSettings) {
        this.context = []
        this.contextDepth = S.contextDepth || 1
    }

    /**
     * Populates context with relevant providers from uri's in mention context.
     */
    explore?(mention: Mention, settings: S): ItemsResult {
        // TODO: Check if extracted urls match against any providers
        const urls = extractUrls(mention.data?.content)
        console.error('urls = ', urls)
        return []
    }
}

/**
 * An OpenCtx provider wrapper for related links.
 *
 * @template S The type of provider settings.
 */
export interface LinkedProvider<S extends {} = ProviderSettings> extends Provider, LinkedContext {}
