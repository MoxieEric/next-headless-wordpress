import { print } from 'graphql/language/printer'
import Link from 'next/link'

import styles from './Navigation.module.css'

import { MenuItem, RootQueryToMenuItemConnection } from '@/gql/graphql'
import { fetchGraphQL } from '@/utils/fetchGraphQL'
import gql from 'graphql-tag'

async function getData() {
	const menuQuery = gql`
		query MenuQuery {
			menuItems(where: { location: PRIMARY_MENU }) {
				nodes {
					uri
					target
					label
				}
			}
		}
	`

	const { menuItems } = await fetchGraphQL<{
		menuItems: RootQueryToMenuItemConnection
	}>(print(menuQuery))

	if (menuItems === null) {
		throw new Error('Failed to fetch data')
	}

	return menuItems
}

export default async function Navigation() {
	const menuItems = await getData()

	return (
		<nav
			className={styles.navigation}
			role='navigation'
			itemScope
			itemType='http://schema.org/SiteNavigationElement'
		>
			{menuItems.nodes.map((item: MenuItem, index: number) => {
				if (!item.uri) return null

				return (
					<Link
						itemProp='url'
						href={`/de${item.uri}`}
						key={index}
						target={item.target || '_self'}
						className='px-4 py-2 uppercase font-semibold text-teal-600 hover:text-teal-800'
					>
						<span itemProp='name'>{item.label}</span>
					</Link>
				)
			})}
		</nav>
	)
}
