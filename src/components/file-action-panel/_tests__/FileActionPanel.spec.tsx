import '@testing-library/jest-dom';

import { render, userEvent } from '../../../utils/testing-render';
import {
	FILE_ACTION_TEST_SUFFIX,
	FileActionPanel,
	FileActionPanelProps,
} from '../FileActionPanel';

const makeSut = (props: Partial<FileActionPanelProps>) => {
	return render(
		<FileActionPanel
			onDelete={jest.fn()}
			onDownload={jest.fn()}
			setAsCover={jest.fn()}
			removeAsCover={jest.fn()}
			{...props}
		/>,
	);
};

describe('<FileActionPanel />', () => {
	it('check onDelete prop', async () => {
		const onDelete = jest.fn();
		const { getByTestId } = makeSut({
			onDelete,
		});
		const onDeleteBtn = getByTestId(`${FILE_ACTION_TEST_SUFFIX}-delete`);
		await userEvent.click(onDeleteBtn);
		expect(onDelete).toHaveBeenCalled();
	});
	it('check onDownload prop', async () => {
		const onDownload = jest.fn();
		const { getByTestId } = makeSut({
			onDownload,
		});
		const onDownloadBtn = getByTestId(`${FILE_ACTION_TEST_SUFFIX}-download`);
		await userEvent.click(onDownloadBtn);
		expect(onDownload).toHaveBeenCalled();
	});
	it('check setAsCover prop when do not have a video thumbnail', async () => {
		const setAsCover = jest.fn();
		const { getByTestId } = makeSut({
			setAsCover,
			hasImageCover: false,
		});
		const onSetAsCoverBtn = getByTestId(
			`${FILE_ACTION_TEST_SUFFIX}-setAsCover`,
		);
		// await userEvent.click(onSetAsCoverBtn);
		console.log(onSetAsCoverBtn);
		expect(onSetAsCoverBtn).toBeDisabled();
	});
	it('check setAsCover prop when we have a video thumbnail', async () => {
		const setAsCover = jest.fn();
		const { getByTestId } = makeSut({
			setAsCover,
			hasImageCover: true,
		});
		const onSetAsCoverBtn = getByTestId(
			`${FILE_ACTION_TEST_SUFFIX}-setAsCover`,
		);
		await userEvent.click(onSetAsCoverBtn);
		expect(setAsCover).toHaveBeenCalledTimes(1);
	});

	it('check removeAsCover props when is cover', async () => {
		const removeAsCover = jest.fn();
		const { getByTestId } = makeSut({
			removeAsCover,
			isCover: true,
		});
		const onRemoveAsCoverBtn = getByTestId(
			`${FILE_ACTION_TEST_SUFFIX}-removeAsCover`,
		);
		await userEvent.click(onRemoveAsCoverBtn);
		expect(removeAsCover).toHaveBeenCalledTimes(1);
	});
});
