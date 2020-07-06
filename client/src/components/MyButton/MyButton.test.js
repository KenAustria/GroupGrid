import React from 'react';
import MyButton from './MyButton';
// Test
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// Icons
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import ChatIcon from '@material-ui/icons/Chat';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

configure({adapter: new Adapter()});

describe('<MyButton />', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<MyButton />);
	})

	it('should render a Tooltip', () => {
		wrapper.setProps({
			title: true,
			tipClassName: true
		})
		expect(wrapper.find(Tooltip)).toHaveLength(1);
	})

	it('should render an IconButton', () => {
		wrapper.setProps({
			onClick: true,
			btnClassName: true
		})
		expect(wrapper.find(IconButton)).toHaveLength(1);
	})
})
