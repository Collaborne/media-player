import React, { FC, ReactNode } from 'react';
import { useDemoCardStyles } from './demo-card.styles';

interface DemoCardProps {
	title?: string;
	children: ReactNode;
}

/**
 * A card that is used as decorator vor every story container
 * TODO: implement theme (in case of video player's themes support) and integrate into app
 */
export const DemoCard: FC<DemoCardProps> = ({ children, title }) => {
	const { container, header, title: titleStyle, body } = useDemoCardStyles();
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
