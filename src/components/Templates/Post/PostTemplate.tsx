import { print } from 'graphql/language/printer'

import { ContentNode, Post } from '@/gql/graphql'
import { fetchGraphQL } from '@/utils/fetchGraphQL'

import { PostQuery } from './PostQuery'

interface TemplateProps {
	node: ContentNode
}

export default async function PostTemplate({ node }: TemplateProps) {
	const { post } = await fetchGraphQL<{ post: Post }>(print(PostQuery), {
		id: node.databaseId,
	})
	const date = new Date(String(post.date)).toLocaleDateString('en')

	return (
		<div className='flex flex-col gap-6 items-start w-full'>
			<header className='flex flex-col gap-2 items-center p-4 w-full bg-gray-100 rounded-xl'>
				<h1 className='font-bold capitalize text-3xl'>{post.title}</h1>
				<div className='font-serif text-gray-400'>
					By {post.author?.node.name} on {date}
				</div>
			</header>

			<div
				className='flex flex-col gap-4'
				dangerouslySetInnerHTML={{ __html: post.content || '' }}
			/>
		</div>
	)
}
