let Parser = function(args) {
  this.default = '-n';
  this.defaultValue = 10;
  this.options = {};
  this.file = [];
  this.help=false;
  this.args = args;
}

Parser.prototype = {
  isNumber: function(input) {
    return !isNaN(input);
  },
  isOption: function(option) {
    return option.startsWith('-');
  },
  isValidOption: function(option) {
    let regExp = new RegExp(/^-[a-z]+/g);
    return regExp.test(option);
  },
  isNegativeInteger: function(option) {
    let regExp = new RegExp(/-[0-9]+/g);
    return regExp.test(option);
  },
  isHelpOption:function(option){
    let verboseList=['--help','-h'];
    return verboseList.includes(option);
  },
  isOptionNumPair: function(optionString) {
    return this.isValidOption(optionString) && optionString.length > 2;
  },
  increaseIndex: function(list, option) {
    return list.indexOf(option) + 1;
  },
  updateOption: function(option, number) {
    if (this.isValidOption(option) && this.isNumber(number)) {
      this.options[option] = +number;
      return;
    }
  },
  optionAsNegativeNumber: function(option) {
      this.options['-n'] = +option.slice(1);
      return true;
  },
  getNextoption: function(list, option) {
    return list[this.increaseIndex(list, option)];
  },
  optionNumberSeparator: function(list, option, index) {
    if (this.isOptionNumPair(option)) {
      this.updateOption(option.slice(0, 2), option.slice(2));
      return index;
    } else{
      this.updateOption(option, this.getNextoption(list, option));
      return ++index;
    }
  },

  isFile: function(option) {
    return !this.isOption(option);
  },
  parseContents: function() {
    let argsList = this.args;
    for (let i = 0; i < argsList.length; i++) {
      if(this.isHelpOption(argsList[i])){
        this.help=true;
      }else if (this.isNegativeInteger(argsList[i])) {
        this.optionAsNegativeNumber(argsList[i]);
      } else if (this.isValidOption(argsList[i])) {
        i=this.optionNumberSeparator(argsList, argsList[i], i);
      } else {this.file = this.args.slice(i, this.args.length);
        break;
      }
    }
    return {option: this.option,files: this.files};
  }
}


module.exports = Parser;
