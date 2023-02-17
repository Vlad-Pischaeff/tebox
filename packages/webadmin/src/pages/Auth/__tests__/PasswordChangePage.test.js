import { render, screen, fireEvent, act } from '@testing-library/react';
import * as ReactRedux from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'store/store';
import { useAppSelector, useAppDispatch } from 'store/hook';
import { server } from 'assets/mocks/server';
import { PasswordChangePage } from '../PasswordChangePage';

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
                    <PasswordChangePage />
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
        const formElement = screen.getByTestId('reset-form');
        expect(formElement).toBeInTheDocument();

        const password = screen.getByTestId('password-input');
        expect(password).toBeInTheDocument();

        const repeatPassword = screen.getByTestId('repeatpassword-input');
        expect(repeatPassword).toBeInTheDocument();

        const confirm = screen.getByTestId('submit-input');
        expect(confirm).toBeInTheDocument();
    });

    test('should submit with equal passwords fields', async () => {
        await act(() => {
            const password = screen.getByTestId('password-input');
            fireEvent.input(password, {
                target: { value: "PASSWORD" }
            });
            expect(password.value).toBe("PASSWORD");
        });

        await act(() => {
            const repeatPassword = screen.getByTestId('repeatpassword-input');
            fireEvent.input(repeatPassword, {
                target: { value: "PASSWORD" }
            });
            expect(repeatPassword.value).toBe("PASSWORD");
        });

        await act(() => {
            const submit = screen.getByTestId('submit-input');
            fireEvent.submit(submit);
        });

        expect(global.__TEST__.id).toBe('FAKEUSER');
        expect(global.__TEST__.password).toBeDefined();
    });

    test("should not submit with empty passwords", async () => {
        await act(() => {
            const submit = screen.getByTestId('submit-input');
            fireEvent.submit(submit);
        });

        expect(global.__TEST__).toEqual({});
    });

    test("should not submit with single password", async () => {
        await act(() => {
            const password = screen.getByTestId('password-input');
            fireEvent.input(password, {
                target: { value: "PASSWORD" }
            });
            expect(password.value).toBe("PASSWORD");
        });

        await act(() => {
            const submit = screen.getByTestId('submit-input');
            fireEvent.submit(submit);
        });

        expect(global.__TEST__).toEqual({});
    });
})
