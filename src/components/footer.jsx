import React from 'react';

export default function Footer() {
  return (
    <footer style={footerStyle} className='mt-[25px]'>
      <p style={textStyle}>
        Student of <strong>Alliance University</strong> | MCA (Gen AI)
      </p>
      <p style={textStyle}>
        GitHub: <a href="https://github.com/DharmShah/ResumeBuilder.git" target="_blank" rel="noopener noreferrer">
          https://github.com/DharmShah/ResumeBuilder.git
        </a>
      </p>
      <p style={textStyle}>
        Name : Dharm Shah, Nandana R Nair, Manoj , Vijendra Jha, Balaji
      </p>
      <p style={{...textStyle, marginTop: '8px'}}>© {new Date().getFullYear()} All rights reserved</p>
    </footer>
  );
}

const footerStyle = {
  backgroundColor: '#1e1e1e',
  color: '#fff',
  textAlign: 'center',
  padding: '20px',
  position: 'relative',
  bottom: 0,
  width: '100%',
  fontFamily: 'Arial, sans-serif',
};

const textStyle = {
  margin: '5px 0',
  fontSize: '14px',
};
