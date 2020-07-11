import React from 'react';
import StaticProfile from './StaticProfile';
// Test
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createShallow } from '@material-ui/core/test-utils';
// Material-UI
import withStyles from '@material-ui/core/styles/withStyles';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

configure({adapter: new Adapter()});

describe('<StaticProfile />', () => {
	let shallow;
	let wrapper;

	const myProps = {
		profile: {},
		classes: {}
	}

	beforeEach(() => {
		shallow = createShallow();
		wrapper = shallow(<StaticProfile {...myProps} />);
	})

	it('should render a Paper element', () => {
		expect(wrapper.dive().find(Paper)).toHaveLength(1);
	})
})
