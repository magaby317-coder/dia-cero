# DÍA CERO: El 11 de Septiembre y la Transformación del Mundo

> **Micrositio educativo interdisciplinario de alto impacto visual y rigor académico.**

---

## 🏛️ Sobre el Proyecto

**DÍA CERO** es una plataforma educativa concebida para transformar el aprendizaje de un acontecimiento histórico trascendental —los atentados del 11 de septiembre de 2001— en una experiencia inmersiva, sobria, reflexiva y multidisciplinaria.

A diferencia de aproximaciones pedagógicas convencionales, este micrositio articula el estudio del 11-S a través de **8 áreas fundamentales del conocimiento**:

1. **Historia Contemporánea**: Análisis de la geopolítica post-Guerra Fría, la evolución de Al-Qaeda, la invocación del Artículo 5 de la OTAN, la Doctrina Bush de ataque preventivo y las guerras de Afganistán e Irak.
2. **Matemáticas Aplicadas**: Modelos de dimensionamiento geométrico de rascacielos, densidades demográficas verticales, tasas de evacuación civil y cálculo probabilístico de resistencia.
3. **Economía Global**: La parálisis sistémica de Wall Street (4 jornadas cerrado, caída del Dow de -7.1% en un día y pérdida de \$1.4 billones en la semana) y el costo global acumulado (\$8+ billones según el *Costs of War Project* de Brown University).
4. **Ciencias Naturales y Medio Ambiente**: Fisicoquímica del colapso (1.8 millones de toneladas de masa), toxicología del amianto crisotilo, polvo de hormigón fuertemente alcalino (pH 10-11), combustión subterránea activa durante 99 días y epidemiología de más de 71.000 inscritos en el *WTC Health Program*.
5. **Ingeniería Estructural**: El innovador diseño *Framed Tube* (tubo en tubo) de Minoru Yamasaki y Leslie Robertson; 59 columnas de fachada exterior como viga Vierendeel tridimensional, cerchas ligeras de piso con amortiguadores viscoelásticos, núcleo central de acero y la física de la pérdida del 50% de rigidez del acero a 600°C (sin fundición) que provocó el pandeo dinámico progresivo.
6. **Geografía y Aeronáutica**: Rutas y cronologías verificadas de los 4 vuelos (AA11, UA175, AA77, UA93), aeropuertos de origen y destino transcontinental, y el mapa vectorial del cierre del espacio aéreo (Ground Stop de la FAA).
7. **Tecnología e Inteligencia**: Transformación de la seguridad aérea (creación de la TSA, puertas de cabina blindadas con kevlar, escáneres milimétricos 3D, biometría), y debate ético sobre vigilancia digital masiva (Ley USA PATRIOT).
8. **Sociedad y Ética**: *“Humaniza lo que tocas”* — memoria histórica, dilemas de privacidad vs. seguridad, derechos civiles y la construcción de una cultura de paz.

---

## 🎨 Sistema Visual y Tecnologías

- **Estética**: Cinematográfica, sobria, elegante y académica.
- **Paleta de Colores**:
  - Fondo: Negro profundo (`#07080c`) y azul noche (`#0c101a`).
  - Superficies: Grafito esmerilado con Glassmorphism (`rgba(16, 22, 36, 0.75)`).
  - Acentos: Rojo carmesí (`#dc2626` / `#991b1b`) empleado con estricta sobriedad pedagógica.
- **Tecnologías Web**:
  - **HTML5 Semántico**: Estructura accesible con atributos ARIA y optimización SEO.
  - **CSS3 Puro**: Variables CSS, diseño responsive fluido (`clamp()`), animaciones por hardware y soporte para `prefers-reduced-motion`.
  - **JavaScript ES6+**: Canvas de partículas de profundidad sutil, IntersectionObserver, modales accesibles con foco y tecla ESC, contadores numéricos y esquemas interactivos.
  - **Cero dependencias externas pesadas**: Carga instantánea, sin frameworks innecesarios ni rastreadores.

---

## 📂 Estructura del Repositorio

```text
dia-cero/
│
├── index.html              # Archivo principal semántico (preparado para GitHub Pages)
├── styles.css              # Hoja de estilos completa con diseño responsive y temas oscuros
├── script.js               # Lógica interactiva, mapa vectorial, diagramas y modales
├── server.ps1              # Servidor HTTP local para pruebas y desarrollo
├── README.md               # Documentación pedagógica y técnica
│
└── images/                 # Archivos históricos verificados (Dominio público / Archivos federales)
    ├── wtc-aerial-2001.jpg             # Vista aérea de Manhattan en marzo de 2001 (Biblioteca del Congreso)
    ├── wtc-ground-1999.jpg             # Torres Gemelas desde la base en 1999
    ├── wtc-structure-drawing.png       # Esquema estructural Framed Tube del NIST
    ├── pentagon-aerial.jpg             # El Pentágono (Departamento de Defensa)
    ├── flight93-tower-of-voices.jpg    # Memorial Nacional del Vuelo 93 (Servicio de Parques Nacionales)
    └── wtc-1995.jpg                    # Perspectiva del World Trade Center en 1995
```

---

## 🚀 Publicación en GitHub Pages

El proyecto está 100% optimizado para publicarse de forma inmediata en GitHub Pages:

1. Crea un nuevo repositorio en GitHub (por ejemplo, `dia-cero`).
2. Sube los archivos de esta carpeta asegurándote de que `index.html` esté en la **raíz** del repositorio.
3. En GitHub, ve a **Settings** > **Pages**.
4. En **Build and deployment** > **Source**, selecciona `Deploy from a branch`.
5. Elige la rama `main` (o `master`) y la carpeta `/ (root)`. Haz clic en **Save**.
6. En pocos segundos, tu micrositio estará público en:
   `https://tu-usuario.github.io/dia-cero/`

---

## 📚 Fuentes Históricas y Bibliográficas

Todos los datos cronológicos, cifras estructurales y datos epidemiológicos han sido cotejados con fuentes documentales primarias:

- **National Commission on Terrorist Attacks Upon the United States** (2004). *The 9/11 Commission Report*. Washington, D.C.: U.S. Government Printing Office.
- **National Institute of Standards and Technology (NIST)** (2005). *NCSTAR 1: Final Report on the Collapse of the World Trade Center Towers*. Gaithersburg, MD.
- **World Trade Center Health Program** (CDC / NIOSH). *Health Conditions and Research Registry*.
- **Watson Institute for International and Public Affairs, Brown University**. *Costs of War Project (2001–2024)*.
- **Library of Congress Prints and Photographs Division**. *Carol M. Highsmith Archive*.

---

*Proyecto desarrollado con propósitos exclusivamente educativos, pedagógicos y de divulgación histórica.*
