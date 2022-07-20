import { mount } from '@vue/test-utils';
import { Navbar } from '@/components/Navbar.vue';

describe('Navbar.vue', () => {
	it('renders props.msg when passed', () => {
		const wrapper = mount(Navbar, {
			props: {
				pageTitle: 'Local kegs',
			},
		});
		expect(wrapper.text()).toMatch('Local kegs');
	});
});
