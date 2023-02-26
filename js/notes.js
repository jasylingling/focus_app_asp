// Select all notes textareas
const textareas = document.querySelectorAll('.notes-area')
// Create a variable for timeout
let timeoutId

// Check input on the textareas (we loop because there are multiple text areas)
textareas.forEach(textarea => {
  textarea.addEventListener('input', () => {
    clearTimeout(timeoutId)
    // This is a 3 second timeout, which means we save changes automatically 3 seconds after the last input
    timeoutId= setTimeout(() => {
      localStorage.setItem('notes', textarea.value)
      textareas.forEach(area => {
        area.value = textarea.value
      })
    }, 3000)
  })
  // This loads the saved notes into the textareas on page load
  const savedNotes = localStorage.getItem('notes')
  if(savedNotes) {
    textarea.value = savedNotes
  }
})

document.querySelectorAll('.download-notes').forEach(btn => {
  btn.addEventListener("click", function(e) {
    e.preventDefault()
    const text = document.querySelector('.notes-area').value;
    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "notes.txt";
    a.click();
  });
})
