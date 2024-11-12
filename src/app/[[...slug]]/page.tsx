import { print } from 'graphql/language/printer'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { setSeoData } from '@/utils/seoData'

import PageTemplate from '@/components/Templates/Page/PageTemplate'
import PostTemplate from '@/components/Templates/Post/PostTemplate'
import { ContentNode } from '@/gql/graphql'
import { ContentInfoQuery } from '@/queries/general/ContentInfoQuery'
import { SeoQuery } from '@/queries/general/SeoQuery'
import { fetchGraphQL } from '@/utils/fetchGraphQL'
import { nextSlugToWpSlug } from '@/utils/nextSlugToWpSlug'

type Props = {
	params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug: rawSlug } = await params
	const slug = nextSlugToWpSlug(rawSlug)
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

	const metadata = setSeoData({ seo: contentNode.seo })

	return {
		...metadata,
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}${slug}`,
		},
	} as Metadata
}

export function generateStaticParams() {
	return []
}

export default async function Page({ params }: Props) {
	const { slug: rawSlug } = await params
	const slug = nextSlugToWpSlug(rawSlug)
	// const slug = nextSlugToWpSlug(await params.slug)
	const isPreview = slug.includes('preview')
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
