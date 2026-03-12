(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();const r="http://localhost:5173";async function c(){const n=await fetch(`${r}/pets`);if(!n.ok)throw new Error("Failed to fetch pets");return await n.json()}async function d(){const n=await fetch(`${r}/feedback`);if(!n.ok)throw new Error("Failed to fetch feedback");return await n.json()}function l(n){const t=document.getElementById("testimonialsContainer");t&&(t.innerHTML="",n.forEach(a=>{const i=document.createElement("div");i.className="testimonial-card",i.innerHTML=`
      <div class="card-meta">
        <div class="quote-sign"><span>“</span></div>
        <span class="location">${a.location}, ${a.date}</span>
      </div>

      <div class="feedback-text">
        ${a.message}
      </div>

      <div class="client-name">
        ${a.name}
      </div>
    `,t.appendChild(i)}))}const p={1:"/assets/images/landing_page/panda.png",2:"/assets/images/landing_page/Lemur.png",3:"/assets/images/landing_page/Gorilla.png",4:"/assets/images/landing_page/alligator.png",5:"/assets/images/landing_page/2_eagles.png",6:"/assets/images/landing_page/Koala.png",7:"/assets/images/landing_page/Lion.png",8:"/assets/images/landing_page/tiger.png"};function g(n){const t=document.getElementById("petsContainer");t&&(t.innerHTML="",n.forEach(a=>{const i=document.createElement("div");i.className="pet-card";const e=p[a.id];i.innerHTML=`
      <div class="pet-img">
        <img src="${e}" alt="${a.commonName}">
        <span class="pet-name">${a.name}</span>
      </div>
      <div class="pet-info">
        <h4>${a.commonName}</h4>
        <p>${a.description}</p>
        <button class="btn-pets">
          <span class="btn-span">View Live Cam</span>
        </button>
      </div>
    `,t.appendChild(i)}))}async function m(){try{const n=await c();g(n.data);const t=await d();l(t.data)}catch(n){console.error("Error loading data:",n)}}document.addEventListener("DOMContentLoaded",m);
