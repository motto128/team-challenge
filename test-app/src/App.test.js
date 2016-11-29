import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

describe('submitt button component', () => {

  it('Submit with all valid', () => {
     const wrapper = shallow(<SignUpForm />);
  });

});