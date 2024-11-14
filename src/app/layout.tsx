import { Inter } from 'next/font/google'
import { draftMode } from 'next/headers'

import '@/app/globals.css'

import Navigation from '@/components/Globals/Navigation/Navigation'
import { PreviewNotice } from '@/components/Globals/PreviewNotice/PreviewNotice'

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const { isEnabled } = await draftMode()

	return (
		<html lang='en'>
			<body className={`${inter.className} bg-gray-50`}>
				<div className='container mx-auto flex flex-col items-center'>
					{isEnabled && <PreviewNotice />}
					<Navigation />
					<div className='w-full flex flex-col items-center justify-center gap-4 pb-12'>
						{children}
					</div>
				</div>
			</body>
		</html>
	)
}
