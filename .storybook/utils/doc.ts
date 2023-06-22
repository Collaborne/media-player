import { Annotations, BaseStory } from '@storybook/addons';

type OptionalStoryInterface<Args, ReturnType> = Annotations<
	Args,
	ReturnType
> & {
	storyName?: string;
};
export type Story<Args = unknown, ReturnType = unknown> = BaseStory<
	Args,
	ReturnType
> &
	OptionalStoryInterface<Args, ReturnType>;

export function withDescription<A, R>(
	storyDescription: string,
	story: Story<A, R>,
): Story<A, R> {
	story.parameters = {
		...story.parameters,
		docs: {
			...story.parameters?.docs,
			description: {
				...story.parameters?.docs?.description,
				story: storyDescription,
			},
		},
	};

	return story;
}
