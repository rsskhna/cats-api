import React from 'react';
import '@testing-library/jest-dom'
import '../__mocks__/intersectionObserverMock'
import {act} from "react-test-renderer";
import {Provider} from "react-redux";
import store from "../services/store";
import App from '../components/app/app';
import {render, screen} from '@testing-library/react';

describe('App component', () => {
    it('renders the App component', async () => {
        await act(async () => {
            render(
                <Provider store={store}>
                    <App/>
                </Provider>
            );
        });
        screen.debug();
        expect(screen.getByRole('heading', {name: /cats/i}));
    });


});
