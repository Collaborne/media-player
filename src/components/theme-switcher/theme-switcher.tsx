import { FC } from 'react';

import { MaterialUISwitch, MaterialUIFormLabel } from './theme-switcher.styled';

interface ThemeSwitcherProps {
	onSwitchTheme: () => void;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ onSwitchTheme }) => {
	return (
		<MaterialUIFormLabel
			control={
				<MaterialUISwitch
					sx={{ s: 1 }}
					defaultChecked
					onChange={onSwitchTheme}
				/>
			}
			label="Themes Switcher"
			sx={{
				position: 'absolute',
				right: 60,
				top: 60,
			}}
		/>
	);
};
