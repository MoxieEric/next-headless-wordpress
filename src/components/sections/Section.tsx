'use client'

import classNames from 'classnames'
import React from 'react'

interface SectionProps {
	blockProps: any
	title: string
	reverseAlignment?: boolean
	subtitle?: string
}

const Section: React.FC<SectionProps> = ({
	blockProps,
	title,
	subtitle,
	reverseAlignment,
}) => {
	const twClasses = classNames(
		'w-full text-xl px-6 py-12 flex items-center justify-between bg-blue-600 text-white relative',
		blockProps?.className,
		reverseAlignment && 'flex-row-reverse'
	)
	const headerTwClasses = classNames(
		'block bg-white p-4 relative  w-1/2 max-w-prose',
		reverseAlignment ? '-right-12' : '-left-12'
	)
	return (
		<section {...blockProps} className={twClasses}>
			<header className={headerTwClasses}>
				<h1 className='text-blue-800 pl-12 text-2xl'>{title}</h1>
				{subtitle && (
					<h2 className='text-gray-600 pl-12 text-lg'>{subtitle}</h2>
				)}
			</header>
			<div className='w-1/2'>
				<img src='https://placehold.co/400' alt='something' />
			</div>
		</section>
	)
}

export { Section }
