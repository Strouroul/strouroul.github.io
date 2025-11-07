document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("dynamic-content");

    // Example 1: Inject inline HTML
//  container.innerHTML = `
    //   <h3>🚀 Highlighted Projects</h3>
    //   <ul>
    //     <li><strong>Support R Us</strong> – AI-powered customer support platform</li>
    //     <li><strong>iMeet</strong> – Secure WebRTC-based meeting system</li>
    //     <li><strong>iRide</strong> – Intelligent transportation dispatch platform</li>
    //   </ul>
//  `;

    // Example 2: Or load external content (if hosted in same repo)
    fetch('./irc_welcome.txt')
        .then(res => res.text())
        .then(html => container.innerHTML = html);
});