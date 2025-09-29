import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import { resolvedIncidentType } from './resolvedIncidentType'

export const schema = {
  types: [blockContentType, categoryType, postType, authorType, resolvedIncidentType],
}
