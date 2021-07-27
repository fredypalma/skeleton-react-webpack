Feature: Acceso al sistema
  Yo como usuario
  Quiero ingresar al sistema
  Para poder utilizar el sistema.

  Scenario: Permite Acceso
    Given que el usuario visualiza el formulario para ingresar al sistema
    When ingrese nickname "OSCOJOSE" y su password "Jesus-123"
    Then el sistema valida que el nickname y contraseña son validos

  Scenario: Error de acceso
    Given que el usuario visualiza el formulario para ingresar al sistema
    When ingresa nickname "OSCOJOE" y password "Jesus-123"
    Then el sistema muestra un mensaje que “Usuario y/o contraseña inválidos”