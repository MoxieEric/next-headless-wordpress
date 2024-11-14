'use client'

import React from 'react'
interface SectionProps {
	blockProps: any
	title: string
}

const Section: React.FC<SectionProps> = ({ blockProps, title }) => {
	return (
		<section
			{...blockProps}
			className={`${blockProps?.className}  w-full text-xl p-x-6 py-12 flex items-center justify-between bg-blue-600 text-white relative`}
		>
			<header className='block bg-white p-4 relative -left-12 max-w-prose'>
				<h1 className='text-blue-600 pl-12'>{title}</h1>
			</header>
			<div className='w-1/2'>
				<img src='https://placehold.co/400' alt='something' />
			</div>
		</section>
	)
}

export { Section }
