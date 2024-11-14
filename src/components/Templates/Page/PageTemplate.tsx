import { ContentNode, Page } from '@/gql/graphql'
import { fetchGraphQL } from '@/utils/fetchGraphQL'
import { print } from 'graphql/language/printer'
import { PageQuery } from './PageQuery'

interface TemplateProps {
	node: ContentNode
}

export default async function PageTemplate({ node }: TemplateProps) {
	const { page } = await fetchGraphQL<{ page: Page }>(print(PageQuery), {
		id: node.databaseId,
	})

	return (
		<div
			className='flex flex-col gap-6'
			dangerouslySetInnerHTML={{ __html: page?.content || '' }}
		/>
	)
}
