/**
 * DÍA CERO — El 11 de Septiembre y la Transformación del Mundo
 * Lógica interactiva y pedagógica (script.js)
 * Estricta precisión histórica y didáctica multidisciplinaria
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================================================
  // 1. PARTICULAS AMBIENTALES EN CANVAS (PORTADA CINEMATOGRÁFICA)
  // ==========================================================================
  const canvas = document.getElementById('hero-particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    }

    window.addEventListener('resize', resizeCanvas, { passive: true });

    function initParticles() {
      particles = [];
      const count = Math.min(Math.floor(width * 0.05), 65);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.5 + 0.5,
          speedY: -(Math.random() * 0.25 + 0.05),
          speedX: (Math.random() - 0.5) * 0.2,
          opacity: Math.random() * 0.5 + 0.2,
          pulseSpeed: Math.random() * 0.02 + 0.005,
        });
      }
    }

    initParticles();

    function renderParticles() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.opacity += Math.sin(Date.now() * p.pulseSpeed) * 0.005;

        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(203, 213, 225, ${Math.max(0.1, Math.min(0.7, p.opacity))})`;
        ctx.fill();
      });

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(renderParticles);
      }
    }

    if (!prefersReducedMotion) {
      renderParticles();
    }
  }

  // ==========================================================================
  // 2. BARRA DE PROGRESO DE LECTURA Y ENCABEZADO PERSISTENTE
  // ==========================================================================
  const scrollProgress = document.getElementById('scroll-progress');
  const mainHeader = document.getElementById('main-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (scrollProgress) {
      scrollProgress.style.width = `${progress}%`;
      scrollProgress.setAttribute('aria-valuenow', Math.round(progress));
    }

    if (mainHeader) {
      if (scrollTop > 50) {
        mainHeader.classList.add('scrolled');
      } else {
        mainHeader.classList.remove('scrolled');
      }
    }

    // Resaltado dinámico del enlace de navegación activo
    let currentSection = '';
    sections.forEach((sec) => {
      const secTop = sec.offsetTop - 120;
      const secHeight = sec.offsetHeight;
      if (scrollTop >= secTop && scrollTop < secTop + secHeight) {
        currentSection = sec.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // Menú móvil responsive
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const navList = document.getElementById('nav-links');
  if (mobileNavToggle && navList) {
    mobileNavToggle.addEventListener('click', () => {
      const isOpen = navList.classList.toggle('mobile-open');
      mobileNavToggle.setAttribute('aria-expanded', isOpen);
    });

    // Cerrar menú al presionar cualquier enlace
    navList.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navList.classList.remove('mobile-open');
        mobileNavToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ==========================================================================
  // 3. APARICIÓN PROGRESIVA CON INTERSECTION OBSERVER
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach((el) => revealObserver.observe(el));

  // ==========================================================================
  // 4. SISTEMA CENTRAL DE MODALES ACCESIBLES
  // ==========================================================================
  const modalOverlay = document.getElementById('global-modal-overlay');
  const modalContainer = document.getElementById('global-modal-container');
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalBody = document.getElementById('modal-body');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  let lastActiveElement = null;

  function openModal(title, subtitle, contentHtml) {
    lastActiveElement = document.activeElement;
    modalTitle.textContent = title;
    modalSubtitle.textContent = subtitle;
    modalBody.innerHTML = contentHtml;

    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Foco accesible al botón de cerrar
    setTimeout(() => {
      modalCloseBtn.focus();
    }, 50);

    // Inicializar sub-componentes interactivos dentro del modal si existen
    initModalDynamicInteractions();
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    modalBody.innerHTML = '';

    if (lastActiveElement) {
      lastActiveElement.focus();
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // ==========================================================================
  // 5. CONTENIDO MODALES "ANTES Y DESPUÉS" (COMPLEMENTARIO, NUNCA REPETITIVO)
  // ==========================================================================
  const btnOpenAntes = document.getElementById('btn-open-antes');
  const btnOpenDespues = document.getElementById('btn-open-despues');

  if (btnOpenAntes) {
    btnOpenAntes.addEventListener('click', () => {
      openModal(
        'El Mundo del 10 de Septiembre: Anatomía de una Era',
        'ANÁLISIS HISTÓRICO Y MACROECONÓMICO COMPLEMENTARIO',
        `
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <div style="background: rgba(59, 130, 246, 0.08); border-left: 3px solid #3b82f6; padding: 1.25rem; border-radius: 4px;">
            <h4 style="color: #93c5fd; font-size: 1.1rem; margin-bottom: 0.4rem;">La Cultura de la Confianza y la Aviación Desregulada</h4>
            <p style="font-size: 0.95rem; color: #cbd5e1; line-height: 1.65;">
              Hasta la víspera del 11-S, los aeropuertos estadounidenses operaban bajo un esquema de hospitalidad comercial. Las aerolíneas contrataban compañías de seguridad privada con salario mínimo y alta rotación. Los familiares podían cruzar los arcos detectores sin necesidad de boleto para acompañar a los viajeros hasta la misma puerta de embarque.
            </p>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem;">
            <div style="background: rgba(255,255,255,0.03); padding: 1.25rem; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px;">
              <h5 style="color: #ffffff; font-size: 1rem; margin-bottom: 0.5rem;">Objetos Permitidos a Bordo</h5>
              <p style="font-size: 0.9rem; color: #94a3b8; line-height: 1.6;">
                La normativa oficial de la Administración Federal de Aviación (FAA) autorizaba transportar en cabina navajas con hojas metálicas de hasta 10 centímetros (4 pulgadas), tijeras escolares y cúteres utilitarios. Los líquidos, geles y aerosoles de cualquier volumen no estaban sujetos a restricción alguna.
              </p>
            </div>

            <div style="background: rgba(255,255,255,0.03); padding: 1.25rem; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px;">
              <h5 style="color: #ffffff; font-size: 1rem; margin-bottom: 0.5rem;">El World Trade Center como Nodo Neurálgico</h5>
              <p style="font-size: 0.9rem; color: #94a3b8; line-height: 1.6;">
                Las Torres Gemelas no solo albergaban oficinas corporativas; procesaban transacciones financieras equivalentes a un tercio del PIB mundial diario. El sótano y el edificio 7 WTC albergaban el nodo de conmutación de telecomunicaciones y fibra óptica más denso de Norteamérica.
              </p>
            </div>
          </div>

          <div style="background: rgba(255,255,255,0.03); padding: 1.25rem; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px;">
            <h5 style="color: #ffffff; font-size: 1rem; margin-bottom: 0.5rem;">El Paradigma de la Inteligencia: "El Muro Burocrático"</h5>
            <p style="font-size: 0.9rem; color: #cbd5e1; line-height: 1.65;">
              Existía una estricta barrera legal (llamada formalmente el <em>FISA Wall</em>) que impedía que la CIA (inteligencia externa) compartiera información clasificada con el FBI (fuerza penal interna) sin complejas autorizaciones judiciales. Esta compartimentación impidió cruzar los avisos sobre operativos sospechosos inscritos en academias de aviación comercial en Florida y Arizona.
            </p>
          </div>
        </div>
        `
      );
    });
  }

  if (btnOpenDespues) {
    btnOpenDespues.addEventListener('click', () => {
      openModal(
        'El Nuevo Orden Post 11-S: Arquitectura del Control Global',
        'ANÁLISIS INSTITUCIONAL, TECNOLÓGICO Y POLÍTICO COMPLEMENTARIO',
        `
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <div style="background: rgba(220, 38, 38, 0.08); border-left: 3px solid #dc2626; padding: 1.25rem; border-radius: 4px;">
            <h4 style="color: #fca5a5; font-size: 1.1rem; margin-bottom: 0.4rem;">Nacimiento de la TSA y la Ley ATSA (Noviembre 2001)</h4>
            <p style="font-size: 0.95rem; color: #cbd5e1; line-height: 1.65;">
              El Congreso de EE.UU. promulgó la <em>Aviation and Transportation Security Act</em>, creando la <strong>Transportation Security Administration (TSA)</strong> y federalizando a más de 50.000 inspectores. Se instauró la obligatoriedad de escanear el 100% del equipaje facturado con detectores de explosivos (EDS) y se crearon los protocolos universales de inspección biométrica.
            </p>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem;">
            <div style="background: rgba(255,255,255,0.03); padding: 1.25rem; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px;">
              <h5 style="color: #ffffff; font-size: 1rem; margin-bottom: 0.5rem;">Blindaje Estructural de Cabina</h5>
              <p style="font-size: 0.9rem; color: #94a3b8; line-height: 1.6;">
                Se ordenó el rediseño estructural de todas las aeronaves comerciales del mundo: puertas de cabina reforzadas con kevlar y acero balístico, cerrojos electromagnéticos con código y monitoreo con cámaras de video de circuito cerrado hacia el pasillo principal.
              </p>
            </div>

            <div style="background: rgba(255,255,255,0.03); padding: 1.25rem; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px;">
              <h5 style="color: #ffffff; font-size: 1rem; margin-bottom: 0.5rem;">Unificación de 22 Agencias (DHS)</h5>
              <p style="font-size: 0.9rem; color: #94a3b8; line-height: 1.6;">
                En 2002 nació el <strong>Department of Homeland Security (DHS)</strong>, la mayor reestructuración burocrática desde la Segunda Guerra Mundial, fusionando aduanas, fronteras, guardia costera e inmigración bajo un mando unificado para evitar los vacíos de coordinación de 2001.
              </p>
            </div>
          </div>

          <div style="background: rgba(255,255,255,0.03); padding: 1.25rem; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px;">
            <h5 style="color: #ffffff; font-size: 1rem; margin-bottom: 0.5rem;">Ley USA PATRIOT y Vigilancia Digital de Metadatos</h5>
            <p style="font-size: 0.9rem; color: #cbd5e1; line-height: 1.65;">
              Aprobada con celeridad récord en octubre de 2001, la Ley Patriota amplió dramáticamente las capacidades de la NSA y el FBI para intervenir comunicaciones telefónicas, interceptar correos electrónicos y recopilar metadatos de ciudadanos sin orden judicial específica, iniciando el debate moderno sobre los límites entre seguridad nacional y libertades civiles.
            </p>
          </div>
        </div>
        `
      );
    });
  }

  // ==========================================================================
  // 6. HOTSPOTS INTERACTIVOS DE LAS TORRES GEMELAS (4 DISCIPLINAS)
  // ==========================================================================
  const hotspot1 = document.getElementById('hotspot-1');
  const hotspot2 = document.getElementById('hotspot-2');
  const hotspot3 = document.getElementById('hotspot-3');
  const hotspot4 = document.getElementById('hotspot-4');

  const btnMobileHs1 = document.getElementById('btn-mobile-hs1');
  const btnMobileHs2 = document.getElementById('btn-mobile-hs2');
  const btnMobileHs3 = document.getElementById('btn-mobile-hs3');
  const btnMobileHs4 = document.getElementById('btn-mobile-hs4');

  // Trigger Hotspot 1: HISTORIA
  function openHotspotHistoria() {
    openModal(
      '01 — Historia e Impacto Geopolítico Global',
      '¿POR QUÉ EL 11 DE SEPTIEMBRE CAMBIÓ LA HISTORIA MUNDIAL?',
      `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div style="background: rgba(220, 38, 38, 0.08); border-left: 3px solid #dc2626; padding: 1.25rem; border-radius: 4px;">
          <h4 style="color: #fca5a5; font-size: 1.1rem; margin-bottom: 0.4rem;">Guerra Asimétrica y Al-Qaeda</h4>
          <p style="font-size: 0.95rem; color: #cbd5e1; line-height: 1.65;">
            El ataque demostró que un actor no estatal transnacional, con un presupuesto operativo de apenas \$500.000 dólares, podía infligir daños estratégicos y económicos masivos a la mayor potencia militar del planeta utilizando sus propias infraestructuras comerciales civiles como armas guiadas.
          </p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem;">
          <div style="background: rgba(255,255,255,0.03); padding: 1.25rem; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px;">
            <h5 style="color: #ffffff; font-size: 1rem; margin-bottom: 0.4rem;">Artículo 5 de la OTAN</h5>
            <p style="font-size: 0.88rem; color: #94a3b8; line-height: 1.6;">
              Por primera y única vez en la historia de la Alianza Atlántica desde su fundación en 1949, se invocó la cláusula de defensa colectiva: un ataque armado contra un miembro se consideró un ataque contra todas las 19 naciones aliadas.
            </p>
          </div>

          <div style="background: rgba(255,255,255,0.03); padding: 1.25rem; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px;">
            <h5 style="color: #ffffff; font-size: 1rem; margin-bottom: 0.4rem;">Doctrina de Ataque Preventivo</h5>
            <p style="font-size: 0.88rem; color: #94a3b8; line-height: 1.6;">
              La doctrina de seguridad exterior transitó de la contención tradicional y disuasión nuclear a la legitimación de ataques preventivos anticipatorios frente a amenazas difusas antes de que llegaran a materializarse.
            </p>
          </div>
        </div>

        <h4 style="color: #ffffff; font-size: 1.15rem; margin-top: 0.5rem;">Línea Temporal Histórica Interactiva</h4>
        <div class="mini-timeline">
          <div class="timeline-step">
            <span class="step-date">26 de febrero de 1993</span>
            <h5 class="step-title">Atentado con coche bomba en el WTC</h5>
            <p class="step-desc">Detonación de 606 kg de explosivos en el aparcamiento subterráneo de la Torre Norte por extremistas vinculados a Ramzi Yousef. Murieron 6 personas y más de 1.000 resultaron heridas, impulsando las primeras mejoras de evacuación de emergencia.</p>
          </div>

          <div class="timeline-step">
            <span class="step-date">11 de septiembre de 2001</span>
            <h5 class="step-title">Los 4 Ataques Coordinados</h5>
            <p class="step-desc">Secuestro simultáneo de cuatro aviones transcontinentales por 19 terroristas de Al-Qaeda. Impacto en Torre Norte (08:46), Torre Sur (09:03), Pentágono (09:37) y caída en Shanksville (10:03). Mueren 2.977 personas inocentes.</p>
          </div>

          <div class="timeline-step">
            <span class="step-date">7 de octubre de 2001</span>
            <h5 class="step-title">Inicio de la Operación Libertad Duradera</h5>
            <p class="step-desc">Comienza la campaña aérea y terrestre de EE.UU. y el Reino Unido en Afganistán para derrocar al régimen talibán que daba refugio a la cúpula de Al-Qaeda, iniciando el conflicto armado más largo de la historia estadounidense (2001-2021).</p>
          </div>

          <div class="timeline-step">
            <span class="step-date">20 de marzo de 2003</span>
            <h5 class="step-title">Invasión militar de Irak</h5>
            <p class="step-desc">Bajo el argumento de presuntas armas de destrucción masiva y vínculos terroristas (desmentidos por comisiones posteriores), una coalición liderada por EE.UU. invade Irak, alterando profundamente el balance de poder en Oriente Medio.</p>
          </div>
        </div>
      </div>
      `
    );
  }

  // Trigger Hotspot 2: MATEMÁTICAS Y ECONOMÍA
  function openHotspotMatematicas() {
    openModal(
      '02 — Los Números del Impacto',
      'CÓMO LAS MATEMÁTICAS PERMITEN DIMENSIONAR UN HECHO HISTÓRICO',
      `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <p style="font-size: 0.98rem; color: #cbd5e1; line-height: 1.65;">
          Las matemáticas y la economía no son simples colecciones de cifras frías: constituyen herramientas analíticas indispensables para comprender la densidad humana, la física del colapso estructural y la magnitud de las ondas de choque financieras a escala civilizatoria.
        </p>

        <div class="stat-cards-grid">
          <!-- Dato 1: Altura -->
          <div class="stat-card">
            <div class="stat-number blue" data-target="417">0</div>
            <div class="stat-label">Metros de Altura (Torre Norte) • 110 Pisos</div>
            <div class="stat-comprehension">
              <strong>¿Qué nos permite comprender ese número?</strong>
              La monumentalidad arquitectónica: cada torre equivalía a 1 hectárea de superficie por planta, congregando más de 400.000 m² de espacio vertical y convirtiendo cada edificio en una ciudad con código postal independiente (10048).
            </div>
          </div>

          <!-- Dato 2: Demografía y Evacuación -->
          <div class="stat-card">
            <div class="stat-number gold" data-target="85">0</div>
            <div class="stat-label">% Ocupantes Evacuados Exitosamente</div>
            <div class="stat-comprehension">
              <strong>¿Qué nos permite comprender ese número?</strong>
              La eficacia de los simulacros tras 1993: a las 08:46 am había ~17.400 personas en el complejo (de 50.000 habituales). Gracias al diseño redundante de 3 escaleras por torre, más del 85% de los ocupantes bajo los pisos de impacto lograron salvar sus vidas.
            </div>
          </div>

          <!-- Dato 3: Tiempos de Resistencia Estructural -->
          <div class="stat-card">
            <div class="stat-number red" data-target="56">0</div>
            <div class="stat-label">Minutos de Resistencia Torre Sur (vs 102 min Norte)</div>
            <div class="stat-comprehension">
              <strong>¿Qué nos permite comprender ese número?</strong>
              La física del daño gravitacional: el impacto del vuelo 175 fue más bajo (pisos 77-85), forzando a columnas térmicamente degradadas por combustible Jet A (~800°C) a soportar la masa estática de 30 pisos superiores, colapsando en casi la mitad de tiempo.
            </div>
          </div>

          <!-- Dato 4: Costo Financiero Wall Street -->
          <div class="stat-card">
            <div class="stat-number red" data-target="1400">0</div>
            <div class="stat-label">Miles de Millones de Pérdida en Bolsa (\$1.4B)</div>
            <div class="stat-comprehension">
              <strong>¿Qué nos permite comprender ese número?</strong>
              La parálisis sistémica: Wall Street permaneció cerrado 4 jornadas consecutivas (el mayor cierre desde la Gran Depresión de 1933). Al reabrir el 17 de septiembre, el Dow Jones se desplomó 684 puntos (-7.1%) en un solo día.
            </div>
          </div>
        </div>

        <div style="background: rgba(255,255,255,0.03); padding: 1.25rem; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px;">
          <h5 style="color: #fbbf24; font-size: 1rem; margin-bottom: 0.4rem;">Costo Global Acumulado a Largo Plazo: \$8+ Billones de Dólares</h5>
          <p style="font-size: 0.9rem; color: #cbd5e1; line-height: 1.65;">
            El proyecto <em>Costs of War</em> de la Universidad de Brown calcula que durante más de dos décadas, las operaciones militares directas, el financiamiento de seguridad interna y la atención médica a veteranos en todo el mundo superaron los 8 billones de dólares, demostrando cómo una acción desestabilizadora genera compromisos fiscales generacionales.
          </p>
        </div>
      </div>
      `
    );
  }

  // Trigger Hotspot 3: CIENCIAS NATURALES
  function openHotspotCiencias() {
    openModal(
      '03 — Ciencias Naturales, Medio Ambiente y Salud',
      'LA QUÍMICA DE LA CATÁSTROFE Y SU HUELLA EPIDEMIOLÓGICA',
      `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <p style="font-size: 0.98rem; color: #cbd5e1; line-height: 1.65;">
          El colapso de 1.8 millones de toneladas de materiales no fue un evento geológico, pero liberó una nube piroclástica artificial con concentraciones químicas complejas. Haz clic en las etapas de la cadena para examinar el fenómeno científico:
        </p>

        <!-- Cadena interactiva: Edificio -> Colapso -> Partículas -> Atmósfera -> Exposición humana -->
        <div class="science-chain" id="science-chain-container">
          <div class="chain-step active" data-step="1">
            <div class="chain-step-header">
              <span>1. EDIFICIO: MASA MATERIAL COMPLEJA</span>
              <span class="tag-badge gray">Materia Prima</span>
            </div>
            <div class="chain-step-content">
              Cada torre contenía 200.000 toneladas de acero estructural, 325.000 m³ de hormigón, miles de kilómetros de cables aislados con PVC, 43.600 ventanas de vidrio y toneladas de mobiliario y componentes electrónicos con metales pesados.
            </div>
          </div>

          <div class="chain-step" data-step="2">
            <div class="chain-step-header">
              <span>2. COLAPSO: ENERGÍA MECÁNICA Y PULVERIZACIÓN</span>
              <span class="tag-badge gray">Física Cinética</span>
            </div>
            <div class="chain-step-content" style="display: none;">
              La energía potencial gravitacional acumulada a más de 400 metros de altura se transformó en energía cinética violenta. Al impactar los pisos sucesivamente a velocidades superiores a 150 km/h, trituró el hormigón, las losas de yeso y el aislamiento acústico hasta convertirlos en partículas microscópicas de polvo respirable (PM10 y PM2.5).
            </div>
          </div>

          <div class="chain-step" data-step="3">
            <div class="chain-step-header">
              <span>3. PARTÍCULAS: TOXICOLOGÍA Y PH ALCALINO</span>
              <span class="tag-badge gray">Química Ambiental</span>
            </div>
            <div class="chain-step-content" style="display: none;">
              El polvo contenía más de 400 toneladas de amianto (asbesto crisotilo utilizado en la Torre Norte antes de la prohibición de 1971), microfibras de sílice cristalina, plomo, dioxinas e hidrocarburos aromáticos policíclicos (HAP). El polvo de hormigón hidratado alcanzó un pH sumamente alcalino de 10 a 11, provocando quemaduras químicas directas en las mucosas de las vías respiratorias.
            </div>
          </div>

          <div class="chain-step" data-step="4">
            <div class="chain-step-header">
              <span>4. ATMÓSFERA: DISPERSIÓN E INCENDIOS SUBTERRÁNEOS</span>
              <span class="tag-badge gray">Termodinámica</span>
            </div>
            <div class="chain-step-content" style="display: none;">
              La pluma de humo fue visible desde satélites orbitales de la NASA (satélite Terra). En la pila de escombros de Ground Zero, los incendios subterráneos sin suministro directo de oxígeno continuaron ardiendo a temperaturas superiores a 500°C durante <strong>99 días ininterrumpidos</strong> (hasta el 19 de diciembre de 2001), liberando gases de combustión incompleta.
            </div>
          </div>

          <div class="chain-step" data-step="5">
            <div class="chain-step-header">
              <span>5. EXPOSICIÓN HUMANA: IMPACTO EPIDEMIOLÓGICO</span>
              <span class="tag-badge gray">Salud Pública</span>
            </div>
            <div class="chain-step-content" style="display: none;">
              Más de 40.000 rescatistas, bomberos, policías y residentes estuvieron expuestos de forma aguda. La patología inicial, conocida como la "tos del WTC", derivó con los años en asma refractaria, sarcoidosis, fibrosis pulmonar y el diagnóstico de 68 tipos de cáncer, llevando a la creación del <em>World Trade Center Health Program</em> con más de 71.000 personas bajo seguimiento médico continuado.
            </div>
          </div>
        </div>
      </div>
      `
    );
  }

  // Trigger Hotspot 4: INGENIERÍA
  function openHotspotIngenieria() {
    openModal(
      '04 — Ingeniería Estructural: ¿Cómo estaban construidas?',
      'SISTEMA ESTRUCTURAL, TERMODINÁMICA DEL ACERO Y COLAPSO PROGRESIVO',
      `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <p style="font-size: 0.98rem; color: #cbd5e1; line-height: 1.65;">
          Las Torres Gemelas fueron una obra revolucionaria del ingeniero Leslie Robertson y el arquitecto Minoru Yamasaki. Sustituyeron las densas cuadrículas tradicionales de columnas interiores por el innovador sistema de <strong>"Tubo en Tubo" (Framed Tube)</strong>.
        </p>

        <!-- Diagrama interactivo de partes estructurales -->
        <div class="engineering-schematic-box">
          <div class="engineering-svg-container">
            <svg class="engineering-interactive-svg" viewBox="0 0 240 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagrama esquemático de la sección transversal de la torre">
              <!-- Fondo del edificio -->
              <rect x="20" y="20" width="200" height="340" fill="#0c1220" stroke="rgba(255,255,255,0.15)" stroke-width="2" rx="4" />

              <!-- Columnas de la Fachada Exterior (Viga Vierendeel) -->
              <g id="eng-part-fachada" class="eng-interactive-part" style="cursor: pointer;" tabindex="0" role="button" aria-label="Fachada perimetral exterior">
                <rect x="20" y="20" width="24" height="340" fill="#ef4444" opacity="0.4" />
                <rect x="196" y="20" width="24" height="340" fill="#ef4444" opacity="0.4" />
                <!-- Líneas de columnas exteriores -->
                <line x1="28" y1="20" x2="28" y2="360" stroke="#fca5a5" stroke-width="1.5" />
                <line x1="36" y1="20" x2="36" y2="360" stroke="#fca5a5" stroke-width="1.5" />
                <line x1="204" y1="20" x2="204" y2="360" stroke="#fca5a5" stroke-width="1.5" />
                <line x1="212" y1="20" x2="212" y2="360" stroke="#fca5a5" stroke-width="1.5" />
              </g>

              <!-- Núcleo Central de Acero -->
              <g id="eng-part-nucleo" class="eng-interactive-part" style="cursor: pointer;" tabindex="0" role="button" aria-label="Núcleo central de acero">
                <rect x="80" y="20" width="80" height="340" fill="#38bdf8" opacity="0.3" stroke="#38bdf8" stroke-dasharray="3,3" />
                <line x1="100" y1="20" x2="100" y2="360" stroke="#7dd3fc" stroke-width="2" />
                <line x1="120" y1="20" x2="120" y2="360" stroke="#7dd3fc" stroke-width="2" />
                <line x1="140" y1="20" x2="140" y2="360" stroke="#7dd3fc" stroke-width="2" />
              </g>

              <!-- Cerchas de Piso Horizontales -->
              <g id="eng-part-cerchas" class="eng-interactive-part" style="cursor: pointer;" tabindex="0" role="button" aria-label="Cerchas ligeras de piso">
                <line x1="44" y1="80" x2="80" y2="80" stroke="#fbbf24" stroke-width="3" />
                <line x1="160" y1="80" x2="196" y2="80" stroke="#fbbf24" stroke-width="3" />

                <line x1="44" y1="140" x2="80" y2="140" stroke="#fbbf24" stroke-width="3" />
                <line x1="160" y1="140" x2="196" y2="140" stroke="#fbbf24" stroke-width="3" />

                <line x1="44" y1="200" x2="80" y2="200" stroke="#fbbf24" stroke-width="3" />
                <line x1="160" y1="200" x2="196" y2="200" stroke="#fbbf24" stroke-width="3" />

                <line x1="44" y1="260" x2="80" y2="260" stroke="#fbbf24" stroke-width="3" />
                <line x1="160" y1="260" x2="196" y2="260" stroke="#fbbf24" stroke-width="3" />
              </g>

              <!-- Zona de Impacto y Fuego Térmico (Pisos 77-85) -->
              <g id="eng-part-fuego" class="eng-interactive-part" style="cursor: pointer;" tabindex="0" role="button" aria-label="Zona térmica y efecto a 600 grados">
                <rect x="22" y="110" width="196" height="55" fill="#f97316" opacity="0.35" stroke="#ea580c" stroke-width="2" stroke-dasharray="4,4" />
                <text x="120" y="142" fill="#fff" font-size="12" font-weight="700" text-anchor="middle" font-family="'JetBrains Mono', monospace">TÉRMICO 600°C</text>
              </g>

              <text x="120" y="375" fill="#94a3b8" font-size="9" text-anchor="middle" font-family="'Inter', sans-serif">Pulsa cada elemento estructural</text>
            </svg>
          </div>

          <div class="engineering-details-panel" id="eng-details-panel">
            <h4 class="eng-part-title" id="eng-panel-title">Tubo Perimetral (Fachada)</h4>
            <p class="eng-part-desc" id="eng-panel-desc">
              Cada una de las cuatro caras de la torre contaba con 59 columnas de acero unidas rigidamente por vigas de tímpano (spandrels). Al comportarse como un tubo hueco autoportante, absorbía el 100% de las fuerzas de viento laterales y resistió el impacto físico inicial de los aviones redistribuyendo las cargas a columnas adyacentes intactas.
            </p>
            <span class="tag-badge blue" style="margin-top: 1rem;" id="eng-panel-tag">Sistema Vierendeel</span>
          </div>
        </div>

        <div style="background: rgba(255,255,255,0.03); padding: 1.25rem; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px;">
          <h5 style="color: #f87171; font-size: 1rem; margin-bottom: 0.4rem;">La Falsedad del "Acero Derretido": Pérdida de Rigidez a 600°C</h5>
          <p style="font-size: 0.9rem; color: #cbd5e1; line-height: 1.65;">
            El informe del <strong>NIST (NCSTAR 1)</strong> aclaró que el acero estructural no necesitó fundirse (su punto de fusión supera los 1.500°C). Con los 38.000 litros de combustible de aviación ardiendo entre 800°C y 1.000°C, a <strong>600°C el acero estructural pierde el 50% de su límite elástico y rigidez</strong>. Las cerchas de piso se deformaron hacia abajo en catenaria, tirando de las columnas perimetrales hacia el interior hasta vencer su resistencia por pandeo dinámico.
          </p>
        </div>

        <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 1.25rem; display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
          <span style="font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); font-family: var(--font-mono);">Plano Técnico Estructural (NIST / Minoru Yamasaki & Leslie Robertson)</span>
          <img src="wtc-structure-drawing.png" alt="Esquema estructural auténtico del Framed Tube de las Torres Gemelas" style="max-height: 240px; width: auto; border-radius: 4px; filter: contrast(125%) brightness(95%);" loading="lazy" onerror="if(!this.dataset.retry){this.dataset.retry='1';this.src='images/wtc-structure-drawing.png';}">
        </div>
      </div>
      `
    );
  }

  // Asignar eventos a los Hotspots
  if (hotspot1) hotspot1.addEventListener('click', openHotspotHistoria);
  if (hotspot2) hotspot2.addEventListener('click', openHotspotMatematicas);
  if (hotspot3) hotspot3.addEventListener('click', openHotspotCiencias);
  if (hotspot4) hotspot4.addEventListener('click', openHotspotIngenieria);

  if (btnMobileHs1) btnMobileHs1.addEventListener('click', openHotspotHistoria);
  if (btnMobileHs2) btnMobileHs2.addEventListener('click', openHotspotMatematicas);
  if (btnMobileHs3) btnMobileHs3.addEventListener('click', openHotspotCiencias);
  if (btnMobileHs4) btnMobileHs4.addEventListener('click', openHotspotIngenieria);

  // ==========================================================================
  // 7. INTERACCIONES DINÁMICAS DENTRO DE LOS MODALES
  // ==========================================================================
  function initModalDynamicInteractions() {
    // A) Animación de contadores numéricos (Hotspot 2)
    const counters = modalBody.querySelectorAll('.stat-number');
    counters.forEach((c) => {
      const target = parseInt(c.getAttribute('data-target'), 10);
      let current = 0;
      const step = Math.max(1, Math.floor(target / 40));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          c.textContent = target.toLocaleString('es-ES');
          clearInterval(timer);
        } else {
          c.textContent = current.toLocaleString('es-ES');
        }
      }, 25);
    });

    // B) Pasos interactivos de la cadena científica (Hotspot 3)
    const chainSteps = modalBody.querySelectorAll('.chain-step');
    chainSteps.forEach((step) => {
      step.addEventListener('click', () => {
        chainSteps.forEach((s) => {
          s.classList.remove('active');
          const content = s.querySelector('.chain-step-content');
          if (content) content.style.display = 'none';
        });
        step.classList.add('active');
        const activeContent = step.querySelector('.chain-step-content');
        if (activeContent) activeContent.style.display = 'block';
      });
    });

    // C) Esquema interactivo de ingeniería (Hotspot 4)
    const engParts = modalBody.querySelectorAll('.eng-interactive-part');
    const engTitle = modalBody.querySelector('#eng-panel-title');
    const engDesc = modalBody.querySelector('#eng-panel-desc');
    const engTag = modalBody.querySelector('#eng-panel-tag');

    const engData = {
      'eng-part-fachada': {
        title: 'Tubo Perimetral (Fachada Exterior)',
        desc: '59 columnas de acero por cara unidas por tímpanos de acero masivos. Formaban un tubo rígido que soportaba todas las cargas de viento laterales y redistribuía las fuerzas gravitacionales cuando algunas columnas resultaban dañadas.',
        tag: 'Sistema Vierendeel',
      },
      'eng-part-nucleo': {
        title: 'Núcleo Central de Acero',
        desc: 'Rectángulo central con 47 columnas de acero estructural ultra pesado (perfiles de sección cajón) que contenían las cajas de ascensores, las 3 escaleras de evacuación y los ductos de servicios mecánicos y eléctricos del edificio.',
        tag: 'Cargas Gravitacionales Verticales',
      },
      'eng-part-cerchas': {
        title: 'Cerchas Ligeras de Piso (Floor Trusses)',
        desc: 'Estructuras triangulares de celosía de acero de 84 cm de peralte que cubrían luces de hasta 18 metros sin ninguna columna intermedia. Soportaban una losa de hormigón ligero de 10 cm con amortiguadores viscoelásticos que disipaban oscilaciones.',
        tag: 'Amortiguación Viscoelástica',
      },
      'eng-part-fuego': {
        title: 'Vulnerabilidad Térmica del Acero a 600°C',
        desc: 'El calor despojó el aislamiento ignífugo proyectado (spray de fibra mineral). A 600°C, las cerchas cedieron y se combaron hacia abajo, ejerciendo una enorme fuerza de tracción horizontal hacia el interior sobre las columnas exteriores hasta causar el colapso progresivo.',
        tag: 'Termodinámica de Fallo Estructural',
      },
    };

    engParts.forEach((part) => {
      part.addEventListener('click', () => {
        const id = part.getAttribute('id');
        if (engData[id] && engTitle && engDesc && engTag) {
          engTitle.textContent = engData[id].title;
          engDesc.textContent = engData[id].desc;
          engTag.textContent = engData[id].tag;
        }
      });
    });
  }

  // ==========================================================================
  // 8. FICHAS TÉCNICAS DE LOS CUATRO VUELOS
  // ==========================================================================
  const flightDetails = {
    aa11: {
      name: 'American Airlines 11',
      plane: 'Boeing 767-223ER (Matrícula N334AA)',
      route: 'Aeropuerto Logan de Boston (BOS) → Aeropuerto Internacional de Los Ángeles (LAX)',
      dep: '07:59 EDT (Retraso de 14 min por pista)',
      hijack: '~08:14 EDT (Transpondedor desconectado a las 08:21)',
      impact: '08:46:40 EDT • Torre Norte WTC (1 WTC)',
      fatalities: '92 a bordo (11 tripulantes, 76 pasajeros, 5 secuestradores)',
      img: 'images/wtc-aerial-2001.jpg',
      imgAlt: 'Complejo World Trade Center y Torre Norte',
      details: 'Fue el primer avión en ser secuestrado. Los terroristas atacaron la cabina con armas blancas. La azafata Betty Ong y su compañera Madeline Sweeney transmitieron valiosa información de radio y telefonía aérea a tierra describiendo con precisión la situación y los números de asiento de los agresores durante 25 minutos.',
    },
    ua175: {
      name: 'United Airlines 175',
      plane: 'Boeing 767-222 (Matrícula N612UA)',
      route: 'Aeropuerto Logan de Boston (BOS) → Aeropuerto Internacional de Los Ángeles (LAX)',
      dep: '08:14 EDT (Salida programada 08:00 EDT)',
      hijack: '08:42 - 08:46 EDT (Desviado sobre Nueva Jersey)',
      impact: '09:03:02 EDT • Torre Sur WTC (2 WTC)',
      fatalities: '65 a bordo (9 tripulantes, 51 pasajeros, 5 secuestradores)',
      img: 'images/wtc-ground-1999.jpg',
      imgAlt: 'Torres Gemelas del World Trade Center',
      details: 'El impacto fue transmitido en vivo y en directo por cadenas de televisión globales que cubrían el incendio de la Torre Norte. El avión entró inclinado en un viraje escarpado a 950 km/h cortando las columnas perimetrales entre las plantas 77 y 85, inutilizando dos de las tres escaleras de emergencia de la Torre Sur.',
    },
    aa77: {
      name: 'American Airlines 77',
      plane: 'Boeing 757-223 (Matrícula N644AA)',
      route: 'Aeropuerto Internacional Washington Dulles (IAD) → Los Ángeles (LAX)',
      dep: '08:20 EDT (Salida programada 08:10 EDT)',
      hijack: '08:51 - 08:54 EDT (Giro sobre Ohio hacia el este)',
      impact: '09:37:46 EDT • Fachada Occidental de El Pentágono (Arlington, Virginia)',
      fatalities: '64 a bordo + 125 militares y civiles en El Pentágono (Total: 189 víctimas)',
      img: 'images/pentagon-aerial.jpg',
      imgAlt: 'Sede del Pentágono en Arlington, Virginia',
      details: 'El piloto secuestrador Hani Hanjour ejecutó un descenso en espiral de 330 grados para aproximarse a nivel del suelo a más de 850 km/h, derribando postes de iluminación vial antes de penetrar tres de los cinco anillos concéntricos del cuartel general de la defensa estadounidense.',
    },
    ua93: {
      name: 'United Airlines 93',
      plane: 'Boeing 757-222 (Matrícula N591UA)',
      route: 'Aeropuerto Internacional de Newark (EWR) → San Francisco (SFO)',
      dep: '08:42 EDT (Retraso de 42 min por congestión en Newark)',
      hijack: '09:28 EDT (Transpondedor desconectado sobre Ohio)',
      impact: '10:03:11 EDT • Campo abierto en Shanksville (Stonycreek, Pensilvania)',
      fatalities: '44 a bordo (7 tripulantes, 33 pasajeros, 4 secuestradores)',
      img: 'images/flight93-tower-of-voices.jpg',
      imgAlt: 'Torre de las Voces en el Memorial Nacional del Vuelo 93 en Shanksville',
      details: 'El retraso en el despegue permitió que los pasajeros conocieran los atentados previos mediante llamadas de teléfonos aéreos. Con la famosa frase "Let’s roll" (Vamos a actuar), liderados por Todd Beamer, Jeremy Glick, Mark Bingham y Tom Burnett, los pasajeros asaltaron la cabina con un carrito de comida. Los secuestradores precipitaron la aeronave a tierra a 905 km/h, evitando el ataque contra el Capitolio o la Casa Blanca a 20 minutos de vuelo.',
    },
  };

  const flightButtons = document.querySelectorAll('.btn-flight-inspect');
  flightButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const flightKey = btn.getAttribute('data-flight');
      const data = flightDetails[flightKey];
      if (!data) return;

      openModal(
        data.name,
        `FICHA HISTÓRICA Y AERONÁUTICA VERIFICADA • ${data.plane}`,
        `
        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          ${data.img ? `
          <div style="border-radius: 8px; overflow: hidden; max-height: 210px; border: 1px solid rgba(255,255,255,0.08); background: #000;">
            <img src="${data.img}" alt="${data.imgAlt}" style="width: 100%; height: 210px; object-fit: cover; object-position: center;" loading="lazy" onerror="if(!this.dataset.retry){this.dataset.retry='1';this.src=this.src.indexOf('images/')!==-1?this.src.replace('images/',''):'images/'+this.src.split('/').pop();}">
          </div>
          ` : ''}

          <div style="background: rgba(255,255,255,0.03); padding: 1.25rem; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px;">
            <span style="color: var(--accent-red); font-family: var(--font-mono); font-size: 0.85rem; font-weight: 700;">RUTA PROGRAMADA</span>
            <p style="color: #ffffff; font-size: 1.05rem; margin-top: 0.2rem;">${data.route}</p>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div style="background: rgba(255,255,255,0.03); padding: 1rem; border: 1px solid rgba(255,255,255,0.08); border-radius: 6px;">
              <span style="color: var(--text-muted); font-size: 0.8rem; text-transform: uppercase;">Hora de Despegue</span>
              <p style="color: #ffffff; font-family: var(--font-mono); font-size: 1rem; margin-top: 0.2rem;">${data.dep}</p>
            </div>
            <div style="background: rgba(255,255,255,0.03); padding: 1rem; border: 1px solid rgba(255,255,255,0.08); border-radius: 6px;">
              <span style="color: var(--text-muted); font-size: 0.8rem; text-transform: uppercase;">Momento de Secuestro</span>
              <p style="color: #ffffff; font-family: var(--font-mono); font-size: 1rem; margin-top: 0.2rem;">${data.hijack}</p>
            </div>
            <div style="background: rgba(255,255,255,0.03); padding: 1rem; border: 1px solid rgba(255,255,255,0.08); border-radius: 6px;">
              <span style="color: var(--text-muted); font-size: 0.8rem; text-transform: uppercase;">Impacto / Desenlace</span>
              <p style="color: #f87171; font-family: var(--font-mono); font-size: 1rem; margin-top: 0.2rem;">${data.impact}</p>
            </div>
            <div style="background: rgba(255,255,255,0.03); padding: 1rem; border: 1px solid rgba(255,255,255,0.08); border-radius: 6px;">
              <span style="color: var(--text-muted); font-size: 0.8rem; text-transform: uppercase;">Víctimas Involucradas</span>
              <p style="color: #ffffff; font-size: 0.95rem; margin-top: 0.2rem;">${data.fatalities}</p>
            </div>
          </div>

          <div style="background: rgba(13, 21, 39, 0.5); padding: 1.25rem; border-left: 3px solid var(--accent-blue); border-radius: 0 8px 8px 0;">
            <h5 style="color: #7dd3fc; font-size: 1rem; margin-bottom: 0.4rem;">Relevancia Histórica y Testimonial</h5>
            <p style="font-size: 0.92rem; color: #cbd5e1; line-height: 1.65;">${data.details}</p>
          </div>
        </div>
        `
      );
    });
  });

  // ==========================================================================
  // 9. MAPA INTERACTIVO GEOGRÁFICO Y TOOLTIPS
  // ==========================================================================
  const mapNodes = document.querySelectorAll('.map-node');
  const mapTooltip = document.getElementById('map-point-tooltip');
  const tooltipTitle = document.getElementById('tooltip-title');
  const tooltipBadge = document.getElementById('tooltip-badge');
  const tooltipDesc = document.getElementById('tooltip-desc');

  const nodeLocations = {
    boston: {
      title: 'Aeropuerto Internacional Logan (Boston, MA)',
      badge: 'Origen de Salida',
      desc: 'Punto de partida de los vuelos AA 11 (07:59 EDT) y UA 175 (08:14 EDT), ambos con destino programado a Los Ángeles.',
    },
    newark: {
      title: 'Aeropuerto Internacional Newark Liberty (NJ)',
      badge: 'Origen de Salida',
      desc: 'Punto de despegue del vuelo UA 93 a las 08:42 EDT con destino a San Francisco, con un retraso en pista de 42 minutos.',
    },
    nyc: {
      title: 'World Trade Center (Bajo Manhattan, NYC)',
      badge: 'Lugar de Impacto',
      desc: 'Epicentro del ataque: impacto de la Torre Norte (08:46:40) y Torre Sur (09:03:02). Colapso de la Torre Sur a las 09:59 y de la Torre Norte a las 10:28.',
    },
    pentagon: {
      title: 'El Pentágono (Arlington, Virginia)',
      badge: 'Lugar de Impacto',
      desc: 'Sede del Departamento de Defensa de EE.UU. Impactada por el vuelo AA 77 a las 09:37:46 EDT en su ala occidental tras despegar de Washington Dulles.',
    },
    shanksville: {
      title: 'Shanksville (Municipio de Stonycreek, PA)',
      badge: 'Caída de UA 93',
      desc: 'Campo abierto en el condado de Somerset donde se estrelló el vuelo UA 93 a las 10:03:11 EDT tras la revuelta de los pasajeros.',
    },
    lax: {
      title: 'Aeropuerto Internacional de Los Ángeles (LAX)',
      badge: 'Destino Planificado',
      desc: 'Destino original de los vuelos AA 11, UA 175 y AA 77. Elegidos por los secuestradores por su máxima carga de combustible transcontinental (~38.000 litros).',
    },
    sfo: {
      title: 'Aeropuerto Internacional de San Francisco (SFO)',
      badge: 'Destino Planificado',
      desc: 'Destino programado del vuelo UA 93 con tanque de combustible de largo recorrido.',
    },
  };

  mapNodes.forEach((node) => {
    const locKey = node.getAttribute('data-loc');
    const data = nodeLocations[locKey];

    function showTooltip(e) {
      if (!data || !mapTooltip) return;
      tooltipTitle.textContent = data.title;
      tooltipBadge.textContent = data.badge;
      tooltipDesc.textContent = data.desc;

      const rect = node.getBoundingClientRect();
      const parentRect = mapTooltip.parentElement.getBoundingClientRect();

      mapTooltip.style.left = `${rect.left - parentRect.left + 20}px`;
      mapTooltip.style.top = `${rect.top - parentRect.top - 20}px`;
      mapTooltip.classList.add('visible');
    }

    function hideTooltip() {
      if (mapTooltip) mapTooltip.classList.remove('visible');
    }

    node.addEventListener('mouseenter', showTooltip);
    node.addEventListener('mouseleave', hideTooltip);
    node.addEventListener('focus', showTooltip);
    node.addEventListener('blur', hideTooltip);

    // Clic en nodo abre modal con detalles geográficos
    node.addEventListener('click', () => {
      if (!data) return;
      openModal(data.title, data.badge.toUpperCase(), `<p style="font-size: 1.05rem; line-height: 1.7;">${data.desc}</p>`);
    });
  });

  // Filtro de rutas en el mapa
  const mapFilterBtns = document.querySelectorAll('.btn-map-filter');
  const flightPaths = {
    aa11: document.getElementById('path-aa11'),
    ua175: document.getElementById('path-ua175'),
    aa77: document.getElementById('path-aa77'),
    ua93: document.getElementById('path-ua93'),
  };

  mapFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      mapFilterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-map-filter');

      Object.keys(flightPaths).forEach((key) => {
        const path = flightPaths[key];
        if (!path) return;

        if (filter === 'all' || filter === key) {
          path.style.opacity = '1';
          path.style.strokeWidth = '3.5';
        } else {
          path.style.opacity = '0.12';
          path.style.strokeWidth = '1.5';
        }
      });
    });
  });

  // ==========================================================================
  // 10. HERRAMIENTA PEDAGÓGICA DE ANÁLISIS CRÍTICO ESCOLAR
  // ==========================================================================
  const reflectionTabs = document.querySelectorAll('.btn-reflection-tab');
  const reflectionContent = document.getElementById('reflection-content-display');

  const reflectionPrompts = {
    'tab-seguridad': `
      <p><strong>Dilema:</strong> Tras el 11 de septiembre, muchos gobiernos aumentaron la videovigilancia y el monitoreo digital para prevenir amenazas. ¿Hasta qué punto una sociedad debe ceder su privacidad individual en búsqueda de una mayor seguridad colectiva? ¿Cuáles son los límites éticos del control estatal?</p>
      <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(255,255,255,0.03); border-radius: 4px; font-size: 0.9rem; color: #94a3b8;">
        <strong>Pregunta orientadora:</strong> ¿Consideras que una medida extraordinaria de emergencia debe mantenerse de manera indefinida una vez superada la crisis inmediata?
      </div>
    `,
    'tab-arquitectura': `
      <p><strong>Dilema:</strong> La ingeniería estructural de rascacielos fue profundamente revisada tras 2001. Hoy en día, los nuevos rascacielos como el One World Trade Center incorporan núcleos de hormigón reforzado de 1 metro de espesor y escaleras presurizadas para bomberos. ¿Cómo debe equilibrarse la aspiración estética de las ciudades modernas con la resiliencia estructural ante contingencias imprevistas?</p>
      <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(255,255,255,0.03); border-radius: 4px; font-size: 0.9rem; color: #94a3b8;">
        <strong>Pregunta orientadora:</strong> ¿Qué responsabilidades éticas tienen los arquitectos e ingenieros frente a la seguridad de los ciudadanos que habitan sus obras?
      </div>
    `,
    'tab-memoria': `
      <p><strong>Dilema:</strong> El Memorial del 11-S en Nueva York transformó el espacio físico de las Torres en dos piscinas con cascadas continuas donde están grabados los nombres de las 2.977 víctimas. ¿Qué papel cumple la memoria histórica en la prevención de la intolerancia y en la construcción de una cultura de paz para las nuevas generaciones?</p>
      <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(255,255,255,0.03); border-radius: 4px; font-size: 0.9rem; color: #94a3b8;">
        <strong>Pregunta orientadora:</strong> ¿Por qué es fundamental estudiar la historia desde múltiples disciplinas y no únicamente desde las fechas de batallas políticas?
      </div>
    `,
  };

  reflectionTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      reflectionTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const tabId = tab.getAttribute('data-tab');
      if (reflectionContent && reflectionPrompts[tabId]) {
        reflectionContent.innerHTML = reflectionPrompts[tabId];
      }
    });
  });
});
