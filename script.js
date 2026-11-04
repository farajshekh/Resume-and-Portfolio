/* Shekh Faraj — Portfolio interactions (vanilla JS, no dependencies) */
(function () {
    'use strict';

    var root = document.documentElement;
    root.classList.add('js');

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var $ = function (s, c) { return (c || document).querySelector(s); };
    var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

    /* ---------- Theme toggle ---------- */
    var themeBtn = $('#themeToggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', function () {
            var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            try { localStorage.setItem('sf-theme', next); } catch (e) { }
            var meta = $('meta[name="theme-color"]');
            if (meta) meta.setAttribute('content', next === 'dark' ? '#0c0d10' : '#f5f2eb');
        });
    }

    /* ---------- Header state + scroll progress ---------- */
    var header = $('#header');
    var progress = $('#progress');
    function onScroll() {
        var y = window.scrollY || 0;
        var max = document.documentElement.scrollHeight - window.innerHeight;
        if (header) header.classList.toggle('is-scrolled', y > 8);
        if (progress && max > 0) progress.style.transform = 'scaleX(' + Math.min(1, y / max) + ')';
        if (y < window.innerHeight * 0.4) {
            $$('[data-spy].is-active').forEach(function (a) { a.classList.remove('is-active'); });
        }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---------- Mobile menu ---------- */
    var menuBtn = $('#menuBtn');
    var mobileNav = $('#mobileNav');
    function setMenu(open) {
        if (!menuBtn || !mobileNav) return;
        mobileNav.classList.toggle('is-open', open);
        menuBtn.setAttribute('aria-expanded', String(open));
        menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
    if (menuBtn) {
        menuBtn.addEventListener('click', function () {
            setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
        });
        $$('a', mobileNav).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
        window.addEventListener('resize', function () { if (window.innerWidth > 1100) setMenu(false); });
    }

    /* ---------- Scroll-spy ---------- */
    var spyLinks = $$('[data-spy]');
    if ('IntersectionObserver' in window && spyLinks.length) {
        var spy = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
                if (!en.isIntersecting) return;
                spyLinks.forEach(function (a) {
                    a.classList.toggle('is-active', a.getAttribute('data-spy') === en.target.id);
                });
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        spyLinks.forEach(function (a) {
            var s = document.getElementById(a.getAttribute('data-spy'));
            if (s) spy.observe(s);
        });
    }

    /* ---------- Reveal on scroll ---------- */
    var rv = ('IntersectionObserver' in window && !reduceMotion) ? new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
            if (en.isIntersecting) { en.target.classList.add('is-in'); rv.unobserve(en.target); }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }) : null;
    // Call again after injecting new .reveal elements (e.g. portfolio cards)
    function watchReveals() {
        $$('.reveal:not(.is-in):not([data-w])').forEach(function (el) {
            el.setAttribute('data-w', '1');
            if (rv) rv.observe(el); else el.classList.add('is-in');
        });
    }
    watchReveals();
    // Hero content animates in right away on load
    requestAnimationFrame(function () {
        $$('.hero .reveal').forEach(function (el) { el.classList.add('is-in'); });
    });

    /* ---------- Animated counters ---------- */
    function fmt(v, dec) { return v.toLocaleString('en-IN', { minimumFractionDigits: dec, maximumFractionDigits: dec }); }
    function runCount(el) {
        var to = parseFloat(el.getAttribute('data-to'));
        var dec = parseInt(el.getAttribute('data-dec') || '0', 10);
        if (reduceMotion) { el.textContent = fmt(to, dec); return; }
        var t0 = null, dur = 1600;
        function step(t) {
            if (t0 === null) t0 = t;
            var p = Math.min(1, (t - t0) / dur);
            var eased = 1 - Math.pow(1 - p, 4);
            el.textContent = fmt(to * eased, dec);
            if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }
    var counters = $$('.count');
    if ('IntersectionObserver' in window) {
        var co = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
                if (en.isIntersecting) { runCount(en.target); co.unobserve(en.target); }
            });
        }, { threshold: 0.6 });
        counters.forEach(function (c) { co.observe(c); });
    } else {
        counters.forEach(runCount);
    }

    /* ---------- Hero: generated topographic contours ---------- */
    var contours = $('#contours');
    if (contours) {
        var NS = 'http://www.w3.org/2000/svg';
        var g = document.createElementNS(NS, 'g');
        for (var i = 0; i < 18; i++) {
            var r = 36 + i * 22, pts = [], N = 160;
            for (var k = 0; k <= N; k++) {
                var th = (k / N) * Math.PI * 2;
                var rr = r * (1 + 0.10 * Math.sin(2 * th + i * 0.34) + 0.06 * Math.sin(3 * th + 1.7 + i * 0.21) + 0.035 * Math.sin(5 * th + i * 0.5));
                pts.push((400 + rr * Math.cos(th)).toFixed(1) + ' ' + (400 + rr * Math.sin(th)).toFixed(1));
            }
            var p = document.createElementNS(NS, 'path');
            p.setAttribute('d', 'M' + pts.join('L') + 'Z');
            if (i % 5 === 2) p.setAttribute('class', 'is-hl');
            g.appendChild(p);
        }
        contours.appendChild(g);
    }

    /* ---------- Hero glow follows the pointer ---------- */
    var hero = $('.hero');
    if (hero && !reduceMotion && window.matchMedia('(hover: hover)').matches) {
        hero.addEventListener('pointermove', function (e) {
            var b = hero.getBoundingClientRect();
            hero.style.setProperty('--gx', (e.clientX - b.left) + 'px');
            hero.style.setProperty('--gy', (e.clientY - b.top) + 'px');
        });
    }

    /* ---------- Card spotlight ---------- */
    $$('.card, .edu__card').forEach(function (c) {
        c.addEventListener('pointermove', function (e) {
            var b = c.getBoundingClientRect();
            c.style.setProperty('--mx', (e.clientX - b.left) + 'px');
            c.style.setProperty('--my', (e.clientY - b.top) + 'px');
        });
    });

    /* ---------- Portfolio: render cards, résumé list and detail dialog ---------- */
    var projects = window.PROJECTS || [];
    function esc(t) {
        return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }
    function icon(name) { return '<svg class="i"><use href="#i-' + name + '" /></svg>'; }
    function ampHtml(t) { return esc(t).replace(/&amp;/g, '<span class="amp">&amp;</span>'); }
    function pad(n) { return (n < 10 ? '0' : '') + n; }
    function figsHtml(p) {
        return p.figs.map(function (f) { return '<div><b>' + esc(f[0]) + '</b><span>' + esc(f[1]) + '</span></div>'; }).join('');
    }

    var grid = $('#projectGrid');
    if (grid) {
        grid.innerHTML = projects.map(function (p, i) {
            var cover = p.cover
                ? '<img src="' + esc(p.cover) + '" alt="' + esc(p.title) + '" loading="lazy" decoding="async">'
                : '<div class="ph" aria-hidden="true"><span class="ph__n">' + pad(i + 1) + '</span><span class="ph__lbl">' + icon('image') + ' Project media</span></div>';
            return '<article class="project reveal' + (p.featured ? ' project--wide' : '') + '" style="--d:' + ((i % 3) * 0.08) + 's">' +
                '<div class="project__media">' + cover +
                '<span class="project__sector">' + esc(p.sector) + '</span>' +
                (p.status ? '<span class="project__status"><span class="dot dot--pulse"></span>' + esc(p.status) + '</span>' : '') +
                '</div>' +
                '<div class="project__body">' +
                '<span class="tag-num">' + pad(i + 1) + ' · ' + esc(p.period) + '</span>' +
                '<h3 class="h3">' + ampHtml(p.title) + (p.subtitle ? '<small>' + esc(p.subtitle) + '</small>' : '') + '</h3>' +
                '<p>' + esc(p.summary) + '</p>' +
                '<div class="figs">' + figsHtml(p) + '</div>' +
                '<button class="link" type="button" data-open="' + esc(p.id) + '">View project details ' + icon('arrow-ur') + '</button>' +
                '</div></article>';
        }).join('');
    }

    watchReveals();

    // Résumé "Key projects" list
    var sheetList = $('#sheetProjects');
    if (sheetList) {
        sheetList.innerHTML = projects.map(function (p) {
            return '<li><div class="sheet__row"><strong>' + esc(p.title) + '</strong><span>' + esc(p.period) + '</span></div>' +
                '<em>' + esc(p.client) + '</em>' +
                '<p>' + esc(p.figs.map(function (f) { return f[0] + ' (' + f[1] + ')'; }).join(' · ')) + '</p></li>';
        }).join('');
    }

    // Detail dialog
    var dlg = $('#projectDialog');
    var dlgBody = $('#dlgBody');
    var lastTrigger = null;

    function mediaHtml(p) {
        if (p.media && p.media.length) {
            return '<div class="gallery">' + p.media.map(function (m) {
                var cap = m.caption ? '<figcaption>' + esc(m.caption) + '</figcaption>' : '';
                if (m.type === 'video') {
                    return '<figure class="gallery__item gallery__item--video"><video controls preload="metadata"' +
                        (m.poster ? ' poster="' + esc(m.poster) + '"' : '') + '><source src="' + esc(m.src) + '"></video>' + cap + '</figure>';
                }
                return '<figure class="gallery__item"><img src="' + esc(m.src) + '" alt="' + esc(m.alt || p.title) + '" loading="lazy" decoding="async">' + cap + '</figure>';
            }).join('') + '</div>';
        }
        return '<div class="gallery gallery--empty">' +
            '<div class="gallery__ph">' + icon('image') + '<span>Site photograph</span></div>' +
            '<div class="gallery__ph">' + icon('image') + '<span>Site photograph</span></div>' +
            '<div class="gallery__ph">' + icon('play') + '<span>Project video</span></div></div>';
    }

    function openProject(id, trigger) {
        var p = projects.filter(function (x) { return x.id === id; })[0];
        if (!p || !dlg || typeof dlg.showModal !== 'function') return;
        lastTrigger = trigger || null;
        var facts = [['Period', p.period], ['Location', p.location], ['Client', p.client], ['Role', p.role]];
        dlgBody.innerHTML =
            '<button class="dlg__close icon-btn" type="button" data-close aria-label="Close project details">' + icon('x') + '</button>' +
            '<div class="dlg__body">' +
            '<span class="kicker">' + esc(p.sector) + (p.status ? ' · ' + esc(p.status) : '') + '</span>' +
            '<h3 class="dlg__title" id="dlgTitle">' + ampHtml(p.title) + '</h3>' +
            '<p class="dlg__formal">' + esc(p.formal) + '</p>' +
            '<div class="figs figs--lg">' + figsHtml(p) + '</div>' +
            '<dl class="facts">' + facts.map(function (f) { return '<div><dt>' + f[0] + '</dt><dd>' + esc(f[1]) + '</dd></div>'; }).join('') + '</dl>' +
            '<h4 class="dlg__h">Project features</h4><p>' + esc(p.features) + '</p>' +
            '<h4 class="dlg__h">Activities performed</h4><ul class="ticks">' + p.did.map(function (d) { return '<li>' + esc(d) + '</li>'; }).join('') + '</ul>' +
            (p.takeaway ? '<div class="takeaway"><span class="tag-num">Key learning</span><p>' + esc(p.takeaway) + '</p></div>' : '') +
            '<h4 class="dlg__h">Photographs &amp; video</h4>' + mediaHtml(p) +
            '</div>';
        dlg.showModal();
        dlg.scrollTop = 0;
    }

    document.addEventListener('click', function (e) {
        var opener = e.target.closest && e.target.closest('[data-open]');
        if (opener) { openProject(opener.getAttribute('data-open'), opener); return; }
        if (e.target.closest && e.target.closest('[data-close]') && dlg) { dlg.close(); return; }
        if (dlg && e.target === dlg) dlg.close(); // backdrop click
    });
    if (dlg) {
        dlg.addEventListener('close', function () {
            $$('video', dlg).forEach(function (v) { v.pause(); });
            if (lastTrigger) lastTrigger.focus();
        });
    }

    /* ---------- Resume: print to PDF ---------- */
    var printBtn = $('#printBtn');
    if (printBtn) printBtn.addEventListener('click', function () { window.print(); });

    /* ---------- Copy email + toast ---------- */
    var copyBtn = $('#copyMail');
    var toast = $('#toast');
    var toastTimer;
    function showToast(msg) {
        if (!toast) return;
        toast.textContent = msg;
        toast.classList.add('is-show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () { toast.classList.remove('is-show'); }, 2200);
    }
    if (copyBtn) {
        copyBtn.addEventListener('click', function () {
            var mail = 'shekhfaraj3833@gmail.com';
            function done() {
                copyBtn.classList.add('is-done');
                showToast('Email copied to clipboard');
                setTimeout(function () { copyBtn.classList.remove('is-done'); }, 2000);
            }
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(mail).then(done, function () { showToast(mail); });
            } else {
                showToast(mail);
            }
        });
    }

    /* ---------- Footer year ---------- */
    var yr = $('#year');
    if (yr) yr.textContent = new Date().getFullYear();
})();
