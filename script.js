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
    var reveals = $$('.reveal');
    if ('IntersectionObserver' in window && !reduceMotion) {
        var rv = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
                if (en.isIntersecting) { en.target.classList.add('is-in'); rv.unobserve(en.target); }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
        reveals.forEach(function (el) { rv.observe(el); });
    } else {
        reveals.forEach(function (el) { el.classList.add('is-in'); });
    }
    // Hero content animates in right away on load
    requestAnimationFrame(function () {
        $$('.hero .reveal').forEach(function (el) { el.classList.add('is-in'); });
    });

    /* ---------- Animated counters ---------- */
    function runCount(el) {
        var to = parseFloat(el.getAttribute('data-to'));
        var dec = parseInt(el.getAttribute('data-dec') || '0', 10);
        if (reduceMotion) { el.textContent = to.toFixed(dec); return; }
        var t0 = null, dur = 1600;
        function step(t) {
            if (t0 === null) t0 = t;
            var p = Math.min(1, (t - t0) / dur);
            var eased = 1 - Math.pow(1 - p, 4);
            el.textContent = (to * eased).toFixed(dec);
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

    /* ---------- Pavement layer composer ---------- */
    var svg = $('#labSvg');
    if (svg) {
        var NS2 = 'http://www.w3.org/2000/svg';
        var X0 = 96, W = 360, Y0 = 56, SCALE = 0.27, Y_END = 360;
        var layers = [
            { id: 'l1', name: 'Bituminous', colour: 'var(--l1)' },
            { id: 'l2', name: 'WMM base', colour: 'var(--l2)' },
            { id: 'l3', name: 'GSB sub-base', colour: 'var(--l3)' }
        ];

        function el(tag, attrs, parent) {
            var n = document.createElementNS(NS2, tag);
            Object.keys(attrs || {}).forEach(function (k) { n.setAttribute(k, attrs[k]); });
            (parent || svg).appendChild(n);
            return n;
        }

        // defs: subgrade hatch + clip so stress bulbs stay inside the section
        var defs = el('defs');
        var pat = el('pattern', { id: 'hatch', width: 10, height: 10, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' }, defs);
        el('rect', { width: 10, height: 10, fill: 'var(--l4)' }, pat);
        el('line', { x1: 0, y1: 0, x2: 0, y2: 10, stroke: 'rgba(0,0,0,.28)', 'stroke-width': 3 }, pat);
        var clip = el('clipPath', { id: 'labClip' }, defs);
        el('rect', { x: X0, y: Y0, width: W, height: Y_END - Y0 }, clip);

        // subgrade
        var sub = el('rect', { x: X0, width: W, fill: 'url(#hatch)', class: 'lab-layer' });
        var subLbl = el('text', { x: X0 + W / 2, 'text-anchor': 'middle', class: 'lab-lbl' });
        subLbl.textContent = 'SUBGRADE';

        var rects = {}, lbls = {}, dims = {};
        layers.forEach(function (L) {
            rects[L.id] = el('rect', { x: X0, width: W, fill: L.colour, class: 'lab-layer' });
            lbls[L.id] = el('text', { x: X0 + W / 2, 'text-anchor': 'middle', class: 'lab-lbl' });
            lbls[L.id].textContent = L.name.toUpperCase();
            dims[L.id] = el('text', { x: X0 - 12, 'text-anchor': 'end', class: 'lab-dim' });
        });

        // stress bulb arcs under the wheel load
        var bulbs = el('g', { 'clip-path': 'url(#labClip)', fill: 'none', stroke: 'var(--accent)', 'stroke-width': 1.5, 'stroke-dasharray': '4 5', opacity: .75 });
        [46, 92, 146, 210].forEach(function (rad, n) {
            el('ellipse', { cx: X0 + W / 2, cy: Y0, rx: rad * 1.15, ry: rad, opacity: 1 - n * 0.2 }, bulbs);
        });

        // wheel load arrow
        var ax = X0 + W / 2;
        el('path', { d: 'M' + ax + ' 12 V' + (Y0 - 6) + ' M' + (ax - 8) + ' ' + (Y0 - 15) + ' L' + ax + ' ' + (Y0 - 5) + ' L' + (ax + 8) + ' ' + (Y0 - 15), fill: 'none', stroke: 'var(--accent)', 'stroke-width': 2.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
        var load = el('text', { x: ax + 16, y: 28, class: 'lab-dim', fill: 'var(--accent-text)' });
        load.textContent = 'WHEEL LOAD';
        load.style.fill = 'var(--accent-text)';

        // surface line
        el('line', { x1: X0 - 8, x2: X0 + W + 8, y1: Y0, y2: Y0, stroke: 'var(--accent)', 'stroke-width': 2.5, 'stroke-dasharray': '10 8' });

        var inputs = { l1: $('#r1'), l2: $('#r2'), l3: $('#r3') };
        var outs = { l1: $('#o1'), l2: $('#o2'), l3: $('#o3') };
        var totalEl = $('#labTotal');

        function put(node, y, h) { node.style.y = y + 'px'; if (h !== undefined) node.style.height = h + 'px'; }

        function render() {
            var y = Y0, total = 0;
            layers.forEach(function (L) {
                var mm = +inputs[L.id].value;
                var h = mm * SCALE;
                total += mm;
                put(rects[L.id], y, h);
                lbls[L.id].style.transform = 'translateY(' + (y + h / 2 + 4) + 'px)';
                lbls[L.id].style.opacity = h > 22 ? 1 : 0;
                dims[L.id].style.transform = 'translateY(' + (y + h / 2 + 4) + 'px)';
                dims[L.id].textContent = mm + ' mm';
                outs[L.id].textContent = mm;
                var inp = inputs[L.id];
                inp.style.setProperty('--p', ((mm - inp.min) / (inp.max - inp.min)) * 100 + '%');
                y += h;
            });
            put(sub, y, Y_END - y);
            subLbl.style.transform = 'translateY(' + (y + (Y_END - y) / 2 + 4) + 'px)';
            subLbl.style.opacity = (Y_END - y) > 22 ? 1 : 0;
            totalEl.textContent = total;
        }

        Object.keys(inputs).forEach(function (k) { inputs[k].addEventListener('input', render); });
        $$('.lab__presets button').forEach(function (b) {
            b.addEventListener('click', function () {
                var v = b.getAttribute('data-preset').split(',');
                inputs.l1.value = v[0]; inputs.l2.value = v[1]; inputs.l3.value = v[2];
                render();
            });
        });
        // initial paint without animating from the default position
        render();
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
