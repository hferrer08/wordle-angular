# 🎯 Wordle Angular

![Angular](https://img.shields.io/badge/Angular-17-red)
![Deploy](https://img.shields.io/badge/Deploy-GitHub%20Pages-blue)

🔗 **Demo en línea:**  
https://hferrer08.github.io/wordle-angular/wordle

Implementación del juego **Wordle** desarrollada en **Angular** como
parte de la actividad voluntaria de la asignatura.

------------------------------------------------------------------------

## 🌐 Deploy en GitHub Pages

La aplicación está desplegada en GitHub Pages y puede probarse en:

🔗 https://hferrer08.github.io/wordle-angular/wordle

El despliegue se realiza generando el build de producción y publicando
la carpeta `dist` en la rama `gh-pages`.

Comando utilizado:

```bash
ng build --base-href /wordle-angular/
npx angular-cli-ghpages --dir=dist/wordle-angular/browser

------------------------------------------------------------------------



## 📌 Descripción

Esta aplicación replica la mecánica clásica del juego Wordle:

-   El jugador dispone de **6 intentos**.
-   Cada intento consiste en una palabra de **5 letras**.
-   Después de validar con **Enter**, las letras cambian de color según
    las reglas:
    -   🟩 Verde: letra correcta en posición correcta.
    -   🟨 Amarillo: letra correcta en posición incorrecta.
    -   ⬜ Gris: letra no presente en la palabra.

El juego finaliza cuando: - El jugador acierta la palabra (gana). - Se
agotan los 6 intentos (pierde).

------------------------------------------------------------------------

## 🚀 Características implementadas

-   ✅ Tablero dinámico de 6x5.
-   ✅ Escritura únicamente en la fila activa.
-   ✅ Validación con tecla **Enter**.
-   ✅ Borrado con **Backspace**.
-   ✅ Bloqueo de filas ya validadas.
-   ✅ Mensaje de victoria o derrota.
-   ✅ Botón **Nueva partida** para reiniciar el juego.
-   ✅ Selección aleatoria de palabra desde un listado interno.

------------------------------------------------------------------------

## 🛠️ Tecnologías utilizadas

-   Angular
-   TypeScript
-   HTML5
-   CSS3

------------------------------------------------------------------------

## ▶️ Cómo ejecutar el proyecto

1.  Clonar el repositorio:

    ``` bash
    git clone https://github.com/hferrer08/wordle-angular.git
    ```

2.  Instalar dependencias:

    ``` bash
    npm install
    ```

3.  Ejecutar el servidor de desarrollo:

    ``` bash
    ng serve
    ```

4.  Abrir en el navegador:

        http://localhost:4200/wordle

------------------------------------------------------------------------

## 📂 Estructura principal

    src/
     └── app/
         └── wordle/
             ├── components/
             │   └── board/
             ├── pages/
             │   └── wordle-page/
             └── services/
                 └── wordle.ts

------------------------------------------------------------------------

## 🎮 Instrucciones de uso

-   Escribe usando el teclado físico.
-   Presiona **Enter** para validar.
-   Usa **Backspace** para borrar.
-   Intenta descubrir la palabra en 6 intentos.

------------------------------------------------------------------------

## 👨‍💻 Autor

Hubert Ferrer Guerrero

------------------------------------------------------------------------

## 📄 Licencia

Proyecto académico desarrollado con fines educativos.
