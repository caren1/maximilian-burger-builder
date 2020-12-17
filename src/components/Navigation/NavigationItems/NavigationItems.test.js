// *.test.js is important to run the tests

// imported for the purpose of using as an argument to shallow function
import React from 'react'
import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'

// for the enzyme to work we have to first configure it (adapter + configure)
import { configure, shallow } from 'enzyme'
// shallow allows to render content for the component, but it is not loaded deeply

import Adapter from 'enzyme-adapter-react-16'

configure({
    adapter: new Adapter()
})


// takes 2 arguments, test description and actual test scenarios
describe('Navigation Items', () => {

    // also takes 2 arguments and this is individual test scenario (name + function)
    it('should render 2 NavItem, if not authenticated', () => {
        // we want to create an instance of component and then look into it and see if the condition was matched
        // for render we'll use Enzyme that will create a standalone instance of the component, without the need to render whole application
        const wrapper = shallow(<NavigationItems />);

        // then we use expect method, where we define what is the expected result
        // not a JSX element, but regular function
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    })
})