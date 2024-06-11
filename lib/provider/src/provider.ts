import type {
    AnnotationsParams,
    AnnotationsResult,
    ItemsParams,
    ItemsResult,
    Mention,
    MentionsParams,
    MentionsResult,
    MetaParams,
    MetaResult,
    ProviderSettings,
} from '@openctx/protocol'

const extractUrls = require('extract-urls')

export class LinkedContext<S extends {} = ProviderSettings> {
    contextDepth?: number
    context?: Provider<ProviderSettings>[]

    constructor(S: ProviderSettings) {
        this.context = []
        this.contextDepth = S.contextDepth || 1
    }

    /**
     * Populates context with relevant providers from uri's in mention context.
     */
    populate?(mention: Mention, settings: S): Provider[] {
        // TODO: Check if extracted urls match against any providers
        const urls = extractUrls(mention.data?.content)
        console.error('urls = ', urls)
        return []
    }
}

/**
 * An OpenCtx provider implemented in TypeScript/JavaScript.
 *
 * @template S The type of provider settings.
 */
export interface Provider<S extends {} = ProviderSettings> {
    /**
     * Reports metadata about the provider.
     */
    meta(params: MetaParams, settings: S): MetaResult | Promise<MetaResult>

    mentions?(params: MentionsParams, settings: S): MentionsResult | Promise<MentionsResult>

    /**
     * Returns OpenCtx items.
     */
    items?(params: ItemsParams, settings: S): ItemsResult | Promise<ItemsResult>

    /**
     * Returns OpenCtx annotations for the given file.
     */
    annotations?(params: AnnotationsParams, settings: S): AnnotationsResult | Promise<AnnotationsResult>

    /**
     * Called when the provider will no longer be used. The provider should release its resources,
     * such as event listeners or background routines.
     */
    dispose?(): void
}

/**
 * An OpenCtx provider wrapper for related links.
 *
 * @template S The type of provider settings.
 */
export interface LinkedProvider<S extends {} = ProviderSettings> extends Provider, LinkedContext {}
