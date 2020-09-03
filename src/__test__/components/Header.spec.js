import React from 'react'
import { mount } from 'enzyme';
import Header from './../../components/header';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
const middlewares = [thunk];

const mockStore = configureStore();

const initialState = {
    rootReducer:{
        mainReducer:{
            queryParams:"Canvas"
        }
    }
    
}
let store = mockStore(initialState);

describe("Header component", () => {
    let prop = { }
    it(`should do some stuff on window resize event`, () => {
        const component = mount(<Provider store={store}><Header {...prop} /></Provider>)
        expect(component).toHaveLength(1);
        let instance = component.instance(); 
        expect(instance).toBeDefined();
    
    });
})
