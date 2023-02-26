/* Define Global Variables */
// Sounds will contain all instances of howler
const sounds = {}
let isDragging = false;
// Variable to check if user dragged or clicked
let startX



document.querySelectorAll('.ambient-icons-container').forEach(function (icon) {
  /* 
  Get the data-audio attribute of all icons 
  Create a new instance of Howeler for each of the data attributes ignoring "random"
  */
  if (icon.dataset.audio != 'random') {
    sounds[icon.dataset.audio] = new Howl({
      src: [`audio/${icon.dataset.audio}.mp3`],
      loop: true,
      volume: 0.66
    });

    /* 
    The following 3 even listener check if the user is dragging or simply clicking 
    As soon as mouse down is registered, we save the clientX position
    If the start position is less than 3 pixels away from the end position we call it a click
    Otherwise we call it a drag
    */

    if (isTouchDevice()) {
      // The user is using a touch device
      icon.addEventListener('touchstart', function(event) {
        isDragging = true;
        startX = event.touches[0].clientX;
    });
    
    icon.addEventListener('touchmove', function(event) {
        if (isDragging) {
            // Perform drag actions (volume control)
            // Get the x coordinate of the dragged icon using getBoundingClientRect
            const rect = icon.getBoundingClientRect()
            // Change the width of the volume one according to the position of the touch inside the selected icon
            icon.querySelector('.volume-bar').style.width = map_range(event.touches[0].clientX, rect.left,rect.left + icon.offsetWidth, 1, 100) + "%"
            // Change the volume of the specified sound
            sounds[icon.dataset.audio].volume(map_range(event.touches[0].clientX, rect.left,rect.left + icon.offsetWidth, 1, 100) / 100)
        }
    });
    
    icon.addEventListener('touchend', function(event) {
        isDragging = false;
        // Check if drag distance is below threshold
        let endX = event.changedTouches[0].clientX;
        let distance = Math.abs(endX - startX);
        if (distance < 3) {
            // Perform click actions
            // Play / Pause + Class Toggle      
            this.classList.toggle("primary")
            if (sounds[icon.dataset.audio].playing()) {
                sounds[icon.dataset.audio].pause()
            } else {
                sounds[icon.dataset.audio].play()
            }
        }
    });
    } else {
      // The user is using a click device
      icon.addEventListener('mousedown', function(event) {
        isDragging = true;
        startX = event.clientX;
      });
      
      icon.addEventListener('mousemove', function(event) {
          if (isDragging) {
            // Perform drag actions (volume control)
            // Get the x coordinate of the dragged icon using getBoundingClientRect
            const rect = icon.getBoundingClientRect()
            // Change the width of the volume one according to the position of the mouse inside the selected icon
            icon.querySelector('.volume-bar').style.width = map_range(event.clientX, rect.left,rect.left + icon.offsetWidth, 1, 100) + "%"
            // Change the volume of the specified sound
            sounds[icon.dataset.audio].volume(map_range(event.clientX, rect.left,rect.left + icon.offsetWidth, 1, 100) / 100)
          }
      });
      
      icon.addEventListener('mouseup', function(event) {
          isDragging = false;
          // Check if drag distance is below threshold
          let endX = event.clientX;
          let distance = Math.abs(endX - startX);
          if (distance < 3) {
              // Perform click actions
              // Play / Pause + Class Toggle      
              this.classList.toggle("primary")
              if (sounds[icon.dataset.audio].playing()) {
                sounds[icon.dataset.audio].pause()
              } else {
                sounds[icon.dataset.audio].play()
              }
          }
      });
    }

  }
})

/* Random option support */
// When random is clicked
document.querySelector(".ambient-icons-container:last-child").addEventListener("click", function () {
  // Reset all icons
  document.querySelectorAll('.ambient-icons-container').forEach(function (icon) {
    icon.classList.remove("primary")
  })
  // Pause all sounds
  for (s in sounds) {
    sounds[s].pause()
  }

  // Generate a random number between 0 - the length of the sounds object
  // Play a random sound using the generated random number
  // add primary class to corresponding icon
  const keys = Object.keys(sounds);
  const random = Math.floor(Math.random() * Object.keys(sounds).length);
  sounds[keys[random]].play()
  const randomElement = document.querySelector([`[data-audio="${keys[random]}"]`])
  randomElement.classList.add("primary")
})


/**
 * Re-maps a number from one range to another.
 *
 * @param {number} value The input we want to remap
 * @param {number} low1 The minimum expected input value
 * @param {number} high1 The maximum expected input value
 * @param {number} low2 The minimum expected output value
 * @param {number} high2 The maximum expected output value
 * @return {number} Re-map number
 */
function map_range(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}



function isTouchDevice() {
  return 'ontouchstart' in window // Check if touch events are supported
      || navigator.maxTouchPoints > 0 // Check if touch points are supported (IE/Edge)
      || navigator.msMaxTouchPoints > 0; // Check if touch points are supported (IE10/11)
}

