import '@testing-library/jest-dom';
import {defineFeature, loadFeature} from "jest-cucumber";
import {render, screen, waitFor} from "@testing-library/react";
import React from 'react';
import userEvent from "@testing-library/user-event";

const feature = loadFeature('./tests/app/features/example.feature');

defineFeature(feature, test => {

    test('Permite Acceso', ({given, when, and, then}) => {

        given('que el usuario visualiza el formulario para ingresar al sistema', () => {
            render(<Login/>);
        });

        when(/^ingrese nickname "(.*)" y su password "(.*)"$/, async (nickname, password) => {
            const inputUser = screen.getByLabelText(/Usuario/i);
            userEvent.type(inputUser, nickname);
            const inputPassword = screen.getByLabelText(/Password/i);
            userEvent.type(inputPassword, password);
            const buttonLogin = screen.getByRole('button', {name: 'Ingresar'});
            await userEvent.click(buttonLogin);
        });

        then('el sistema valida que el nickname y contraseña son validos', async () => {
            expect(screen.queryByText('Usuario y/o contraseña inválidos')).not.toBeInTheDocument();
        });
    });

    test('Error de acceso', ({ given, when, then }) => {
        given('que el usuario visualiza el formulario para ingresar al sistema', () => {
            render(<Login/>);
        });

        when(/^ingresa nickname "(.*)" y password "(.*)"$/, async (nickname, password) => {
            const inputUser = screen.getByLabelText(/Usuario/i);
            userEvent.type(inputUser, nickname);
            const inputPassword = screen.getByLabelText(/Password/i);
            userEvent.type(inputPassword, password);
            const buttonLogin = screen.getByRole('button', {name: 'Ingresar'});
            await userEvent.click(buttonLogin);
        });

        then('el sistema muestra un mensaje que “Usuario y/o contraseña inválidos”', () => {
            expect(screen.queryByText('Usuario y/o contraseña inválidos')).toBeInTheDocument();
        });
    });
});