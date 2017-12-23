let Parser = require('../src/parser.js');
const assert = require('assert');
let test={};
exports.test=test;

test['isNumber should check input is a number or not']=function(){
  let parser=new Parser();
  assert.ok(parser.isNumber('-5'));
  assert.ok(!parser.isNumber('4hj'));
  assert.ok(!parser.isNumber('h'));
};

test['isOption should check is option starts with "-" or not']=function(){
  let parser=new Parser();
  assert.ok(parser.isOption("-n"));
  assert.ok(parser.isOption("-6"));
  assert.ok(parser.isOption("-c"));
  assert.ok(parser.isOption("--help"));
};

test['isValidOption should check is option "-n" or "-c"']=function(){
  let parser=new Parser();
  assert.ok(parser.isValidOption("-n"));
  assert.ok(!parser.isValidOption("-6"));
  assert.ok(parser.isValidOption("-c"));
  assert.ok(!parser.isValidOption("--help"));
};

test['isNegativeInteger should check input that it is a negative number or not']=function(){
  let parser=new Parser();
  assert.ok(parser.isNegativeInteger('-5'));
  assert.ok(!parser.isNegativeInteger('4'));
  assert.ok(!parser.isNegativeInteger('h'));
};

test["updateOption should update number as value of -n"]=function(){
  let expected={'-n':8};
  let parser=new Parser();
  parser.updateOption('-n','8');
  assert.deepEqual(parser.options,expected);
};

test["updateOption should update number as value of -c"]=function(){
  let expected={'-n':8,'-c':5};
  let parser=new Parser();
  parser.updateOption('-n','8');
  parser.updateOption('-c','5');
  assert.deepEqual(parser.options,expected);
};

test["isHelpOption should check that option is help or not"]=function(){
  let parser=new Parser();
  assert.ok(parser.isHelpOption('--help'));
};

test["optionNumberSeparator should give number as value of -n"]=function(){
  let expected={'-n':3};
  let parser=new Parser(['-8','-n6','-n','3','file.txt']);
  parser.optionNumberSeparator(parser.args,'-n6');
  parser.optionNumberSeparator(parser.args,'-n');
  assert.deepEqual(parser.options,expected);
};

test["increaseIndex should give increased index "]=function(){
  let parser=new Parser(['-8','-n6','-n','3','file.txt']);
  let index=parser.increaseIndex(parser.args,'-n')
  assert.deepEqual(index,3);
};

test["getNextoption should give next option of given option "]=function(){
  let parser=new Parser(['-8','-n6','-n','3','file.txt']);
  let index=parser.getNextoption(parser.args,'-n')
  assert.deepEqual(index,'3');
};

test["parseContents should seperate given list in options and files"]=function(){
  let expected1={'-n':6,'-c':3};
  let expected2=['8','file.txt'];
  let parser=new Parser(['-8','-n6','-c','3','8','file.txt']);
  parser.parseContents();
  assert.deepEqual(parser.options,expected1);
  assert.deepEqual(parser.file,expected2);
};

test["parseContents should give seperated file"]=function(){
  let expected=['3','file.txt']
  let parser=new Parser(['3','file.txt']);
  parser.parseContents();
  assert.deepEqual(parser.options,{});
  assert.deepEqual(parser.file,expected);
};
test["parseContents should update help "]=function(){
  let expected=['3','file.txt']
  let parser=new Parser(['--help','3','file.txt']);
  parser.parseContents();
  assert.deepEqual(parser.file,expected);
  assert.equal(parser.help,true);
};
