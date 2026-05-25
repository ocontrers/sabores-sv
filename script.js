/**
 * SABORES DE EL SALVADOR — script.js v3
 * Emojis corregidos, imagenes reales via data attributes, interactividad completa
 */
"use strict";

/* ═══ 1. CURSOR PERSONALIZADO ═══ */
(function initCursor() {
  const dot  = document.getElementById("cursor-dot");
  const ring = document.getElementById("cursor-ring");
  if (!dot || !ring) return;
  let mx=0, my=0, rx=0, ry=0;
  document.addEventListener("mousemove", e => { mx=e.clientX; my=e.clientY; });
  function anim() {
    dot.style.left = mx+"px"; dot.style.top = my+"px";
    rx += (mx-rx)*.12; ry += (my-ry)*.12;
    ring.style.left = rx+"px"; ring.style.top = ry+"px";
    requestAnimationFrame(anim);
  }
  anim();
  document.querySelectorAll("a,button,.tab-btn,.servicio-card,.menu-card,.slider-btn,.dot").forEach(el => {
    el.addEventListener("mouseenter", () => { dot.classList.add("hovered"); ring.classList.add("hovered"); });
    el.addEventListener("mouseleave", () => { dot.classList.remove("hovered"); ring.classList.remove("hovered"); });
  });
})();

/* ═══ 2. PARTICULAS EN CANVAS ═══ */
(function initParticles() {
  const canvas = document.getElementById("particles-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  function resize() { canvas.width=window.innerWidth; canvas.height=window.innerHeight; }
  resize();
  window.addEventListener("resize", resize, { passive:true });
  const G = "rgba(232,168,62,";
  const pts = Array.from({length:55}, () => ({
    x: Math.random()*canvas.width, y: Math.random()*canvas.height,
    r: Math.random()*2+.5, vx:(Math.random()-.5)*.35, vy:(Math.random()-.5)*.35,
    a: Math.random()*.5+.1, p: Math.random()*Math.PI*2
  }));
  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    pts.forEach(p => {
      p.p+=.018;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle = G+(p.a*(.7+.3*Math.sin(p.p)))+")"; ctx.fill();
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0)p.x=canvas.width; if(p.x>canvas.width)p.x=0;
      if(p.y<0)p.y=canvas.height; if(p.y>canvas.height)p.y=0;
    });
    for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){
      const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y, d=Math.sqrt(dx*dx+dy*dy);
      if(d<100){ ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y);
        ctx.strokeStyle=G+(0.07*(1-d/100))+")"; ctx.lineWidth=.6; ctx.stroke(); }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ═══ 3. NAVBAR + HAMBURGER ═══ */
(function initNavbar() {
  const navbar    = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks  = document.getElementById("nav-links");
  const links     = document.querySelectorAll(".nav-link");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 60);
    highlight();
  }, { passive:true });
  hamburger.addEventListener("click", () => {
    const o = navLinks.classList.toggle("open");
    hamburger.classList.toggle("open", o);
    hamburger.setAttribute("aria-expanded", o);
  });
  links.forEach(l => l.addEventListener("click", () => {
    navLinks.classList.remove("open"); hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", false);
  }));
  document.addEventListener("click", e => {
    if (!navbar.contains(e.target)) { navLinks.classList.remove("open"); hamburger.classList.remove("open"); }
  });
  function highlight() {
    ["nosotros","servicios","menu","reserva"].forEach(id => {
      const s=document.getElementById(id), l=document.querySelector(`.nav-link[href="#${id}"]`);
      if(!s||!l) return;
      const t=s.offsetTop-120;
      l.classList.toggle("active", window.scrollY>=t && window.scrollY<t+s.offsetHeight);
    });
  }
})();

/* ═══ 4. REVEAL CON INTERSECTION OBSERVER ═══ */
(function initReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add("revealed"); io.unobserve(e.target); }});
  }, { threshold:.12 });
  document.querySelectorAll(".reveal-up,.reveal-left,.reveal-right").forEach(el => io.observe(el));
})();

/* ═══ 5. TILT 3D EN CARDS ═══ */
(function initTilt() {
  function applyTilt(card, deg) {
    card.addEventListener("mousemove", e => {
      const r=card.getBoundingClientRect();
      const rx=((e.clientY-r.top-r.height/2)/(r.height/2))*-deg;
      const ry=((e.clientX-r.left-r.width/2)/(r.width/2))*deg;
      card.style.transform=`perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px) scale(1.02)`;
    });
    card.addEventListener("mouseleave", () => { card.style.transform=""; });
  }
  document.querySelectorAll(".servicio-card").forEach(c => applyTilt(c,6));
})();

/* ═══ 6. CONTADORES ANIMADOS ═══ */
(function initCounters() {
  const ease = t => 1-Math.pow(1-t,3);
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(!e.isIntersecting) return;
      const el=e.target, target=parseInt(el.dataset.target), dur=1800, start=performance.now();
      function tick(now){ const t=Math.min((now-start)/dur,1); el.textContent=Math.round(ease(t)*target).toLocaleString("es-SV"); if(t<1)requestAnimationFrame(tick); }
      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  }, { threshold:.5 });
  document.querySelectorAll(".stat-num[data-target]").forEach(c => io.observe(c));
})();

/* ═══ 7. MENU DINAMICO CON IMAGENES ═══ */
(function initMenu() {
  /* Las imagenes se obtienen de las ya cargadas en el DOM para no duplicar peso */
  function getImg(selector) {
    const el = document.querySelector(selector);
    return el ? el.src : "";
  }

  /* Obtenemos las src de las imagenes ya incrustadas en el HTML */
  const IMGS = {};
  window.addEventListener("DOMContentLoaded", () => {}, { once:true });

  /* Datos del menu con referencias a imagenes por clase */
  const MENU = {
    pupusas: [
      { cls:"pupusas", n:"Pupusa de Queso",      d:"Masa de maiz molida a mano con queso quesillo fresco de Sonsonate.",    p:"$0.75", t:"Clasico" },
      { cls:"comal",   n:"Pupusa en Comal",       d:"Cocinada en comal de barro artesanal al carbon. Sabor inigualable.",    p:"$0.85", t:"Artesanal" },
      { cls:"pupusas", n:"Pupusa de Loroco",       d:"Loroco silvestre con queso crema. Sabor unico y autentico.",            p:"$0.90", t:"Temporada" },
      { cls:"pupusas", n:"Pupusa Vegana",          d:"Frijoles negros, ayote y queso de maranon. 100% planta.",              p:"$1.00", t:"Vegana" },
      { cls:"pupusas", n:"Pupusa Revuelta",        d:"La combinacion perfecta: frijoles, queso y chicharron.",               p:"$1.00", t:"Popular" },
      { cls:"comal",   n:"Pupusa Maiz Azul",       d:"Edicion especial con masa de maiz azul de Chalatenango.",              p:"$1.10", t:"Especial" },
    ],
    sopas: [
      { cls:"sopa",    n:"Sopa de Pata",           d:"Caldo oscuro con pata de res, verduras y especias ancestrales.",       p:"$4.50", t:"Tradicional" },
      { cls:"sopa",    n:"Sopa de Gallina",        d:"Caldo de gallina de patio con fideos y hierbas frescas.",              p:"$5.00", t:"Casero" },
      { cls:"sopa",    n:"Sopa de Mariscos",       d:"Camarones, almejas y cangrejo en caldo de tomate. Costa del Sol.",     p:"$8.50", t:"Mar" },
      { cls:"sopa",    n:"Caldillo de Frijoles",   d:"Frijoles rojos con chorizo, crema y tortillas recien hechas.",         p:"$3.00", t:"Clasico" },
    ],
    antojitos: [
      { cls:"yuca",    n:"Yuca Frita",             d:"Yuca cocida y frita con chicharron, curtido y pepescas.",              p:"$3.50", t:"Antojo" },
      { cls:"tamales", n:"Tamales Pisques",        d:"Tamales de frijoles en hoja de platano. Receta de abuela.",            p:"$1.50", t:"Tradicion" },
      { cls:"platano", n:"Platano Frito",          d:"Platano maduro frito con frijoles, crema y queso duro.",               p:"$2.50", t:"Popular" },
      { cls:"yuca",    n:"Chuchitos",              d:"Masa con guiso de cerdo en hoja de tusa con salsa de tomate.",         p:"$1.25", t:"Regional" },
    ],
    bebidas: [
      { cls:"horchata",n:"Horchata Salvadorena",   d:"Semilla de morro, arroz tostado y canela. Refrescante y unica.",       p:"$1.00", t:"Tipica" },
      { cls:"chilate", n:"Chilate con Nuegados",   d:"Maiz blanco con cacao y jengibre. La bebida de la gente mayor.",      p:"$2.50", t:"Ancestral" },
      { cls:"horchata",n:"Fresco de Tamarindo",    d:"Tamarindo natural con panela. Dulce, acido y 100% artesanal.",        p:"$1.00", t:"Natural" },
      { cls:"chilate", n:"Fresco de Jocote",       d:"Jocote corona con agua y chile piquin. Solo en temporada.",           p:"$1.25", t:"Temporada" },
    ]
  };

  const grid = document.getElementById("menu-grid");
  const tabs = document.querySelectorAll(".tab-btn");

  /* Mapa de clase -> src de imagen del DOM */
  const srcMap = {
    pupusas:  () => document.querySelector(".hero-pupusa-img")?.src  || "",
    comal:    () => document.querySelector(".nosotros-photo")?.src   || "",
    sopa:     () => document.querySelector('.card-img[alt*="Tour"]')?.src || "",
    tamales:  () => document.querySelector('.card-img[alt*="Clases"]')?.src || "",
    yuca:     () => document.querySelector('.card-img[alt*="Delivery"]')?.src || "",
    platano:  () => document.querySelector('.card-img[alt*="Eventos"]')?.src || "",
    horchata: () => document.querySelector('.side-card.sc1 img')?.src || "",
    chilate:  () => document.querySelector('.side-card.sc2 img')?.src || "",
  };

  function render(tab) {
    grid.style.opacity="0"; grid.style.transform="translateY(10px)";
    setTimeout(() => {
      grid.innerHTML="";
      (MENU[tab]||[]).forEach((item,i) => {
        const imgSrc = srcMap[item.cls] ? srcMap[item.cls]() : "";
        const c = document.createElement("div");
        c.className="menu-card";
        c.style.animationDelay=`${i*60}ms`;
        c.innerHTML=`
          <div class="menu-card-img">
            <img src="${imgSrc}" alt="${item.n}" loading="lazy" />
          </div>
          <div class="menu-card-body">
            <h4>${item.n}</h4>
            <p>${item.d}</p>
            <div class="menu-card-footer">
              <span class="menu-price">${item.p}</span>
              <span class="menu-tag">${item.t}</span>
            </div>
          </div>`;
        grid.appendChild(c);
        /* Tilt en menu cards */
        c.addEventListener("mousemove", e => {
          const r=c.getBoundingClientRect();
          const rx=((e.clientY-r.top-r.height/2)/(r.height/2))*-5;
          const ry=((e.clientX-r.left-r.width/2)/(r.width/2))*5;
          c.style.transform=`perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-5px)`;
        });
        c.addEventListener("mouseleave", () => { c.style.transform=""; });
      });
      grid.style.opacity="1"; grid.style.transform="translateY(0)";
      grid.style.transition="opacity .35s, transform .35s";
    }, 200);
  }

  tabs.forEach(btn => {
    btn.addEventListener("click", () => {
      tabs.forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      render(btn.dataset.tab);
    });
  });
  render("pupusas");
})();

/* ═══ 8. SLIDER DE TESTIMONIOS ═══ */
(function initSlider() {
  const track = document.getElementById("testimonio-track");
  const dotsW = document.getElementById("slider-dots");
  const prev  = document.getElementById("prev-btn");
  const next  = document.getElementById("next-btn");
  if (!track) return;
  const cards = track.querySelectorAll(".testimonio-card");
  const total = cards.length;
  const vis   = window.innerWidth<=768 ? 1 : 3;
  const max   = total - vis;
  let cur=0, timer;
  for(let i=0;i<=max;i++){
    const d=document.createElement("div");
    d.className="dot"+(i===0?" active":"");
    d.addEventListener("click",()=>goTo(i));
    dotsW.appendChild(d);
  }
  function goTo(n){
    cur=Math.max(0,Math.min(n,max));
    const w=cards[0].offsetWidth+24;
    track.style.transform=`translateX(-${cur*w}px)`;
    dotsW.querySelectorAll(".dot").forEach((d,i)=>d.classList.toggle("active",i===cur));
  }
  function nx(){ goTo(cur<max?cur+1:0); }
  prev.addEventListener("click",()=>{goTo(cur>0?cur-1:max); reset();});
  next.addEventListener("click",()=>{nx(); reset();});
  function reset(){ clearInterval(timer); timer=setInterval(nx,4500); }
  timer=setInterval(nx,4500);
  window.addEventListener("resize",()=>goTo(0),{passive:true});
})();

/* ═══ 9. BARRA DE PROGRESO DEL FORMULARIO ═══ */
(function initProgress() {
  const bar    = document.getElementById("progress-bar");
  const fields = ["nombre","email","telefono","personas","fecha","hora","servicio","terminos"];
  if (!bar) return;
  function update(){
    const filled = fields.filter(id => {
      const e=document.getElementById(id); if(!e)return false;
      return e.type==="checkbox" ? e.checked : e.value.trim()!=="";
    }).length;
    bar.style.width=`${(filled/fields.length)*100}%`;
  }
  fields.forEach(id=>{
    const e=document.getElementById(id); if(!e)return;
    e.addEventListener(e.type==="checkbox"?"change":"input",update);
  });
})();

/* ═══ 10. VALIDACION COMPLETA + CONFETTI ═══ */
(function initForm() {
  const form  = document.getElementById("reserva-form");
  const succ  = document.getElementById("form-success");
  const btn   = document.getElementById("submit-btn");
  const bTxt  = btn.querySelector(".btn-text");
  const bSpin = btn.querySelector(".btn-spinner");
  const newR  = document.getElementById("nueva-reserva");
  const sName = document.getElementById("success-nombre");
  const conf  = document.getElementById("confetti-area");

  const RULES = {
    nombre:   { fn:v=>v.trim().length>=3,                           msg:"Minimo 3 caracteres." },
    email:    { fn:v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), msg:"Correo invalido." },
    telefono: { fn:v=>/^[\d\s\-\+]{7,15}$/.test(v.trim()),         msg:"Telefono invalido." },
    personas: { fn:v=>v!=="",                                       msg:"Selecciona personas." },
    fecha:    { fn:v=>{ if(!v)return false; const d=new Date(v+"T00:00:00"),h=new Date(); h.setHours(0,0,0,0); return d>=h; }, msg:"Fecha invalida." },
    hora:     { fn:v=>v!=="",                                       msg:"Selecciona una hora." },
    servicio: { fn:v=>v!=="",                                       msg:"Selecciona un servicio." },
    terminos: { fn:()=>document.getElementById("terminos").checked,  msg:"Acepta los terminos." }
  };

  function setErr(id,msg){ const e=document.getElementById(id),r=document.getElementById("error-"+id); if(e&&e.type!=="checkbox"){e.classList.add("error");e.classList.remove("valid");} if(r)r.textContent=msg; }
  function setOk(id)     { const e=document.getElementById(id),r=document.getElementById("error-"+id); if(e&&e.type!=="checkbox"){e.classList.remove("error");e.classList.add("valid");} if(r)r.textContent=""; }
  function clr(id)       { const e=document.getElementById(id),r=document.getElementById("error-"+id); if(e)e.classList.remove("error","valid"); if(r)r.textContent=""; }
  function val(id)       { const rule=RULES[id]; if(!rule)return true; const e=document.getElementById(id),v=e?(e.type==="checkbox"?e.checked:e.value):""; const ok=rule.fn(String(v)); ok?setOk(id):setErr(id,rule.msg); return ok; }

  Object.keys(RULES).forEach(id=>{
    const e=document.getElementById(id); if(!e)return;
    e.addEventListener(e.type==="checkbox"?"change":"blur",()=>val(id));
    if(e.tagName==="INPUT"||e.tagName==="TEXTAREA") e.addEventListener("input",()=>{ if(e.classList.contains("error"))val(id); });
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    if(!Object.keys(RULES).map(val).every(Boolean)){
      const f=form.querySelector(".error"); if(f){f.scrollIntoView({behavior:"smooth",block:"center"});f.focus();}
      return;
    }
    btn.disabled=true; bTxt.style.display="none"; bSpin.style.display="inline";
    const nombre=document.getElementById("nombre").value.trim().split(" ")[0];
    setTimeout(()=>{ form.style.display="none"; succ.style.display="block"; sName.textContent=nombre; succ.scrollIntoView({behavior:"smooth",block:"center"}); launchConfetti(); }, 1800);
  });

  newR.addEventListener("click", () => {
    form.reset(); btn.disabled=false; bTxt.style.display="inline"; bSpin.style.display="none";
    form.style.display="flex"; succ.style.display="none";
    Object.keys(RULES).forEach(clr);
    if(conf)conf.innerHTML="";
    const pb=document.getElementById("progress-bar"); if(pb)pb.style.width="0%";
  });

  function launchConfetti(){
    if(!conf)return; conf.innerHTML="";
    const colors=["#e8a83e","#f5c776","#c0392b","#2f4585","#27ae60","#fff"];
    for(let i=0;i<45;i++){
      const p=document.createElement("div"); p.className="confetti-piece";
      p.style.cssText=`left:${Math.random()*100}%;top:0;background:${colors[Math.floor(Math.random()*colors.length)]};
        animation-delay:${Math.random()*.8}s;animation-duration:${Math.random()*.8+1}s;
        width:${Math.random()*10+6}px;height:${Math.random()*10+6}px;`;
      conf.appendChild(p);
    }
  }
})();

/* ═══ 11. AÑO DINAMICO + SMOOTH SCROLL ═══ */
(function misc(){
  const yr=document.getElementById("year"); if(yr)yr.textContent=new Date().getFullYear();
  document.querySelectorAll('a[href^="#"]').forEach(l=>{
    l.addEventListener("click",e=>{
      const t=document.querySelector(l.getAttribute("href")); if(!t)return;
      e.preventDefault(); window.scrollTo({top:t.getBoundingClientRect().top+window.scrollY-80,behavior:"smooth"});
    });
  });
})();

/* ═══ 12. PARALLAX SUAVE EN HERO ═══ */
(function initParallax(){
  const w=document.getElementById("hero-img-tilt"); if(!w)return;
  window.addEventListener("scroll",()=>{ w.style.transform=`translateY(${window.scrollY*.1}px)`; },{passive:true});
})();
