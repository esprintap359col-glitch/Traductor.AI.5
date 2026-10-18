# Traductor.AI — compilación de APK con GitHub Actions

Este proyecto usa HTML/CSS/JavaScript y Capacitor, sin Flutter.

## Cómo generar la APK en GitHub

1. Crea un repositorio en GitHub.
2. Sube **el contenido de esta carpeta ZIP** (no el ZIP como único archivo) a la raíz del repositorio.
3. Abre la pestaña **Actions** del repositorio.
4. Si GitHub pide habilitar Actions, acepta.
5. Selecciona **Build Traductor.AI APK** y pulsa **Run workflow**, o espera a que termine la ejecución automática al subir los archivos.
6. Abre la ejecución más reciente cuando aparezca una marca verde.
7. Al final, en **Artifacts**, descarga `TraductorAI-debug-apk`.
8. Descomprime ese ZIP descargado: dentro estará `app-debug.apk`.

## Importante

- La compilación en GitHub requiere que Actions esté permitido en el repositorio.
- La APK generada es de depuración para pruebas; no es una versión firmada para publicar en Google Play.
- La app necesita Internet para traducir y para cargar el motor OCR. La traducción usa un servicio público con límites posibles.
- El dictado por voz depende de las funciones disponibles en Android/WebView.
- La función de cámara lee una foto, no traduce vídeo continuo en vivo.
- Este proyecto no se ha compilado ni probado en un teléfono físico en este entorno.
- Para compilar iOS se necesita macOS con Xcode o un servicio de compilación de iOS; el flujo incluido genera únicamente la APK de Android.
