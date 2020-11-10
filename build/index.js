const commander = require('commander');
function run() {
  commander
  .option('--w', 'output extra debugging')
        .parse(process.argv);
  console.log(commander.opts().w);
}
run()