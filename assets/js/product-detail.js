// Function to change main image and zoom image
function changeImage(imageSrc) {
    document.getElementById('mainImage').src = imageSrc;
    document.getElementById('zoomImage').src = imageSrc;
  }
  
  // Show zoom container on hover
  const mainImageContainer = document.querySelector('.main-image-container');
  const zoomContainer = document.getElementById('zoomContainer');
  const zoomImage = document.getElementById('zoomImage');
  
  mainImageContainer.addEventListener('mousemove', function (e) {
    const rect = mainImageContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;
  
    zoomImage.style.transform = `translate(-${xPercent}%, -${yPercent}%)`;
    zoomContainer.style.display = 'block';
  });
  
  mainImageContainer.addEventListener('mouseleave', function () {
    zoomContainer.style.display = 'none';
  });


function showSection(sectionId) {
    // Remove 'active' class from all tab content
    document.querySelectorAll('.tab-content').forEach((section) => {
      section.classList.remove('active');
    });
  
    // Remove 'active' class from all buttons
    document.querySelectorAll('.tab-buttons button').forEach((button) => {
      button.classList.remove('active');
    });
  
    // Add 'active' class to the selected tab content and button
    document.getElementById(sectionId).classList.add('active');
    if (sectionId === 'specification') {
      document.getElementById('spec-btn').classList.add('active');
    }else if(sectionId === 'technical-data'){
        document.getElementById('tech-btn').classList.add('active');
    }
     else {
      document.getElementById('rev-btn').classList.add('active');
    }
  }



  