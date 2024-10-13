document.addEventListener("DOMContentLoaded", function() {
  const modal = document.getElementById("storyModal");
  const trigger = document.getElementById("ourStoryTrigger");
  const closeBtn = document.querySelector(".close");
  const iframe = document.getElementById("storyIframe");

  trigger.onclick = function() {
    iframe.src = "ourstory.html"; // Replace with the actual path to the HTML page
    modal.style.display = "block";
  };

  closeBtn.onclick = function() {
    modal.style.display = "none";
    iframe.src = ""; // Clear the iframe content when modal closes
  };

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      iframe.src = ""; // Clear the iframe content when modal closes
    }
  };
});
