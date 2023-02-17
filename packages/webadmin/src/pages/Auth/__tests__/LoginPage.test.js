import { render, screen, fireEvent, act } from '@testing-library/react';
import * as ReactRedux from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'store/store';
import { useAppSelector, useAppDispatch } from 'store/hook';
import { server } from 'assets/mocks/server';
import { LoginPage } from '../LoginPage';

const state = {
    ui: {
        message: 'test message',
        info: 'test'
    }
};

jest.mock('store/hook');

const action = jest.fn();
// const mockSubmitAction = jest.fn();

// jest.mock('react-hook-form', () => ({
//     ...jest.requireActual('react-hook-form'),
//     useForm: () => ({
//         ...jest.requireActual('react-hook-form').useForm(),
//         handleSubmit: mockSubmitAction, //() => {console.log('handle submit ->')} //() => mockSubmitAction,
//     }),
// }));

describe('Login Form test', () => {

    beforeAll(() => server.listen());

    beforeEach(() => {
        useAppSelector.mockImplementation(f => f(state));
        useAppDispatch.mockImplementation(() => action);

        render(
            <ReactRedux.Provider store={store}>
                <BrowserRouter>
                    <LoginPage />
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
        // const action = jest.fn();
        // mockDispatcher.mockReturnValue(action);

        const formElement = screen.getByTestId('login-form');
        expect(formElement).toBeInTheDocument();

        const login = screen.getByTestId('login-input');
        expect(login).toBeInTheDocument();

        const password = screen.getByTestId('password-input');
        expect(password).toBeInTheDocument();

        const pwswitch = screen.getByTestId('eye-switch');
        expect(pwswitch).toBeInTheDocument();

        const confirm = screen.getByRole('button', {name: /login/i});
        expect(confirm).toBeInTheDocument();

        const link = screen.getByRole('link');
        expect(link).toBeInTheDocument();
        expect(link.getAttribute('href')).toBe('/restore');

        // expect(useAppDispatch).toHaveBeenCalled();
        // expect(useAppSelector).toHaveBeenCalled();
    });

    test('should submit with correct login and password', async () => {
        await act(() => {
            const login = screen.getByTestId('login-input');
            fireEvent.input(login, {
                target: { value: "LOGINNAME" }
            });
            expect(login.value).toBe("LOGINNAME");
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

        // const cred = await fetch(`/result`).then(res => res.json());
        // expect(cred).toEqual({ name: 'LOGINNAME', password: 'PASSWORD'});

        // after fire submit event test server intercepts API call
        // endpoint = `${CONF.URL}/users/login`, with METHOD='POST' and
        // body = { name: "LOGINNAME", password: "PASSWORD" } and assigns
        // body to global.__TEST__ variable
        // it means, that LoginForm works properly
        expect(global.__TEST__).toEqual({ name: 'LOGINNAME', password: 'PASSWORD'});
    });

    test("should not submit with empty login", async () => {
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

        const cred = await fetch(`/result`).then(res => res.json());

        expect(cred).toEqual({});
    });

    test("should not submit with empty password", async () => {
        await act(() => {
            const login = screen.getByTestId('login-input');
            fireEvent.input(login, {
                target: { value: "LOGINNAME" }
            });
            expect(login.value).toBe("LOGINNAME");
        });

        await act(() => {
            const submit = screen.getByTestId('submit-input');
            fireEvent.submit(submit);
        });

        const cred = await fetch(`/result`).then(res => res.json());

        expect(cred).toEqual({});
    });
})
