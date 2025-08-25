// Function to fetch and display projects
async function loadProjects() {
  try {
    // Fetch the projects data from the JSON file
    const response = await fetch('projects.json');
    if (!response.ok) {
      throw new Error('Failed to load projects data');
    }
    
    const projects = await response.json();
    const projectsContainer = document.getElementById('projects-container');
    
    // Clear any existing content
    projectsContainer.innerHTML = '';
    
    // Loop through each project and create HTML elements
    projects.forEach(project => {
      const projectDiv = document.createElement('div');
      projectDiv.className = 'project';
      
      // Create project image if available
      if (project.image) {
        const img = document.createElement('img');
        img.src = project.image;
        img.alt = project.title;
        img.className = 'project-image';
        projectDiv.appendChild(img);
      }
      
      // Create project title
      const title = document.createElement('h3');
      title.textContent = project.title;
      projectDiv.appendChild(title);
      
      // Create project description
      const description = document.createElement('p');
      description.textContent = project.description;
      projectDiv.appendChild(description);
      
      // Create technologies list
      if (project.technologies && project.technologies.length > 0) {
        const techPara = document.createElement('p');
        const techBold = document.createElement('b');
        techBold.textContent = 'Technologies: ';
        techPara.appendChild(techBold);
        techPara.appendChild(document.createTextNode(project.technologies.join(', ')));
        projectDiv.appendChild(techPara);
      }
      
      // Create GitHub link
      if (project.github) {
        const githubLink = document.createElement('a');
        githubLink.href = project.github;
        githubLink.textContent = 'GitHub Link';
        githubLink.target = '_blank';
        projectDiv.appendChild(githubLink);
      }
      
      // Add the project div to the container
      projectsContainer.appendChild(projectDiv);
    });
    
  } catch (error) {
    console.error('Error loading projects:', error);
    document.getElementById('projects-container').innerHTML = '<p>Failed to load projects. Please try again later.</p>';
  }
}

// Function to setup smooth scrolling
function setupSmoothScrolling() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Smooth scroll to the target element
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Initialize all functions when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  loadProjects();
  setupSmoothScrolling();
});
