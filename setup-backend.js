const args = [ 'setup' ];
const opts = { stdio: 'inherit', cwd: 'backend', shell: true };
require('child_process').spawn('npm', args, opts);