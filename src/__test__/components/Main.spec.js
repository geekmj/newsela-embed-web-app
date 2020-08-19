import React from 'react'
import { mount,shallow } from 'enzyme';
import Main from './../../components/main';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
const middlewares = [thunk];

const mockStore = configureStore();

const initialState = {
    rootReducer:{
        mainReducer:{
            resultsData:[]
        }
    }
}
let store = mockStore(initialState);

describe("Main component", () => {
    let prop = {
        location:{
            search:"abc"
        }
     }
    const component = mount(<Provider store={store}><Main {...prop} /></Provider>)
    it(`render without crashing`, () => {
        const component = mount(<Provider store={store}><Main {...prop} /></Provider>)
        expect(component).toHaveLength(1);
        let instance = component.instance(); 
        expect(instance).toBeDefined();
    
    });
})
