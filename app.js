function saveDraft() {
  const filename = document.getElementById('filename').value.trim();
  const content = document.getElementById('editor').value;

  if (!filename) {
    alert("Please enter a filename.");
    return;
  }

  if (filename.endsWith('.txt')) {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, filename);
  } else if (filename.endsWith('.docx')) {
    const doc = new docx.Document({
      sections: [{
        properties: {},
        children: [new docx.Paragraph(content)],
      }],
    });

    docx.Packer.toBlob(doc).then(blob => {
      saveAs(blob, filename);
    });
  } else {
    alert("Unsupported file type. Use .txt or .docx");
  }
}