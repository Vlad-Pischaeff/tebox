import { render, screen, fireEvent, act } from '@testing-library/react';
import * as ReactRedux from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'store/store';
import { useAppSelector, useAppDispatch } from 'store/hook';
import { server } from 'assets/mocks/server';
import { SignupPage } from '../SignupPage';

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
                    <SignupPage />
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
        const formElement = screen.getByTestId('signup-form');
        expect(formElement).toBeInTheDocument();

        const login = screen.getByTestId('name-input');
        expect(login).toBeInTheDocument();

        const password = screen.getByTestId('password-input');
        expect(password).toBeInTheDocument();

        const pwswitch = screen.getByTestId('eye-switch');
        expect(pwswitch).toBeInTheDocument();

        const confirm = screen.getByTestId('submit-input');
        expect(confirm).toBeInTheDocument();
    });

    test('should submit with correct username, email and password', async () => {
        await act(() => {
            const name = screen.getByTestId('name-input');
            fireEvent.input(name, {
                target: { value: "USERNAME" }
            });
            expect(name.value).toBe("USERNAME");
        });

        await act(() => {
            const email = screen.getByTestId('email-input');
            fireEvent.input(email, {
                target: { value: "MAIL@MAIL.COM" }
            });
            expect(email.value).toBe("MAIL@MAIL.COM");
        });

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

        expect(global.__TEST__)
            .toEqual({ name: 'USERNAME', email: 'MAIL@MAIL.COM', password: 'PASSWORD'});
    });

    test("should not submit with empty username", async () => {
        await act(() => {
            const email = screen.getByTestId('email-input');
            fireEvent.input(email, {
                target: { value: "MAIL@MAIL.COM" }
            });
            expect(email.value).toBe("MAIL@MAIL.COM");
        });

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

    test("should not submit with empty email", async () => {
        await act(() => {
            const name = screen.getByTestId('name-input');
            fireEvent.input(name, {
                target: { value: "USERNAME" }
            });
            expect(name.value).toBe("USERNAME");
        });

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

    test("should not submit with empty password", async () => {
        await act(() => {
            const name = screen.getByTestId('name-input');
            fireEvent.input(name, {
                target: { value: "USERNAME" }
            });
            expect(name.value).toBe("USERNAME");
        });

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

        expect(global.__TEST__).toEqual({});
    });

})
