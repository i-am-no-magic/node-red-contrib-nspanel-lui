import { EntitiesPageNode } from '../lib/entities-page-node'
import { STR_PAGE_TYPE_CARD_GRID } from '../lib/nspanel-constants'
import { IEntityBasedPageConfig } from '../types/types'

interface PageGridConfig extends IEntityBasedPageConfig {}

const MAX_ENTITIES = 6

module.exports = (RED) => {
    class PageGridNode extends EntitiesPageNode<PageGridConfig> {
        constructor(config: PageGridConfig) {
            super(config, RED, { pageType: STR_PAGE_TYPE_CARD_GRID, maxEntities: MAX_ENTITIES })
        }
    }

    RED.nodes.registerType('nspanel-page-grid', PageGridNode)
}
