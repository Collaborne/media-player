import { FC, ReactNode } from 'react';

import { useDemoCardStyles } from './useDemoCardStyles';

interface DemoCardProps {
	title?: string;
	children: ReactNode;
}

/**
 * A card that is used as decorator for every story container
 */
export const DemoCard: FC<DemoCardProps> = ({ children, title }) => {
	const { container, header, title: titleStyle, body } = useDemoCardStyles().classes;
	return (
		<article className={container}>
			{title && (
				<header className={header}>
					<h1 className={titleStyle}>{title}</h1>
				</header>
			)}
			<section className={body}>{children}</section>
		</article>
	);
};
