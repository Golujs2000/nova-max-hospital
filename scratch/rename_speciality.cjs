const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'src');

function walk(currentDir) {
  const files = fs.readdirSync(currentDir);
  for (const file of files) {
    const fullPath = path.join(currentDir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // We don't want to replace `doctor.specialties` if the user didn't explicitly ask,
      // but the plan was approved so I will do a case-preserving replace.
      
      let newContent = content
        .replace(/specialities/g, 'departments')
        .replace(/Specialities/g, 'Departments')
        .replace(/speciality/g, 'department')
        .replace(/Speciality/g, 'Department')
        
        // Fixing the getdepartmentBySlug created by previous powershell
        .replace(/getdepartmentBySlug/g, 'getDepartmentBySlug')
        .replace(/getcategoryItemBySlug/g, 'getCategoryItemBySlug');

      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent);
        console.log('Updated:', fullPath);
      }
    }
  }
}

walk(dir);
