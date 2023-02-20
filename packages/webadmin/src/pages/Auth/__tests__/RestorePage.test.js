import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import * as ReactRedux from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'store/store';
import { useAppSelector, useAppDispatch } from 'store/hook';
import { server } from 'assets/mocks/server';
import { RestorePage } from '../RestorePage';

const state = {
    ui: {
        message: 'test message',
        info: 'test'
    }
};

jest.mock('store/hook');

describe('Login Form test', () => {

    beforeAll(() => server.listen());

    beforeEach(() => {
        useAppSelector.mockImplementation(f => f(state));
        useAppDispatch.mockImplementation(() => jest.fn());

        render(
            <ReactRedux.Provider store={store}>
                <BrowserRouter>
                    <RestorePage />
                </BrowserRouter>
            </ReactRedux.Provider>
        );
    });

    afterEach(async () => {
        jest.clearAllMocks();
        server.resetHandlers();
        await fetch(`/clear`);
    });

    afterAll(() => server.close());

    test('should renders Login Form properly', () => {
        const formElement = screen.getByTestId('restore-form');
        expect(formElement).toBeInTheDocument();

        const login = screen.getByTestId('email-input');
        expect(login).toBeInTheDocument();

        const confirm = screen.getByTestId('submit-input');
        expect(confirm).toBeInTheDocument();
    });

    test('should submit with email', async () => {
        await act(() => {
            const email = screen.getByTestId('email-input');
            fireEvent.input(email, {
                target: { value: "MAIL@MAIL.COM" }
            });
            expect(email.value).toBe("MAIL@MAIL.COM");
        });

        await act(() => {
            const submit = screen.getByTestId('submit-input');
            fireEvent.submit(submit);
        });

        expect(global.__TEST__).toEqual({ email: 'MAIL@MAIL.COM' });
    });

    test("should not submit with empty email", async () => {

        await act(() => {
            const submit = screen.getByTestId('submit-input');
            fireEvent.submit(submit);
        });

        expect(global.__TEST__).toEqual({});
    });

})
