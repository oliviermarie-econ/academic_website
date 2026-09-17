// Minimal in-page PDF renderer built on PDF.js (self-hosted in files/pdfjs/).
// Usage: <div class="pdf-view" data-pdf="files/x.pdf" data-height="820"></div>
// Renders every page onto canvases inside a scrollable box. Works inside sandboxed
// iframes (Google Sites) and never triggers a download or a browser PDF plugin.
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(function () {
    var views = document.querySelectorAll('.pdf-view[data-pdf]');
    if (!views.length) return;
    if (!window.pdfjsLib) {
      views.forEach(function (v) { v.innerHTML = '<p class="pdf-fallback">PDF viewer failed to load. <a href="' + v.dataset.pdf + '" target="_blank">Open the PDF</a>.</p>'; });
      return;
    }
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'files/pdfjs/pdf.worker.min.js';

    views.forEach(function (view) {
      var url = view.dataset.pdf;
      var h = parseInt(view.dataset.height || '820', 10);
      view.style.height = h + 'px';
      view.innerHTML = '<p class="pdf-loading">Loading PDF…</p>';

      pdfjsLib.getDocument(url).promise.then(function (pdf) {
        view.innerHTML = '';
        var width = view.clientWidth - 2; // inner width minus border
        var dpr = window.devicePixelRatio || 1;
        var chain = Promise.resolve();
        for (var i = 1; i <= pdf.numPages; i++) {
          (function (num) {
            chain = chain.then(function () {
              return pdf.getPage(num).then(function (page) {
                var base = page.getViewport({ scale: 1 });
                var scale = width / base.width;
                var vp = page.getViewport({ scale: scale });
                var canvas = document.createElement('canvas');
                canvas.className = 'pdf-page';
                canvas.width = Math.floor(vp.width * dpr);
                canvas.height = Math.floor(vp.height * dpr);
                canvas.style.width = Math.floor(vp.width) + 'px';
                canvas.style.height = Math.floor(vp.height) + 'px';
                view.appendChild(canvas);
                var ctx = canvas.getContext('2d');
                return page.render({ canvasContext: ctx, viewport: vp, transform: dpr !== 1 ? [dpr, 0, 0, dpr, 0, 0] : null }).promise;
              });
            });
          })(i);
        }
        return chain;
      }).catch(function (err) {
        view.innerHTML = '<p class="pdf-fallback">Could not display the PDF here. <a href="' + url + '" target="_blank">Open the PDF</a>.</p>';
        if (window.console) console.error(err);
      });
    });
  });
})();
