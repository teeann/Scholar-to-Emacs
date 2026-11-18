function findPdfUrl(panel) {
    // The "[PDF]" access link lives outside the .gs_fl action row, in a
    // wrapper whose class Google has renamed a few times over the years.
    // Anchor on the "[PDF]" label span instead, which has stayed stable.
    const labeled = panel.querySelector('a:has(span.gs_ctg2)')
    const href = labeled && labeled.getAttribute('href')
    // Defensive: the first link inside .gs_fl is the "Cite" button, with
    // href="javascript:...". That's how this used to break (it got fed to
    // Emacs as the PDF URL), so never hand a javascript: href back either.
    if (href && !href.startsWith('javascript:')) return href
    return ''
}

panels = document.querySelectorAll('.gs_r.gs_or.gs_scl')
for (let i = 0; i < panels.length; i++) {
    bibtexLink = panels[i].querySelector('a.gs_nta')
    if (!bibtexLink) continue  // nothing to import without a BibTeX link
    pdfUrl = encodeURIComponent(findPdfUrl(panels[i]))
    bibtexUrl = encodeURIComponent(bibtexLink.getAttribute('href'))
    a = document.createElement('a')
    a.innerText = "Import into Emacs"
    a.href = `org-protocol:/gscholar?bibtexUrl=${bibtexUrl}&pdfUrl=${pdfUrl}`
    panels[i].querySelector('.gs_fl').appendChild(a)
}
