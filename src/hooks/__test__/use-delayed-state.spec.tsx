import { act, render } from '@testing-library/react';

import { sleep } from '../../utils/sleep';
import { useDelayedState } from '../use-delayed-state';

function setup<T>(arg: T) {
	const returnVal = {};
	function TestComponent() {
		Object.assign(returnVal, useDelayedState(arg));
		return null;
	}
	render(<TestComponent />);
	return returnVal as { [key: number]: any };
}

const INITIAL_STATE = 'initial state';
const UPDATED_STATE = 'updated state';
const UPDATE_DELAY = 100;
const CANCEL_DELAY = UPDATE_DELAY / 2;

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
	it(`update state with ${UPDATE_DELAY} milliseconds delay`, async () => {
		const results = setup(INITIAL_STATE);
		act(() => {
			results[1](UPDATED_STATE, UPDATE_DELAY);
		});
		expect(results[0]).toBe(INITIAL_STATE);
		await act(() => sleep(UPDATE_DELAY));
		expect(results[0]).toBe(UPDATED_STATE);
	});
	it(`cancel state update with ${UPDATE_DELAY}ms delay after ${CANCEL_DELAY}ms`, async () => {
		const results = setup(INITIAL_STATE);
		act(() => {
			results[1](UPDATED_STATE, UPDATE_DELAY);
		});
		expect(results[0]).toBe(INITIAL_STATE);
		await act(() => sleep(CANCEL_DELAY));
		await act(() => results[2]());
		await act(() => sleep(UPDATE_DELAY));
		expect(results[0]).toBe(INITIAL_STATE);
	});
});
