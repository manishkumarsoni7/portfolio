const http = require('http');

http.get('http://localhost:3000/', (res) => {
  console.log('Status code:', res.statusCode);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Fetched bytes:', data.length);
    console.log('Title found:', data.includes('Manish Kumar Soni'));
    console.log('Lenis found:', data.includes('lenis@1.3.19'));
    console.log('AURA Atelier link found:', data.includes('aura-atelier.surge.sh'));
    console.log('Apex Nova Dental link found:', data.includes('apex-novadental.surge.sh'));
    console.log('Email found:', data.includes('issac78neo@gmail.com'));
    console.log('All sections present:', 
      data.includes('id="hero"') &&
      data.includes('id="statement"') &&
      data.includes('id="works"') &&
      data.includes('id="skills"') &&
      data.includes('id="about"') &&
      data.includes('id="process"') &&
      data.includes('id="contact"') &&
      data.includes('id="faq"') &&
      data.includes('id="site-footer"') &&
      data.includes('id="modal-menu"')
    );
  });
});
