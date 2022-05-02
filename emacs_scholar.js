panels = document.querySelectorAll('.gs_r.gs_or.gs_scl')

for (let i = 0; i < panels.length; i++) {
    pdfUrl = encodeURIComponent(panels[i].querySelector('.gs_fl a').getAttribute('href'))
    bibtexUrl = encodeURIComponent(panels[i].querySelector('.gs_nta').getAttribute('href'))
    a = document.createElement('a')
    a.innerText = "Import into Emacs"
    a.href = `org-protocol:/gscholar?bibtexUrl=${bibtexUrl}&pdfUrl=${pdfUrl}`
    panels[i].querySelector('.gs_fl').appendChild(a)
}
