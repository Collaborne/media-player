import { act, render } from '@testing-library/react';

import { useDelayedState } from '../use-delayed-state';

function setup<T>(arg: T) {
	const returnVal = {};
	function TestComponent() {
		Object.assign(returnVal, useDelayedState(arg));
		return null;
	}
	render(<TestComponent />);
	return returnVal;
}

const INITIAL_STATE = 'initial state';
const UPDATED_STATE = 'updated state';
const UPDATE_DELAY = 100;

describe('use-delayed-state', () => {
	it('state initialization', () => {
		const results = setup(INITIAL_STATE);
		expect(results[0]).toBe(INITIAL_STATE);
	});
	it('update state with 0 delay', () => {
		const results = setup(INITIAL_STATE);
		act(() => {
			results[1](UPDATED_STATE, 0);
		});
		expect(results[0]).toBe(UPDATED_STATE);
	});
	it(`update state with ${UPDATE_DELAY} milliseconds delay`, () => {
		const results = setup(INITIAL_STATE);
		act(() => {
			results[1](UPDATED_STATE, UPDATE_DELAY);
		});
		expect(results[0]).toBe(INITIAL_STATE);

		setTimeout(() => {
			expect(results[0]).toBe(UPDATED_STATE);
		}, UPDATE_DELAY);
	});
});
