import PageTemplate from '@/components/Templates/Page/PageTemplate'
import PostTemplate from '@/components/Templates/Post/PostTemplate'
import { ContentNode } from '@/gql/graphql'
import { ContentInfoQuery } from '@/queries/general/ContentInfoQuery'
import { SeoQuery } from '@/queries/general/SeoQuery'
import { fetchGraphQL } from '@/utils/fetchGraphQL'
import { nextSlugToWpSlug } from '@/utils/nextSlugToWpSlug'
import { setSeoData } from '@/utils/seoData'
import { print } from 'graphql/language/printer'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Props = {
	params: Promise<{ slug: string }>
	searchParams?: Promise<any>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const theParams = await params
	const slug = nextSlugToWpSlug(theParams?.slug)
	const isPreview = slug.includes('preview')

	const { contentNode } = await fetchGraphQL<{ contentNode: ContentNode }>(
		print(SeoQuery),
		{
			slug: isPreview ? slug.split('preview/')[1] : slug,
			idType: isPreview ? 'DATABASE_ID' : 'URI',
		}
	)

	if (!contentNode) {
		return notFound()
	}

	const metadata = setSeoData({ seo: contentNode?.seo })

	return {
		...metadata,
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}${slug}`,
		},
	} as Metadata
}

export const dynamicParams = true

export async function generateStaticParams() {
	return []
	// return [
	// 	{
	// 		slug: 'sample-page',
	// 	},
	// 	{
	// 		slug: 'test',
	// 	},
	// ]
}

export default async function Page({ params }: Props) {
	const theParams = await params
	const slug = nextSlugToWpSlug(theParams?.slug)
	const isPreview = slug?.includes('preview')
	const { contentNode } = await fetchGraphQL<{ contentNode: ContentNode }>(
		print(ContentInfoQuery),
		{
			slug: isPreview ? slug.split('preview/')[1] : slug,
			idType: isPreview ? 'DATABASE_ID' : 'URI',
		}
	)

	if (!contentNode) return notFound()

	switch (contentNode.contentTypeName) {
		case 'page':
			return <PageTemplate node={contentNode} />
		case 'post':
			return <PostTemplate node={contentNode} />
		default:
			return <p>{contentNode.contentTypeName} not implemented</p>
	}
}
